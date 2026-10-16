"""
==============================================================================
CRISP-DM 雙主題回歸分析核心腳本 (50_Startups + Boston Housing)
==============================================================================
本腳本針對兩個資料集進行完整的 CRISP-DM 六大階段分析與多演算法特徵篩選 (k=1~5)：
  1. 最佳子集選取法 (Best Subset Selection)
  2. 前向逐步選取法 (Forward Stepwise Selection)
  3. 後向淘汰法 (Backward Elimination)
  4. Lasso 正則化篩選 (L1 Regularization)
  5. Ridge 嶺回歸重要性排序 (L2 Regularization)
  6. Pearson 邊際相關係數排序 (Correlation Ranking)

產出完整統計指標 (R^2, Adj R^2, MSE, RMSE, MAE, MAPE, AIC, BIC) 並輸出 data.js 供網頁儀表板直接載入。
==============================================================================
"""

import os
import sys
import json
import itertools
import numpy as np
import pandas as pd
import scipy.stats as stats

# 確保 Windows UTF-8
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass


class LinearRegressionModel:
    def __init__(self, fit_intercept=True):
        self.fit_intercept = fit_intercept
        self.coefficients = None
        self.intercept_ = 0.0
        self.coef_ = None
        self.feature_names = []
        self.r2_ = 0.0
        self.adj_r2_ = 0.0
        self.mse_ = 0.0
        self.rmse_ = 0.0
        self.mae_ = 0.0
        self.aic_ = 0.0
        self.bic_ = 0.0
        self.residuals_ = None
        self.fitted_values_ = None

    def fit(self, X, y, feature_names=None):
        if isinstance(X, pd.DataFrame):
            self.feature_names = list(X.columns)
            X_mat = X.values
        else:
            X_mat = np.array(X)
            self.feature_names = feature_names if feature_names else [f"X{i}" for i in range(X_mat.shape[1])]

        y_vec = y.values.ravel() if isinstance(y, (pd.Series, pd.DataFrame)) else np.array(y).ravel()
        n, p = X_mat.shape

        if self.fit_intercept:
            X_design = np.column_stack([np.ones(n), X_mat])
            col_names = ['Intercept'] + self.feature_names
        else:
            X_design = X_mat
            col_names = self.feature_names

        try:
            beta = np.linalg.solve(X_design.T @ X_design, X_design.T @ y_vec)
        except np.linalg.LinAlgError:
            beta = np.linalg.pinv(X_design) @ y_vec

        self.coefficients = beta
        if self.fit_intercept:
            self.intercept_ = beta[0]
            self.coef_ = beta[1:]
        else:
            self.intercept_ = 0.0
            self.coef_ = beta

        y_pred = X_design @ beta
        residuals = y_vec - y_pred
        self.residuals_ = residuals
        self.fitted_values_ = y_pred

        rss = np.sum(residuals ** 2)
        tss = np.sum((y_vec - np.mean(y_vec)) ** 2)
        df_e = n - (p + 1 if self.fit_intercept else p)

        r2 = 1.0 - (rss / tss) if tss > 0 else 0.0
        adj_r2 = 1.0 - ((rss / df_e) / (tss / (n - 1))) if (tss > 0 and df_e > 0) else r2
        mse = np.mean(residuals ** 2)
        rmse = np.sqrt(mse)
        mae = np.mean(np.abs(residuals))

        k_params = p + (1 if self.fit_intercept else 0) + 1
        safe_rss_n = max(rss / n, 1e-12)
        aic = n * np.log(safe_rss_n) + 2 * k_params
        bic = n * np.log(safe_rss_n) + k_params * np.log(n)

        self.r2_ = float(r2)
        self.adj_r2_ = float(adj_r2)
        self.mse_ = float(mse)
        self.rmse_ = float(rmse)
        self.mae_ = float(mae)
        self.aic_ = float(aic)
        self.bic_ = float(bic)
        return self

    def predict(self, X):
        X_mat = X[self.feature_names].values if isinstance(X, pd.DataFrame) else np.array(X)
        if self.fit_intercept:
            X_design = np.column_stack([np.ones(X_mat.shape[0]), X_mat])
        else:
            X_design = X_mat
        return X_design @ self.coefficients


