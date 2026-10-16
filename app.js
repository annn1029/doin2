/**
 * CRISP-DM Analytics Lab - Interactive Dashboard Logic
 * Supports 50_Startups and Boston Housing datasets with dynamic dropdown switching
 */

let currentDatasetKey = 'startups';
let chartInstances = {};

// 預設 CRISP-DM 流程說明內容
const CRISP_PHASE_DESCRIPTIONS = {
  startups: {
    p1: { title: "Phase 1: 商業理解", desc: "目標為協助創投基金與新創管理團隊評估研發、行銷與行政預算對獲利的邊際效益，找出最佳資源配置策略。" },
    p2: { title: "Phase 2: 資料理解", desc: "50 筆新創公司樣本，包含 3 項主要成本支出 (R&D, Administration, Marketing) 與州別 (State)。目標變數為連續型 Profit。" },
    p3: { title: "Phase 3: 資料準備", desc: "對 State 實施 One-Hot Encoding，drop_first=True 避免虛擬變數陷阱；進行 80/20 訓練/測試切分 (40/10)。" },
    p4: { title: "Phase 4: 模型建立", desc: "運用最佳子集、逐步前向、後向淘汰、Lasso L1 正則化、Ridge L2 與相關係數等 6 大演算法從 k=1 選到 k=5 個特徵。" },
    p5: { title: "Phase 5: 模型評估", desc: "測試集 R^2、MSE、RMSE、MAE 與 MAPE 綜合評估；配合殘差診斷與同質變異性檢定確認回歸統計假定。" },
    p6: { title: "Phase 6: 部署應用", desc: "封裝最佳多元回歸模型，提供即時互動獲利試算器，輸入特定預算即可秒級預估預期收益與決策建議。" }
  },
  boston: {
    p1: { title: "Phase 1: 商業理解", desc: "評估都市經濟學與居住環境指標 (犯罪率、房間數、低收入人口比例、學區師生比等) 對波士頓房價中位數的影響機制。" },
    p2: { title: "Phase 2: 資料理解", desc: "波士頓郊區房價資料集，共 13 個生態/結構/地理自變數 (如 RM, LSTAT, PTRATIO)，目標變數 MEDV 為房價 (千美元)。" },
    p3: { title: "Phase 3: 資料準備", desc: "數值特徵標準化與異常值檢視，進行 80/20 隨機抽樣切分以進行無偏估計。" },
    p4: { title: "Phase 4: 模型建立", desc: "透過 6 大特徵篩選法，評估從 1 個指標到 5 個核心指標在不同約束懲罰下的關鍵子集表現。" },
    p5: { title: "Phase 5: 模型評估", desc: "比較各子集在測試集上的泛化預測誤差，確認 LSTAT (低收入比率) 與 RM (房間數) 的支配性解釋力。" },
    p6: { title: "Phase 6: 部署應用", desc: "建立房價試算模型，房地產估價師可輸入標的周邊環境參數快速估算合理房產估值。" }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 確認資料是否載入
  if (!window.DASHBOARD_DATA) {
    console.error("找不到 DASHBOARD_DATA，請確認 data.js 是否存在");
    return;
  }

  // 初始化選擇器監聽
  const selector = document.getElementById('datasetSelect');
  if (selector) {
    selector.addEventListener('change', (e) => {
      switchDataset(e.target.value);
    });
  }

  // 初始化頁籤切換
  setupTabs();

  // 渲染當前預設主題
  renderDashboard(currentDatasetKey);
});

function switchDataset(key) {
  currentDatasetKey = key;
  renderDashboard(key);
}

function renderDashboard(key) {
  const data = window.DASHBOARD_DATA[key];
  if (!data) return;

  // 1. 更新 CRISP-DM 流程卡片文字
  updateCrispSteps(key);

  // 2. 更新頂部 KPI 指標
  updateKPIs(data);

  // 3. 渲染圖表
  renderCharts(data);

  // 4. 渲染數據表格
  renderTables(data);

  // 5. 渲染互動試算器
  renderSimulator(data);
}

/* ==============================================================================
   1. 更新 CRISP-DM 導覽橫幅
   ============================================================================== */
