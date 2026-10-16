"""
==============================================================================
CRISP-DM 流程規劃：50_Startups 線性回歸與多重特徵篩選 (1 到 5 個特徵比較)
==============================================================================
本程式實作完整的 CRISP-DM 六大階段：
  Phase 1: 商業理解 (Business Understanding)
  Phase 2: 資料理解 (Data Understanding & EDA)
  Phase 3: 資料準備 (Data Preparation & Dummy Encoding)
  Phase 4: 多重特徵篩選與模型建立 (至少 5 種演算法從 k=1 選到 k=5):
           1. 最佳子集選取法 (Best Subset Selection - 窮舉法)
           2. 前向逐步選取法 (Forward Stepwise Selection)
           3. 後向淘汰法 (Backward Elimination)
           4. Lasso 正則化篩選 (L1 Regularization & Path)
           5. Ridge 嶺回歸重要性排序 (L2 Regularization)
           6. Pearson 邊際相關係數排序 (Correlation Ranking)
  Phase 5: 交叉評估與統計假定診斷 (包含對照表格與 6 合 1 視覺化圖表)
  Phase 6: 部署與預測模擬 (Deployment & Prediction Interface)
==============================================================================
"""

import os
import sys
import itertools
import numpy as np
import pandas as pd
import scipy.stats as stats
import matplotlib.pyplot as plt