def lasso_coordinate_descent(X, y, alpha, max_iter=1000, tol=1e-5):
    n, p = X.shape
    beta = np.zeros(p)
    for _ in range(max_iter):
        beta_old = beta.copy()
        for j in range(p):
            r_j = y - (X @ beta) + X[:, j] * beta[j]
            rho_j = np.dot(X[:, j], r_j) / n
            if rho_j < -alpha:
                beta[j] = rho_j + alpha
            elif rho_j > alpha:
                beta[j] = rho_j - alpha
            else:
                beta[j] = 0.0
        if np.max(np.abs(beta - beta_old)) < tol:
            break
    return beta


def run_feature_selection_for_dataset(df, target_col, dataset_name, max_k=5, categorical_cols=None):
    print(f"\n>>> 正在分析資料集：{dataset_name} (目標變數: {target_col})")
    
    # 虛擬變數處理
    if categorical_cols:
        df_proc = pd.get_dummies(df, columns=categorical_cols, drop_first=True, dtype=float)
    else:
        df_proc = df.copy()

    X = df_proc.drop(columns=[target_col])
    y = df_proc[target_col]
    feature_list = list(X.columns)

    # 訓練 / 測試集切分 (80/20)
    np.random.seed(42)
    indices = np.arange(len(df_proc))
    np.random.shuffle(indices)
    split_idx = int(0.8 * len(df_proc))
    train_idx, test_idx = indices[:split_idx], indices[split_idx:]

    X_train, X_test = X.iloc[train_idx].copy(), X.iloc[test_idx].copy()
    y_train, y_test = y.iloc[train_idx].copy(), y.iloc[test_idx].copy()

    # 1. 最佳子集選取 (Best Subset)
    best_subsets = {}
    best_subset_records = []
    for k in range(1, max_k + 1):
        best_r2 = -np.inf
        best_combo = None
        best_model = None
        for combo in itertools.combinations(feature_list, k):
            combo = list(combo)
            model = LinearRegressionModel(fit_intercept=True)
            model.fit(X_train[combo], y_train)
            if model.r2_ > best_r2:
                best_r2 = model.r2_
                best_combo = combo
                best_model = model

        best_subsets[k] = best_combo
        best_subset_records.append({
            'k': k,
            'features': best_combo,
            'features_str': " + ".join(best_combo),
            'train_r2': best_model.r2_,
            'train_adj_r2': best_model.adj_r2_,
            'train_mse': best_model.mse_,
            'train_rmse': best_model.rmse_,
            'train_mae': best_model.mae_,
            'aic': best_model.aic_,
            'bic': best_model.bic_
        })

    # 2. 前向逐步選取 (Forward Stepwise)
    forward_subsets = {}
    selected_fwd = []
    for k in range(1, max_k + 1):
        remaining = [f for f in feature_list if f not in selected_fwd]
        best_feat = None
        best_r2 = -np.inf
        for cand in remaining:
            trial = selected_fwd + [cand]
            model = LinearRegressionModel(fit_intercept=True)
            model.fit(X_train[trial], y_train)
            if model.r2_ > best_r2:
                best_r2 = model.r2_
                best_feat = cand
        selected_fwd.append(best_feat)
        forward_subsets[k] = list(selected_fwd)

    # 3. 後向淘汰 (Backward Elimination)
    # 從全部特徵或前進直到剩餘 k 個
    current_bwd = list(feature_list)
    backward_history = {len(current_bwd): list(current_bwd)}
    while len(current_bwd) > 1:
        model = LinearRegressionModel(fit_intercept=True)
        model.fit(X_train[current_bwd], y_train)
        
        # 尋找去除某特徵後 R^2 最高的子集 (等同於剔除最不顯著特徵)
        best_sub_r2 = -np.inf
        best_sub_feat = None
        for cand in current_bwd:
            sub = [f for f in current_bwd if f != cand]
            m_sub = LinearRegressionModel(fit_intercept=True)
            m_sub.fit(X_train[sub], y_train)
            if m_sub.r2_ > best_sub_r2:
                best_sub_r2 = m_sub.r2_
                best_sub_feat = cand
        current_bwd.remove(best_sub_feat)
        backward_history[len(current_bwd)] = list(current_bwd)
    
    backward_subsets = {k: backward_history[k] for k in range(1, max_k + 1)}

    # 4. Lasso L1 正則化
    X_std = (X_train - X_train.mean()) / (X_train.std() + 1e-9)
    y_std = (y_train - y_train.mean()) / (y_train.std() + 1e-9)
    alphas = np.logspace(0.5, -3.5, 200)
    coef_path = []
    for a in alphas:
        b = lasso_coordinate_descent(X_std.values, y_std.values, a)
        coef_path.append(b)
    coef_path = np.array(coef_path)
    entry_alphas = {}
    for j, feat in enumerate(feature_list):
        non_zero = np.where(np.abs(coef_path[:, j]) > 1e-4)[0]
        entry_alphas[feat] = alphas[non_zero[0]] if len(non_zero) > 0 else 0.0
    ranked_lasso = sorted(entry_alphas.keys(), key=lambda k: entry_alphas[k], reverse=True)
    lasso_subsets = {k: ranked_lasso[:k] for k in range(1, max_k + 1)}

    # 5. Ridge L2 正則化
    p = X_std.shape[1]
    beta_ridge = np.linalg.inv(X_std.values.T @ X_std.values + 1.0 * np.eye(p)) @ X_std.values.T @ y_std.values
    ranked_ridge_idx = np.argsort(-np.abs(beta_ridge))
    ranked_ridge = [feature_list[i] for i in ranked_ridge_idx]
    ridge_subsets = {k: ranked_ridge[:k] for k in range(1, max_k + 1)}

    # 6. Pearson 邊際相關係數
    corrs = {feat: abs(stats.pearsonr(X_train[feat], y_train)[0]) for feat in feature_list}
    ranked_corr = sorted(corrs.keys(), key=lambda k: corrs[k], reverse=True)
    corr_subsets = {k: ranked_corr[:k] for k in range(1, max_k + 1)}

    algorithms = {
        '最佳子集 (Best Subset)': best_subsets,
        '前向逐步 (Forward)': forward_subsets,
        '後向淘汰 (Backward)': backward_subsets,
        'Lasso (L1)': lasso_subsets,
        'Ridge (L2)': ridge_subsets,
        '相關係數 (Correlation)': corr_subsets
    }

    # 計算全演算法在測試集上的泛化指標
    eval_matrix = []
    for algo_name, subset_dict in algorithms.items():
        for k in range(1, max_k + 1):
            feats = subset_dict[k]
            model = LinearRegressionModel(fit_intercept=True)
            model.fit(X_train[feats], y_train)

            y_pred = model.predict(X_test[feats])
            res = y_test.values - y_pred
            n_t = len(y_test)
            p_t = len(feats)
            rss = np.sum(res ** 2)
            tss = np.sum((y_test.values - np.mean(y_test.values)) ** 2)
            test_r2 = 1.0 - (rss / tss) if tss > 0 else 0.0
            test_adj_r2 = 1.0 - ((rss / (n_t - p_t - 1)) / (tss / (n_t - 1))) if (n_t - p_t - 1) > 0 else test_r2
            test_mse = np.mean(res ** 2)
            test_rmse = np.sqrt(test_mse)
            test_mae = np.mean(np.abs(res))
            test_mape = np.mean(np.abs(res / (y_test.values + 1e-9))) * 100.0

            eval_matrix.append({
                'algorithm': algo_name,
                'k': k,
                'features': feats,
                'features_str': " + ".join(feats),
                'train_r2': float(model.r2_),
                'test_r2': float(test_r2),
                'test_adj_r2': float(test_adj_r2),
                'test_mse': float(test_mse),
                'test_rmse': float(test_rmse),
                'test_mae': float(test_mae),
                'test_mape': float(test_mape)
            })

    # 找出整體最佳模型 (通常為最佳子集最高 test R2 或最高 Adj R2)
    # 取測試集 R2 最高的作為代表最佳模型
    best_eval = max(eval_matrix, key=lambda x: (x['algorithm'] == '最佳子集 (Best Subset)', x['test_r2']))
    opt_k = best_eval['k']
    opt_feats = best_subsets[opt_k]
    
    # 擬合最終最佳模型
    final_model = LinearRegressionModel(fit_intercept=True)
    final_model.fit(X_train[opt_feats], y_train)
    y_test_pred_final = final_model.predict(X_test[opt_feats])

    # 相關係數柱狀圖數據
    corr_chart_data = [{'feature': feat, 'corr': float(df_proc[feat].corr(df_proc[target_col]))} for feat in feature_list]
    corr_chart_data.sort(key=lambda x: abs(x['corr']), reverse=True)

    # 散佈圖真實 vs 預測樣本
    scatter_points = [{'actual': float(a), 'pred': float(p), 'res': float(a - p)} for a, p in zip(y_test.values, y_test_pred_final)]

    result_data = {
        'dataset_name': dataset_name,
        'target_col': target_col,
        'total_samples': len(df_proc),
        'train_samples': len(X_train),
        'test_samples': len(X_test),
        'features_count': len(feature_list),
        'all_features': feature_list,
        'optimal_k': opt_k,
        'optimal_features': opt_feats,
        'final_model': {
            'intercept': float(final_model.intercept_),
            'coefficients': {feat: float(c) for feat, c in zip(opt_feats, final_model.coef_)},
            'test_r2': float(best_eval['test_r2']),
            'test_mse': float(best_eval['test_mse']),
            'test_rmse': float(best_eval['test_rmse']),
            'test_mae': float(best_eval['test_mae']),
            'test_mape': float(best_eval['test_mape'])
        },
        'best_subset_records': best_subset_records,
        'eval_matrix': eval_matrix,
        'corr_chart_data': corr_chart_data[:10], # 取前 10 大相關
        'scatter_points': scatter_points
    }
    return result_data