function updateCrispSteps(key) {
  const p = CRISP_PHASE_DESCRIPTIONS[key];
  for (let i = 1; i <= 6; i++) {
    const el = document.getElementById(`crisp-step-${i}`);
    if (el && p[`p${i}`]) {
      el.querySelector('.step-title').textContent = p[`p${i}`].title;
      el.querySelector('.step-desc').textContent = p[`p${i}`].desc;
    }
  }
}

/* ==============================================================================
   2. 更新頂部 KPI 卡片
   ============================================================================== */
function updateKPIs(data) {
  const isStartups = (data.target_col === 'Profit');
  const unitPrefix = isStartups ? '$' : '$';
  const unitSuffix = isStartups ? '' : 'k';

  document.getElementById('kpiTarget').textContent = `${data.target_col} (${isStartups ? '新創獲利' : '房價千美元'})`;
  document.getElementById('kpiSamples').textContent = `${data.total_samples} 筆 (${data.features_count} 特徵)`;
  document.getElementById('kpiR2').textContent = data.final_model.test_r2.toFixed(4);
  
  if (isStartups) {
    document.getElementById('kpiMSE').textContent = Math.round(data.final_model.test_mse).toLocaleString();
    document.getElementById('kpiRMSE').textContent = `$${data.final_model.test_rmse.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('kpiMAE').textContent = `$${data.final_model.test_mae.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  } else {
    document.getElementById('kpiMSE').textContent = data.final_model.test_mse.toFixed(2);
    document.getElementById('kpiRMSE').textContent = `$${data.final_model.test_rmse.toFixed(2)}k`;
    document.getElementById('kpiMAE').textContent = `$${data.final_model.test_mae.toFixed(2)}k`;
  }

  document.getElementById('kpiOptimalK').textContent = `k = ${data.optimal_k}`;
  document.getElementById('kpiTopFeature').textContent = data.optimal_features[0] || 'N/A';
}

/* ==============================================================================
   3. 渲染圖表 (上面要有圖)
   ============================================================================== */
function renderCharts(data) {
  // 清理現有圖表
  Object.keys(chartInstances).forEach(name => {
    if (chartInstances[name]) {
      chartInstances[name].destroy();
    }
  });

  const isStartups = (data.target_col === 'Profit');

  // 圖 1: 特徵數量 vs. 解釋力曲線 (R^2 & Adj R^2)
  const ctxCriteria = document.getElementById('chartCriteria').getContext('2d');
  const ks = data.best_subset_records.map(r => `k=${r.k}`);
  const r2s = data.best_subset_records.map(r => r.train_r2);
  const adjR2s = data.best_subset_records.map(r => r.train_adj_r2);

  chartInstances.criteria = new Chart(ctxCriteria, {
    type: 'line',
    data: {
      labels: ks,
      datasets: [
        {
          label: '訓練集 R²',
          data: r2s,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderWidth: 3,
          tension: 0.3,
          pointRadius: 6,
          pointHoverRadius: 8
        },
        {
          label: '調整後 Adj R²',
          data: adjR2s,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderWidth: 3,
          tension: 0.3,
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#e5e7eb', font: { family: 'Inter', weight: 600 } } },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleFont: { family: 'Outfit', size: 13 },
          bodyFont: { family: 'Inter', size: 12 }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9ca3af' } },
        y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9ca3af' } }
      }
    }
  });

  // 圖 2: 最佳子集測試集 MSE & RMSE 誤差曲線
  const ctxErrors = document.getElementById('chartErrors').getContext('2d');
  // 提取最佳子集演算法在各 k 的 test_rmse
  const bestSubsetEvals = data.eval_matrix.filter(e => e.algorithm === '最佳子集 (Best Subset)');
  const testRMSEs = bestSubsetEvals.map(e => e.test_rmse);
  const testMAEs = bestSubsetEvals.map(e => e.test_mae);

  chartInstances.errors = new Chart(ctxErrors, {
    type: 'line',
    data: {
      labels: ks,
      datasets: [
        {
          label: `測試集 RMSE (${isStartups ? '$' : '$k'})`,
          data: testRMSEs,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          borderWidth: 2.5,
          tension: 0.3,
          pointRadius: 5
        },
        {
          label: `測試集 MAE (${isStartups ? '$' : '$k'})`,
          data: testMAEs,
          borderColor: '#f43f5e',
          backgroundColor: 'rgba(244, 63, 94, 0.2)',
          borderWidth: 2.5,
          tension: 0.3,
          pointRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#e5e7eb', font: { family: 'Inter', weight: 600 } } }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9ca3af' } },
        y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9ca3af' } }
      }
    }
  });

  // 圖 3: 最佳模型測試集 真實值 vs. 預測值 散佈圖
  const ctxScatter = document.getElementById('chartScatter').getContext('2d');
  const scatterData = data.scatter_points.map(pt => ({ x: pt.actual, y: pt.pred }));
  
  // 計算完美預測線 (y=x)
  const minVal = Math.min(...scatterData.map(p => Math.min(p.x, p.y))) * 0.95;
  const maxVal = Math.max(...scatterData.map(p => Math.max(p.x, p.y))) * 1.05;

  chartInstances.scatter = new Chart(ctxScatter, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: '測試集樣本擬合點',
          data: scatterData,
          backgroundColor: '#06b6d4',
          borderColor: '#fff',
          borderWidth: 1.5,
          pointRadius: 6,
          pointHoverRadius: 8
        },
        {
          type: 'line',
          label: '理想預測線 (y = x)',
          data: [{ x: minVal, y: minVal }, { x: maxVal, y: maxVal }],
          borderColor: '#ef4444',
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#e5e7eb', font: { family: 'Inter', weight: 600 } } },
        tooltip: {
          callbacks: {
            label: (ctx) => `真實: ${ctx.parsed.x.toLocaleString()} | 預測: ${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: { 
          title: { display: true, text: `真實值 Actual ${data.target_col}`, color: '#9ca3af' },
          grid: { color: 'rgba(255,255,255,0.06)' }, 
          ticks: { color: '#9ca3af' } 
        },
        y: { 
          title: { display: true, text: `預測值 Predicted ${data.target_col}`, color: '#9ca3af' },
          grid: { color: 'rgba(255,255,255,0.06)' }, 
          ticks: { color: '#9ca3af' } 
        }
      }
    }
  });

  // 圖 4: 自變數與目標變數之 Pearson 相關係數排名
  const ctxCorr = document.getElementById('chartCorr').getContext('2d');
  const corrLabels = data.corr_chart_data.map(c => c.feature);
  const corrValues = data.corr_chart_data.map(c => c.corr);

  chartInstances.corr = new Chart(ctxCorr, {
    type: 'bar',
    data: {
      labels: corrLabels,
      datasets: [{
        label: 'Pearson 相關係數',
        data: corrValues,
        backgroundColor: corrValues.map(v => v >= 0 ? 'rgba(99, 102, 241, 0.75)' : 'rgba(244, 63, 94, 0.75)'),
        borderColor: corrValues.map(v => v >= 0 ? '#6366f1' : '#f43f5e'),
        borderWidth: 1.5,
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { 
          min: -1.0, 
          max: 1.0, 
          grid: { color: 'rgba(255,255,255,0.06)' }, 
          ticks: { color: '#9ca3af' } 
        },
        y: { 
          grid: { display: false }, 
          ticks: { color: '#e5e7eb', font: { family: 'Inter', weight: 600 } } 
        }
      }
    }
  });

  // 圖 5: 各演算法測試集 R^2 橫向對比柱狀圖 (比較 optimal_k 下的表現)
  const ctxAlgo = document.getElementById('chartAlgo').getContext('2d');
  const algos = ['最佳子集 (Best Subset)', '前向逐步 (Forward)', '後向淘汰 (Backward)', 'Lasso (L1)', 'Ridge (L2)', '相關係數 (Correlation)'];
  const algoR2s = algos.map(name => {
    const item = data.eval_matrix.find(e => e.algorithm === name && e.k === data.optimal_k);
    return item ? item.test_r2 : 0;
  });

  chartInstances.algo = new Chart(ctxAlgo, {
    type: 'bar',
    data: {
      labels: algos,
      datasets: [{
        label: `測試集 R² (特徵數 k=${data.optimal_k})`,
        data: algoR2s,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: '#10b981',
        borderWidth: 1.5,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#e5e7eb', font: { family: 'Inter', weight: 600 } } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#e5e7eb', font: { size: 11 } } },
        y: { min: 0.5, max: 1.0, grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9ca3af' } }
      }
    }
  });
}

/* ==============================================================================
   4. 渲染數據表格 (還有數據等等的)
   ============================================================================== */
function renderTables(data) {
  const isStartups = (data.target_col === 'Profit');

  // 1. Tab 1: 特徵子集清單
  const t1Body = document.querySelector('#tableSubsets tbody');
  t1Body.innerHTML = '';
  for (let k = 1; k <= 5; k++) {
    const tr = document.createElement('tr');
    const bs = data.eval_matrix.find(e => e.algorithm === '最佳子集 (Best Subset)' && e.k === k);
    const fwd = data.eval_matrix.find(e => e.algorithm === '前向逐步 (Forward)' && e.k === k);
    const bwd = data.eval_matrix.find(e => e.algorithm === '後向淘汰 (Backward)' && e.k === k);
    const lasso = data.eval_matrix.find(e => e.algorithm === 'Lasso (L1)' && e.k === k);
    const ridge = data.eval_matrix.find(e => e.algorithm === 'Ridge (L2)' && e.k === k);
    const corr = data.eval_matrix.find(e => e.algorithm === '相關係數 (Correlation)' && e.k === k);

    tr.innerHTML = `
      <td><strong>k = ${k}</strong> ${k === data.optimal_k ? '<span class="badge-optimal">最佳</span>' : ''}</td>
      <td><code>${bs ? bs.features_str : ''}</code></td>
      <td><code>${fwd ? fwd.features_str : ''}</code></td>
      <td><code>${bwd ? bwd.features_str : ''}</code></td>
      <td><code>${lasso ? lasso.features_str : ''}</code></td>
      <td><code>${ridge ? ridge.features_str : ''}</code></td>
      <td><code>${corr ? corr.features_str : ''}</code></td>
    `;
    t1Body.appendChild(tr);
  }

  // 2. Tab 2: 最佳子集詳細統計表
  const t2Body = document.querySelector('#tableBestSubsetDetails tbody');
  t2Body.innerHTML = '';
  data.best_subset_records.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>k = ${r.k}</strong> ${r.k === data.optimal_k ? '<span class="badge-optimal">最佳</span>' : ''}</td>
      <td><code>${r.features_str}</code></td>
      <td class="highlight-val">${r.train_r2.toFixed(4)}</td>
      <td>${r.train_adj_r2.toFixed(4)}</td>
      <td>${isStartups ? Math.round(r.train_mse).toLocaleString() : r.train_mse.toFixed(2)}</td>
      <td>${isStartups ? '$' + r.train_rmse.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '$' + r.train_rmse.toFixed(2) + 'k'}</td>
      <td>${isStartups ? '$' + r.train_mae.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '$' + r.train_mae.toFixed(2) + 'k'}</td>
      <td>${r.aic.toFixed(2)}</td>
      <td>${r.bic.toFixed(2)}</td>
    `;
    t2Body.appendChild(tr);
  });

  // 3. Tab 3: 測試集 R2 矩陣
  renderPivotTable('#tablePivotR2', data, (item) => item.test_r2.toFixed(4));

  // 4. Tab 4: 測試集 MSE 矩陣
  renderPivotTable('#tablePivotMSE', data, (item) => isStartups ? Math.round(item.test_mse).toLocaleString() : item.test_mse.toFixed(2));

  // 5. Tab 5: 測試集 RMSE 矩陣
  renderPivotTable('#tablePivotRMSE', data, (item) => isStartups ? '$' + item.test_rmse.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '$' + item.test_rmse.toFixed(2) + 'k');

  // 6. Tab 6: 測試集 MAE 矩陣
  renderPivotTable('#tablePivotMAE', data, (item) => isStartups ? '$' + item.test_mae.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '$' + item.test_mae.toFixed(2) + 'k');
}

function renderPivotTable(tableSelector, data, formatFn) {
  const tbody = document.querySelector(`${tableSelector} tbody`);
  if (!tbody) return;
  tbody.innerHTML = '';
  const algos = ['最佳子集 (Best Subset)', '前向逐步 (Forward)', '後向淘汰 (Backward)', 'Lasso (L1)', 'Ridge (L2)', '相關係數 (Correlation)'];

  for (let k = 1; k <= 5; k++) {
    const tr = document.createElement('tr');
    let cells = `<td><strong>k = ${k}</strong> ${k === data.optimal_k ? '<span class="badge-optimal">最佳</span>' : ''}</td>`;
    algos.forEach(algo => {
      const match = data.eval_matrix.find(e => e.algorithm === algo && e.k === k);
      cells += `<td>${match ? formatFn(match) : '-'}</td>`;
    });
    tr.innerHTML = cells;
    tbody.appendChild(tr);
  }
}

/* ==============================================================================
   5. 頁籤切換控制
   ============================================================================== */
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
      btn.classList.add('active');
      const targetPane = document.getElementById(btn.dataset.target);
      if (targetPane) {
        targetPane.style.display = 'block';
      }
    });
  });
}