# 確保 Windows 命令列 UTF-8 輸出，避免 cp950 編碼問題
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# 設定繁體中文與繪圖字型
plt.rcParams['font.sans-serif'] = ['Microsoft JhengHei', 'SimHei', 'PingFang TC', 'Arial Unicode MS', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False
plt.rcParams['figure.autolayout'] = True


# ==============================================================================
# 線性回歸核心類別 (OLS 矩陣運算與統計推論)
# ==============================================================================
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
        self.rss_ = 0.0
        self.residuals_ = None
        self.fitted_values_ = None
        self.summary_df = None

    def fit(self, X, y, feature_names=None):
        if isinstance(X, pd.DataFrame):
            self.feature_names = list(X.columns)
            X_mat = X.values
        else:
            X_mat = np.array(X)
            self.feature_names = feature_names if feature_names else [f"X{i}" for i in range(X_mat.shape[1])]

        if isinstance(y, (pd.Series, pd.DataFrame)):
            y_vec = y.values.ravel()
        else:
            y_vec = np.array(y).ravel()

        n, p = X_mat.shape

        if self.fit_intercept:
            X_design = np.column_stack([np.ones(n), X_mat])
            col_names = ['Intercept'] + self.feature_names
        else:
            X_design = X_mat
            col_names = self.feature_names

        # 求解正則方程 beta = (X^T * X)^(-1) * X^T * y
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

        # AIC 與 BIC 計算
        # AIC = n * ln(RSS/n) + 2 * k
        # BIC = n * ln(RSS/n) + k * ln(n)
        k_params = p + (1 if self.fit_intercept else 0) + 1  # 包括誤差變異數估計
        safe_rss_n = max(rss / n, 1e-12)
        aic = n * np.log(safe_rss_n) + 2 * k_params
        bic = n * np.log(safe_rss_n) + k_params * np.log(n)

        self.rss_ = rss
        self.r2_ = r2
        self.adj_r2_ = adj_r2
        self.mse_ = mse
        self.rmse_ = rmse
        self.mae_ = mae
        self.aic_ = aic
        self.bic_ = bic

        # 統計推論
        sigma2 = rss / df_e if df_e > 0 else 0
        try:
            cov_beta = sigma2 * np.linalg.inv(X_design.T @ X_design)
            se_beta = np.sqrt(np.maximum(0, np.diag(cov_beta)))
        except Exception:
            cov_beta = sigma2 * np.linalg.pinv(X_design.T @ X_design)
            se_beta = np.sqrt(np.maximum(0, np.diag(cov_beta)))

        t_stats = np.zeros_like(beta)
        p_values = np.zeros_like(beta)
        if df_e > 0:
            for i in range(len(beta)):
                if se_beta[i] > 1e-12:
                    t_stats[i] = beta[i] / se_beta[i]
                    p_values[i] = 2.0 * (1.0 - stats.t.cdf(np.abs(t_stats[i]), df=df_e))
                else:
                    t_stats[i] = np.nan
                    p_values[i] = np.nan

        self.summary_df = pd.DataFrame({
            '特徵變數': col_names,
            '迴歸係數 (Coef)': beta,
            '標準誤 (Std Err)': se_beta,
            't 統計量 (t-stat)': t_stats,
            '顯著性 p-value': p_values
        })
        return self

    def predict(self, X):
        if isinstance(X, pd.DataFrame):
            X_mat = X[self.feature_names].values
        else:
            X_mat = np.array(X)
        if self.fit_intercept:
            X_design = np.column_stack([np.ones(X_mat.shape[0]), X_mat])
        else:
            X_design = X_mat
        return X_design @ self.coefficients


# ==============================================================================
# 特徵篩選演算法 1: 最佳子集選取法 (Best Subset Selection - 窮舉法)
# ==============================================================================
def best_subset_selection(X_train, y_train):
    """
    窮舉 k = 1 到 p 的所有組合，找出每一種 k 數量下 R^2 最大 (RSS 最小) 的最佳子集。
    """
    all_features = list(X_train.columns)
    p = len(all_features)
    best_subsets = {}
    subset_records = []

    for k in range(1, p + 1):
        best_r2 = -np.inf
        best_features = None
        best_model = None

        for combo in itertools.combinations(all_features, k):
            combo = list(combo)
            model = LinearRegressionModel(fit_intercept=True)
            model.fit(X_train[combo], y_train)

            if model.r2_ > best_r2:
                best_r2 = model.r2_
                best_features = combo
                best_model = model

        best_subsets[k] = best_features
        subset_records.append({
            '特徵數 k': k,
            '最佳特徵組合': ", ".join(best_features),
            '訓練集 R^2': best_model.r2_,
            '訓練集 Adj R^2': best_model.adj_r2_,
            '訓練集 MSE': best_model.mse_,
            '訓練集 RMSE': best_model.rmse_,
            '訓練集 MAE': best_model.mae_,
            'AIC': best_model.aic_,
            'BIC': best_model.bic_
        })

    return best_subsets, pd.DataFrame(subset_records)


# ==============================================================================
# 特徵篩選演算法 2: 前向逐步選取法 (Forward Stepwise Selection)
# ==============================================================================
def forward_stepwise_selection(X_train, y_train):
    """
    從空集合開始，每一步貪婪挑選讓模型 R^2 增加最多的特徵加入。
    """
    all_features = list(X_train.columns)
    selected = []
    forward_subsets = {}

    for k in range(1, len(all_features) + 1):
        remaining = [f for f in all_features if f not in selected]
        best_feat = None
        best_r2 = -np.inf

        for candidate in remaining:
            trial_features = selected + [candidate]
            model = LinearRegressionModel(fit_intercept=True)
            model.fit(X_train[trial_features], y_train)
            if model.r2_ > best_r2:
                best_r2 = model.r2_
                best_feat = candidate

        selected.append(best_feat)
        forward_subsets[k] = list(selected)

    return forward_subsets


# ==============================================================================
# 特徵篩選演算法 3: 後向淘汰法 (Backward Elimination)
# ==============================================================================
def backward_elimination_sequence(X_train, y_train):
    """
    從全部特徵開始，每一輪淘汰 p-value 最大的特徵，記錄 k=5 到 k=1 的特徵集。
    """
    current_features = list(X_train.columns)
    p = len(current_features)
    backward_subsets = {p: list(current_features)}

    while len(current_features) > 1:
        model = LinearRegressionModel(fit_intercept=True)
        model.fit(X_train[current_features], y_train)

        # 找出除了 Intercept 以外 p-value 最大的特徵
        feat_df = model.summary_df[model.summary_df['特徵變數'] != 'Intercept']
        worst_feat = feat_df.loc[feat_df['顯著性 p-value'].idxmax(), '特徵變數']

        current_features.remove(worst_feat)
        backward_subsets[len(current_features)] = list(current_features)

    return backward_subsets


# ==============================================================================
# 特徵篩選演算法 4: Lasso L1 正則化篩選 (Coordinate Descent & Path)
# ==============================================================================
def lasso_coordinate_descent(X, y, alpha, max_iter=1000, tol=1e-5):
    """
    以座標下降法 (Coordinate Descent) 求解標準化 Lasso 回歸。
    """
    n, p = X.shape
    beta = np.zeros(p)

    for _ in range(max_iter):
        beta_old = beta.copy()
        for j in range(p):
            # 計算部分殘差 partial residual
            r_j = y - (X @ beta) + X[:, j] * beta[j]
            rho_j = np.dot(X[:, j], r_j) / n

            # 軟閾值運算子 (Soft-thresholding)
            if rho_j < -alpha:
                beta[j] = rho_j + alpha
            elif rho_j > alpha:
                beta[j] = rho_j - alpha
            else:
                beta[j] = 0.0

        if np.max(np.abs(beta - beta_old)) < tol:
            break
    return beta


def lasso_feature_selection(X_train, y_train):
    """
    透過動態調整正則化參數 alpha 獲得 Lasso 係數收縮路徑，
    並依序提取剛好包含 1 到 5 個非零特徵之子集。
    """
    features = list(X_train.columns)
    # 標準化特徵與目標
    X_std = (X_train - X_train.mean()) / (X_train.std() + 1e-9)
    y_std = (y_train - y_train.mean()) / (y_train.std() + 1e-9)

    X_mat = X_std.values
    y_vec = y_std.values

    # 計算路徑 alphas
    alphas = np.logspace(0.5, -3.5, 300)
    coef_path = []
    for a in alphas:
        b = lasso_coordinate_descent(X_mat, y_vec, a)
        coef_path.append(b)

    coef_path = np.array(coef_path)

    # 依特徵絕對係數大小排序或由不同 alpha 挑選 k=1 到 5 個特徵
    # 對每一個特徵，找出其首次非零時的 alpha (alpha 越大表示越重要)
    entry_alphas = {}
    for j, feat in enumerate(features):
        non_zero_idx = np.where(np.abs(coef_path[:, j]) > 1e-4)[0]
        if len(non_zero_idx) > 0:
            entry_alphas[feat] = alphas[non_zero_idx[0]]
        else:
            entry_alphas[feat] = 0.0

    # 依照進場優先順序排序
    ranked_feats = sorted(entry_alphas.keys(), key=lambda k: entry_alphas[k], reverse=True)
    lasso_subsets = {k: ranked_feats[:k] for k in range(1, len(features) + 1)}

    return lasso_subsets, alphas, coef_path, ranked_feats


# ==============================================================================
# 特徵篩選演算法 5: Ridge 嶺回歸 L2 重要性排序
# ==============================================================================
def ridge_feature_selection(X_train, y_train, alpha=1.0):
    """
    以解析解求解標準化嶺回歸 beta = (X^T * X + alpha * I)^(-1) * X^T * y，
    根據標準化係數絕對值大小排序，選出 k=1 到 5 個特徵。
    """
    features = list(X_train.columns)
    X_std = (X_train - X_train.mean()) / (X_train.std() + 1e-9)
    y_std = (y_train - y_train.mean()) / (y_train.std() + 1e-9)

    X_mat = X_std.values
    y_vec = y_std.values
    p = X_mat.shape[1]

    # Ridge 解析解
    beta_ridge = np.linalg.inv(X_mat.T @ X_mat + alpha * np.eye(p)) @ X_mat.T @ y_vec
    ranked_indices = np.argsort(-np.abs(beta_ridge))
    ranked_features = [features[i] for i in ranked_indices]

    ridge_subsets = {k: ranked_features[:k] for k in range(1, len(features) + 1)}
    return ridge_subsets, pd.Series(np.abs(beta_ridge), index=features).sort_values(ascending=False)


# ==============================================================================
# 特徵篩選演算法 6: Pearson 相關係數排序 (單變量篩選)
# ==============================================================================
def correlation_feature_selection(X_train, y_train):
    """
    計算每個特徵與目標變數 y 的 Pearson 相關係數絕對值，依關聯強度排序選取。
    """
    features = list(X_train.columns)
    corrs = {}
    for feat in features:
        r, _ = stats.pearsonr(X_train[feat], y_train)
        corrs[feat] = abs(r)

    ranked_features = sorted(corrs.keys(), key=lambda k: corrs[k], reverse=True)
    corr_subsets = {k: ranked_features[:k] for k in range(1, len(features) + 1)}
    return corr_subsets, pd.Series(corrs).sort_values(ascending=False)


# ==============================================================================
# CRISP-DM 核心執行流程
# ==============================================================================
def run_crisp_dm_feature_selection_pipeline(csv_path='50_Startups.csv'):
    print("=" * 85)
    print("CRISP-DM 特徵工程專案：50_Startups 多元線性回歸 1~5 個特徵挑選比較")
    print("=" * 85)

    # Phase 1: 商業理解 (Business Understanding)
    print("\n【Phase 1: 商業理解 (Business Understanding)】")
    print("  * 核心目標：針對 5 個可能自變數，探討從 1 個選到 5 個自變數時的最佳預測模型組合。")
    print("  * 業務價值：評估在不同演算法約束下，最少需要多少/哪些指標即可精準預測新創獲利。")

    # Phase 2: 資料理解 (Data Understanding)
    print("\n【Phase 2: 資料理解 (Data Understanding)】")
    df = pd.read_csv(csv_path)
    print(f"  * 資料筆數：{df.shape[0]}，原始欄位：{list(df.columns)}")

    # Phase 3: 資料準備 (Data Preparation)
    print("\n【Phase 3: 資料準備 (Data Preparation)】")
    # One-Hot Encoding (drop_first=True 避免 Dummy Variable Trap)
    df_encoded = pd.get_dummies(df, columns=['State'], drop_first=True, dtype=float)
    X = df_encoded.drop(columns=['Profit'])
    y = df_encoded['Profit']
    feature_list = list(X.columns)
    print(f"  * 完成虛擬變數化，共有 {len(feature_list)} 個特徵變數：{feature_list}")

    # 切分訓練集 (80%) 與測試集 (20%)
    np.random.seed(42)
    indices = np.arange(len(df_encoded))
    np.random.shuffle(indices)
    split_idx = int(0.8 * len(df_encoded))

    X_train, X_test = X.iloc[indices[:split_idx]].copy(), X.iloc[indices[split_idx:]].copy()
    y_train, y_test = y.iloc[indices[:split_idx]].copy(), y.iloc[indices[split_idx:]].copy()
    print(f"  * 訓練集：{len(X_train)} 筆，測試集：{len(X_test)} 筆\n")

    # Phase 4: 模型建立與 5+ 種特徵篩選演算法 (Modeling)
    print("【Phase 4: 多重特徵篩選 (至少 5 種演算法挑選 k=1~5 個特徵)】")

    # 1. 最佳子集選取法
    best_subsets, best_subset_summary = best_subset_selection(X_train, y_train)
    # 2. 前向逐步選取法
    forward_subsets = forward_stepwise_selection(X_train, y_train)
    # 3. 後向淘汰法
    backward_subsets = backward_elimination_sequence(X_train, y_train)
    # 4. Lasso L1 正則化收縮法
    lasso_subsets, alphas, coef_path, lasso_rank = lasso_feature_selection(X_train, y_train)
    # 5. Ridge 嶺回歸 L2 重要性
    ridge_subsets, ridge_importance = ridge_feature_selection(X_train, y_train, alpha=1.0)
    # 6. Pearson 相關係數排序
    corr_subsets, corr_importance = correlation_feature_selection(X_train, y_train)

    # --------------------------------------------------------------------------
    # 整合表格 1: 各演算法在 k=1~5 挑選出的特徵子集對照表
    # --------------------------------------------------------------------------
    table1_rows = []
    for k in range(1, len(feature_list) + 1):
        table1_rows.append({
            '特徵數 k': k,
            '最佳子集 (Best Subset)': " + ".join(best_subsets[k]),
            '前向逐步 (Forward)': " + ".join(forward_subsets[k]),
            '後向淘汰 (Backward)': " + ".join(backward_subsets[k]),
            'Lasso (L1 懲罰)': " + ".join(lasso_subsets[k]),
            'Ridge (L2 權重)': " + ".join(ridge_subsets[k]),
            '相關係數 (Correlation)': " + ".join(corr_subsets[k])
        })
    table1_df = pd.DataFrame(table1_rows)

    print("\n" + "=" * 85)
    print("【表格 1: 各特徵篩選演算法在 k=1 到 5 挑選出的特徵子集清單】")
    print("=" * 85)
    for _, row in table1_df.iterrows():
        print(f"\n▶ 特徵數量 k = {row['特徵數 k']}:")
        print(f"  * 最佳子集 (Best Subset):  {row['最佳子集 (Best Subset)']}")
        print(f"  * 前向逐步 (Forward):      {row['前向逐步 (Forward)']}")
        print(f"  * 後向淘汰 (Backward):     {row['後向淘汰 (Backward)']}")
        print(f"  * Lasso (L1 懲罰):         {row['Lasso (L1 懲罰)']}")
        print(f"  * Ridge (L2 權重):         {row['Ridge (L2 權重)']}")
        print(f"  * 相關係數 (Correlation):  {row['相關係數 (Correlation)']}")

    # --------------------------------------------------------------------------
    # 整合表格 2: 各演算法挑選之子集在測試集 (Test Set) 的泛化評估對照表
    # --------------------------------------------------------------------------
    algorithms = {
        '最佳子集 (Best Subset)': best_subsets,
        '前向逐步 (Forward)': forward_subsets,
        '後向淘汰 (Backward)': backward_subsets,
        'Lasso (L1)': lasso_subsets,
        'Ridge (L2)': ridge_subsets,
        '相關係數 (Correlation)': corr_subsets
    }

    table2_rows = []
    for algo_name, subset_dict in algorithms.items():
        for k in range(1, len(feature_list) + 1):
            feats = subset_dict[k]
            model = LinearRegressionModel(fit_intercept=True)
            model.fit(X_train[feats], y_train)

            # 測試集預測與評估
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
            test_mape = np.mean(np.abs(res / y_test.values)) * 100.0

            table2_rows.append({
                '演算法': algo_name,
                '特徵數 k': k,
                '選取特徵': "+".join(feats),
                '訓練集 R^2': model.r2_,
                '測試集 R^2': test_r2,
                '測試集 Adj R^2': test_adj_r2,
                '測試集 MSE': test_mse,
                '測試集 RMSE': test_rmse,
                '測試集 MAE': test_mae,
                '測試集 MAPE (%)': test_mape
            })

    table2_df = pd.DataFrame(table2_rows)

    # 匯出完整評估指標為 CSV
    metrics_csv_path = os.path.join(os.getcwd(), 'feature_selection_metrics.csv')
    table2_df.to_csv(metrics_csv_path, index=False, encoding='utf-8-sig')

    print("\n" + "=" * 95)
    print("【表格 2: 最佳子集選取法 (Best Subset) 之詳細統計指標表 (含 R^2, Adj R^2, MSE, RMSE, MAE, AIC, BIC)】")
    print("=" * 95)
    formatted_bs = best_subset_summary.copy()
    formatted_bs['訓練集 MSE'] = formatted_bs['訓練集 MSE'].apply(lambda x: f"{x:,.1f}")
    formatted_bs['訓練集 RMSE'] = formatted_bs['訓練集 RMSE'].apply(lambda x: f"{x:,.2f}")
    formatted_bs['訓練集 MAE'] = formatted_bs['訓練集 MAE'].apply(lambda x: f"{x:,.2f}")
    formatted_bs['訓練集 R^2'] = formatted_bs['訓練集 R^2'].apply(lambda x: f"{x:.4f}")
    formatted_bs['訓練集 Adj R^2'] = formatted_bs['訓練集 Adj R^2'].apply(lambda x: f"{x:.4f}")
    print(formatted_bs.to_string(index=False))

    print("\n" + "=" * 95)
    print("【表格 3-1: 各演算法測試集 R^2 評估對照表 (判定係數，越接近 1 越好)】")
    print("=" * 95)
    pivot_r2 = table2_df.pivot(index='特徵數 k', columns='演算法', values='測試集 R^2').round(4)
    print(pivot_r2.to_string())

    print("\n" + "=" * 95)
    print("【表格 3-2: 各演算法測試集 MSE 均方誤差對照表 (Mean Squared Error，越小越好)】")
    print("=" * 95)
    pivot_mse = table2_df.pivot(index='特徵數 k', columns='演算法', values='測試集 MSE')
    print(pivot_mse.map(lambda x: f"{x:,.0f}").to_string())

    print("\n" + "=" * 95)
    print("【表格 3-3: 各演算法測試集 RMSE 均方根誤差對照表 (金額單位 $，越小越好)】")
    print("=" * 95)
    pivot_rmse = table2_df.pivot(index='特徵數 k', columns='演算法', values='測試集 RMSE')
    print(pivot_rmse.map(lambda x: f"${x:,.2f}").to_string())

    print("\n" + "=" * 95)
    print("【表格 3-4: 各演算法測試集 MAE 平均絕對誤差對照表 (金額單位 $，越小越好)】")
    print("=" * 95)
    pivot_mae = table2_df.pivot(index='特徵數 k', columns='演算法', values='測試集 MAE')
    print(pivot_mae.map(lambda x: f"${x:,.2f}").to_string())

    print("\n" + "=" * 95)
    print("【表格 3-5: 各演算法測試集 MAPE 平均絕對百分比誤差對照表 (%，越小越好)】")
    print("=" * 95)
    pivot_mape = table2_df.pivot(index='特徵數 k', columns='演算法', values='測試集 MAPE (%)')
    print(pivot_mape.map(lambda x: f"{x:.2f}%").to_string())
    print(f"\n  * 完整指標數據已同步匯出至：{metrics_csv_path}")

    # Phase 5: 模型評估與視覺化圖表產出 (Evaluation & Visualization)
    print("\n【Phase 5: 評估與診斷 (Evaluation & Visualization)】")
    print("  * 正在繪製特徵篩選與線性回歸綜合診斷圖...")

    fig, axes = plt.subplots(2, 3, figsize=(18, 11), dpi=150)

    # 1. 最佳子集模型評估指標曲線 (R^2, Adj R^2, AIC, BIC)
    ax1 = axes[0, 0]
    ks = best_subset_summary['特徵數 k']
    ax1.plot(ks, best_subset_summary['訓練集 R^2'], marker='o', color='#2980b9', lw=2, label='訓練集 R^2')
    ax1.plot(ks, best_subset_summary['訓練集 Adj R^2'], marker='s', color='#27ae60', lw=2, label='調整後 Adj R^2')
    best_adj_k = best_subset_summary.loc[best_subset_summary['訓練集 Adj R^2'].idxmax(), '特徵數 k']
    ax1.axvline(best_adj_k, color='#e74c3c', linestyle='--', label=f'最佳 Adj R^2 (k={best_adj_k})')
    ax1.set_title('圖 1: 最佳子集法之解釋力曲線 (R^2 與 Adj R^2)', fontsize=11, fontweight='bold')
    ax1.set_xlabel('特徵數量 k', fontsize=10)
    ax1.set_ylabel('判定係數', fontsize=10)
    ax1.set_xticks(ks)
    ax1.legend()
    ax1.grid(True, linestyle='--', alpha=0.5)

    # 2. Lasso 係數收縮路徑圖 (Lasso Path)
    ax2 = axes[0, 1]
    log_alphas = np.log10(alphas)
    colors = ['#e74c3c', '#3498db', '#f39c12', '#2ecc71', '#9b59b6']
    for j, feat in enumerate(feature_list):
        ax2.plot(log_alphas, coef_path[:, j], label=feat, lw=2, color=colors[j % len(colors)])
    ax2.axhline(0, color='black', linestyle=':', lw=1)
    ax2.set_title('圖 2: Lasso L1 正則化係數收縮路徑 (Lasso Path)', fontsize=11, fontweight='bold')
    ax2.set_xlabel('log10(正則化強度 alpha)', fontsize=10)
    ax2.set_ylabel('標準化係數值', fontsize=10)
    ax2.legend(loc='upper right', fontsize=8)
    ax2.grid(True, linestyle='--', alpha=0.5)

    # 3. 各演算法在測試集上的 R^2 表現比較 (k=1~5 折線/柱狀圖)
    ax3 = axes[0, 2]
    markers = ['o', 's', '^', 'v', 'D', 'x']
    for idx, algo in enumerate(algorithms.keys()):
        subset_data = table2_df[table2_df['演算法'] == algo]
        ax3.plot(subset_data['特徵數 k'], subset_data['測試集 R^2'], marker=markers[idx], label=algo, lw=1.8)
    ax3.set_title('圖 3: 5 大特徵篩選法在測試集 R^2 表現 (k=1~5)', fontsize=11, fontweight='bold')
    ax3.set_xlabel('特徵數量 k', fontsize=10)
    ax3.set_ylabel('測試集 R^2', fontsize=10)
    ax3.set_xticks(range(1, len(feature_list) + 1))
    ax3.legend(loc='lower right', fontsize=8)
    ax3.grid(True, linestyle='--', alpha=0.5)

    # 4. 各特徵被選入各演算法之頻率熱力圖 (以 k=2 與 k=3 為例)
    ax4 = axes[1, 0]
    freq_matrix = np.zeros((len(algorithms), len(feature_list)))
    algo_names_list = list(algorithms.keys())
    for i, algo in enumerate(algo_names_list):
        # 統計在 k=1~3 中特徵出現的次數
        for k in [1, 2, 3]:
            for feat in algorithms[algo][k]:
                j = feature_list.index(feat)
                freq_matrix[i, j] += 1

    cax = ax4.imshow(freq_matrix, cmap='YlGnBu', aspect='auto')
    ax4.set_xticks(range(len(feature_list)))
    ax4.set_xticklabels(feature_list, rotation=25, ha='right', fontsize=9)
    ax4.set_yticks(range(len(algo_names_list)))
    ax4.set_yticklabels(algo_names_list, fontsize=9)
    for i in range(len(algo_names_list)):
        for j in range(len(feature_list)):
            ax4.text(j, i, int(freq_matrix[i, j]), ha='center', va='center', color='black', fontweight='bold')
    fig.colorbar(cax, ax=ax4, shrink=0.7, label='在 k=1~3 累計選中次數')
    ax4.set_title('圖 4: 各特徵在不同演算法中被挑選頻率矩陣', fontsize=11, fontweight='bold')

    # 5. 最佳模型測試集預測 vs 真實值
    # 選擇最佳特徵組合 (例如最佳子集 k=best_adj_k 或最精簡高解釋模型)
    optimal_features = best_subsets[best_adj_k]
    final_model = LinearRegressionModel(fit_intercept=True)
    final_model.fit(X_train[optimal_features], y_train)
    y_test_pred = final_model.predict(X_test[optimal_features])

    ax5 = axes[1, 1]
    ax5.scatter(y_test, y_test_pred, color='#e67e22', edgecolors='black', s=70, label='測試集樣本')
    min_val = min(y_test.min(), y_test_pred.min()) * 0.95
    max_val = max(y_test.max(), y_test_pred.max()) * 1.05
    ax5.plot([min_val, max_val], [min_val, max_val], 'r--', lw=2, label='完美預測線 (y=x)')
    ax5.set_title(f'圖 5: 最佳模型 (k={best_adj_k}) 預測 vs 真實利潤', fontsize=11, fontweight='bold')
    ax5.set_xlabel('真實利潤 Actual Profit ($)', fontsize=10)
    ax5.set_ylabel('預測利潤 Predicted Profit ($)', fontsize=10)
    ax5.legend()
    ax5.grid(True, linestyle='--', alpha=0.5)

    # 6. 殘差診斷圖 (Residuals vs Fitted)
    ax6 = axes[1, 2]
    ax6.scatter(final_model.fitted_values_, final_model.residuals_, color='#8e44ad', edgecolors='black', s=60, alpha=0.8)
    ax6.axhline(0, color='red', linestyle='--', lw=1.5)
    ax6.set_title('圖 6: 最佳模型殘差 vs 擬合值 (同質變異與線性度)', fontsize=11, fontweight='bold')
    ax6.set_xlabel('擬合值 Fitted Values ($)', fontsize=10)
    ax6.set_ylabel('殘差 Residuals ($)', fontsize=10)
    ax6.grid(True, linestyle='--', alpha=0.5)

    plt.suptitle('50_Startups CRISP-DM 特徵篩選演算法 (k=1~5) 與回歸診斷報告', fontsize=15, fontweight='bold', y=0.99)
    plt.tight_layout()

    report_img_path = os.path.join(os.getcwd(), 'crisp_dm_feature_selection_report.png')
    plt.savefig(report_img_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"  * 綜合評估圖表已順利存檔至：{report_img_path}")

    # Phase 6: 部署與預測 (Deployment)
    print("\n【Phase 6: 部署與決策建議 (Deployment)】")
    print(f"  * 依統計推論與泛化能力，建議首選模型為 k = {best_adj_k} 個特徵：{optimal_features}")
    print("  * 最佳模型回歸公式：")
    terms = [f"{final_model.intercept_:.2f}"]
    for feat, c in zip(optimal_features, final_model.coef_):
        terms.append(f"({c:.4f} * {feat})")
    print(f"    Profit = {' + '.join(terms)}")

    print("\n" + "=" * 85)
    print("特徵篩選與線性回歸流程全部順利執行完成！")
    print("=" * 85)

    return table1_df, table2_df, report_img_path


if __name__ == '__main__':
    run_crisp_dm_feature_selection_pipeline()