def main():
    print("=" * 80)
    print("執行雙主題特徵工程與回歸分析：50_Startups + Boston Housing")
    print("=" * 80)

    # 1. 50_Startups
    df_startups = pd.read_csv('50_Startups.csv')
    startups_data = run_feature_selection_for_dataset(
        df_startups, 
        target_col='Profit', 
        dataset_name='50_Startups 新創獲利預測',
        max_k=5, 
        categorical_cols=['State']
    )

    # 2. Boston Housing
    df_boston = pd.read_csv('boston_housing.csv')
    boston_data = run_feature_selection_for_dataset(
        df_boston, 
        target_col='MEDV', 
        dataset_name='Boston Housing 波士頓房價預測',
        max_k=5, 
        categorical_cols=None
    )

    full_payload = {
        'startups': startups_data,
        'boston': boston_data
    }

    # 輸出為 data.js (包含 window.DASHBOARD_DATA，避免本機 file:/// CORS 問題)
    js_content = f"// 自動生成之回歸分析數據\nwindow.DASHBOARD_DATA = {json.dumps(full_payload, ensure_ascii=False, indent=2)};\n"
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    print("\n[成功] 數據已寫入 data.js！")

    # 也輸出 JSON 供備用
    with open('dashboard_data.json', 'w', encoding='utf-8') as f:
        json.dump(full_payload, f, ensure_ascii=False, indent=2)
    print("[成功] 數據已寫入 dashboard_data.json！")


if __name__ == '__main__':
    main()