/* ==============================================================================
   6. 互動回歸試算器 (Live Simulation)
   ============================================================================== */
function renderSimulator(data) {
  const container = document.getElementById('simInputsContainer');
  container.innerHTML = '';
  const isStartups = (data.target_col === 'Profit');

  const defaults = isStartups ? {
    'R&D Spend': { min: 0, max: 200000, val: 100000, step: 5000, unit: '$' },
    'Marketing Spend': { min: 0, max: 500000, val: 250000, step: 10000, unit: '$' },
    'State_New York': { min: 0, max: 1, val: 1, step: 1, unit: '類別 (0/1)' }
  } : {
    'LSTAT': { min: 1, max: 40, val: 12.5, step: 0.5, unit: '%' },
    'RM': { min: 3, max: 9, val: 6.2, step: 0.1, unit: '間' },
    'PTRATIO': { min: 10, max: 25, val: 18.0, step: 0.5, unit: '師生比' },
    'DIS': { min: 1, max: 12, val: 4.0, step: 0.2, unit: '距離' },
    'NOX': { min: 0.3, max: 0.9, val: 0.55, step: 0.02, unit: 'ppm' }
  };

  data.optimal_features.forEach(feat => {
    const conf = defaults[feat] || { min: 0, max: 100, val: 50, step: 1, unit: '' };
    const group = document.createElement('div');
    group.className = 'sim-input-group';
    group.innerHTML = `
      <label>
        <span>${feat}</span>
        <span id="labelVal_${feat}">${conf.val} ${conf.unit}</span>
      </label>
      <input type="range" id="range_${feat}" min="${conf.min}" max="${conf.max}" step="${conf.step}" value="${conf.val}">
    `;
    container.appendChild(group);

    const slider = group.querySelector(`#range_${feat}`);
    slider.addEventListener('input', () => {
      document.getElementById(`labelVal_${feat}`).textContent = `${slider.value} ${conf.unit}`;
      calculateSimulation(data);
    });
  });

  // 顯示公式
  const terms = [`${data.final_model.intercept.toFixed(2)}`];
  Object.keys(data.final_model.coefficients).forEach(f => {
    terms.push(`(${data.final_model.coefficients[f].toFixed(4)} × ${f})`);
  });
  document.getElementById('simFormula').textContent = `${data.target_col} = ${terms.join(' + ')}`;

  calculateSimulation(data);
}

function calculateSimulation(data) {
  let y_pred = data.final_model.intercept;
  data.optimal_features.forEach(feat => {
    const slider = document.getElementById(`range_${feat}`);
    const val = slider ? parseFloat(slider.value) : 0;
    const coef = data.final_model.coefficients[feat] || 0;
    y_pred += coef * val;
  });

  const isStartups = (data.target_col === 'Profit');
  const outputEl = document.getElementById('simOutputValue');
  if (isStartups) {
    outputEl.textContent = `$${Math.round(y_pred).toLocaleString()}`;
  } else {
    outputEl.textContent = `$${y_pred.toFixed(2)}k (約 $${Math.round(y_pred * 1000).toLocaleString()})`;
  }
}
