// 自動生成之回歸分析數據
window.DASHBOARD_DATA = {
  "startups": {
    "dataset_name": "50_Startups 新創獲利預測",
    "target_col": "Profit",
    "total_samples": 50,
    "train_samples": 40,
    "test_samples": 10,
    "features_count": 5,
    "all_features": [
      "R&D Spend",
      "Administration",
      "Marketing Spend",
      "State_Florida",
      "State_New York"
    ],
    "optimal_k": 2,
    "optimal_features": [
      "R&D Spend",
      "Marketing Spend"
    ],
    "final_model": {
      "intercept": 49014.53501786642,
      "coefficients": {
        "R&D Spend": 0.794948039969883,
        "Marketing Spend": 0.02530463053232656
      },
      "test_r2": 0.8763677463390387,
      "test_mse": 191025924.32240102,
      "test_rmse": 13821.212838329386,
      "test_mae": 9337.710905157146,
      "test_mape": 29.09400797691708
    },
    "best_subset_records": [
      {
        "k": 1,
        "features": [
          "R&D Spend"
        ],
        "features_str": "R&D Spend",
        "train_r2": 0.9639102753496279,
        "train_adj_r2": 0.9629605457535655,
        "train_mse": 57450579.240843296,
        "train_rmse": 7579.616035185641,
        "train_mae": 6289.9983250563,
        "aic": 720.6574257891767,
        "bic": 725.7240641515185
      },
      {
        "k": 2,
        "features": [
          "R&D Spend",
          "Marketing Spend"
        ],
        "features_str": "R&D Spend + Marketing Spend",
        "train_r2": 0.967055524404828,
        "train_adj_r2": 0.9652747419402241,
        "train_mse": 52443714.216837086,
        "train_rmse": 7241.803243449595,
        "train_mae": 5924.067243007022,
        "aic": 719.0100416914071,
        "bic": 725.7655595078628
      },
      {
        "k": 3,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York",
        "train_r2": 0.96844922592908,
        "train_adj_r2": 0.9658199947565034,
        "train_mse": 50225105.994335756,
        "train_rmse": 7086.967334081324,
        "train_mae": 5815.879846383114,
        "aic": 719.2810231621202,
        "bic": 727.7254204326898
      },
      {
        "k": 4,
        "features": [
          "R&D Spend",
          "Administration",
          "Marketing Spend",
          "State_New York"
        ],
        "features_str": "R&D Spend + Administration + Marketing Spend + State_New York",
        "train_r2": 0.9687069895200587,
        "train_adj_r2": 0.9651306454652082,
        "train_mse": 49814776.800849654,
        "train_rmse": 7057.958401751151,
        "train_mae": 5792.771888801469,
        "aic": 720.9528888355989,
        "bic": 731.0861655602824
      },
      {
        "k": 5,
        "features": [
          "R&D Spend",
          "Administration",
          "Marketing Spend",
          "State_Florida",
          "State_New York"
        ],
        "features_str": "R&D Spend + Administration + Marketing Spend + State_Florida + State_New York",
        "train_r2": 0.9687430326110055,
        "train_adj_r2": 0.9641464197596827,
        "train_mse": 49757400.456957184,
        "train_rmse": 7053.892574809825,
        "train_mae": 5832.2420749583425,
        "aic": 722.9067905363969,
        "bic": 734.7289467151944
      }
    ],
    "eval_matrix": [
      {
        "algorithm": "最佳子集 (Best Subset)",
        "k": 1,
        "features": [
          "R&D Spend"
        ],
        "features_str": "R&D Spend",
        "train_r2": 0.9639102753496279,
        "test_r2": 0.8704243047740622,
        "test_adj_r2": 0.85422734287082,
        "test_mse": 200209219.0127924,
        "test_rmse": 14149.53069938337,
        "test_mae": 9725.148811311916,
        "test_mape": 29.8019353889437
      },
      {
        "algorithm": "最佳子集 (Best Subset)",
        "k": 2,
        "features": [
          "R&D Spend",
          "Marketing Spend"
        ],
        "features_str": "R&D Spend + Marketing Spend",
        "train_r2": 0.967055524404828,
        "test_r2": 0.8763677463390387,
        "test_adj_r2": 0.8410442452930498,
        "test_mse": 191025924.32240102,
        "test_rmse": 13821.212838329386,
        "test_mae": 9337.710905157146,
        "test_mape": 29.09400797691708
      },
      {
        "algorithm": "最佳子集 (Best Subset)",
        "k": 3,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York",
        "train_r2": 0.96844922592908,
        "test_r2": 0.8632012408642491,
        "test_adj_r2": 0.7948018612963736,
        "test_mse": 211369676.08571497,
        "test_rmse": 14538.55825333843,
        "test_mae": 10154.173964698297,
        "test_mape": 30.542111924971056
      },
      {
        "algorithm": "最佳子集 (Best Subset)",
        "k": 4,
        "features": [
          "R&D Spend",
          "Administration",
          "Marketing Spend",
          "State_New York"
        ],
        "features_str": "R&D Spend + Administration + Marketing Spend + State_New York",
        "train_r2": 0.9687069895200587,
        "test_r2": 0.8570800420194233,
        "test_adj_r2": 0.742744075634962,
        "test_mse": 220827626.0354154,
        "test_rmse": 14860.270052573587,
        "test_mae": 10567.859730278202,
        "test_mape": 30.968196917898812
      },
      {
        "algorithm": "最佳子集 (Best Subset)",
        "k": 5,
        "features": [
          "R&D Spend",
          "Administration",
          "Marketing Spend",
          "State_Florida",
          "State_New York"
        ],
        "features_str": "R&D Spend + Administration + Marketing Spend + State_Florida + State_New York",
        "train_r2": 0.9687430326110055,
        "test_r2": 0.8560833333190012,
        "test_adj_r2": 0.6761874999677528,
        "test_mse": 222367654.58897105,
        "test_rmse": 14911.99700204406,
        "test_mae": 10719.996875308014,
        "test_mape": 30.933233436762052
      },
      {
        "algorithm": "前向逐步 (Forward)",
        "k": 1,
        "features": [
          "R&D Spend"
        ],
        "features_str": "R&D Spend",
        "train_r2": 0.9639102753496279,
        "test_r2": 0.8704243047740622,
        "test_adj_r2": 0.85422734287082,
        "test_mse": 200209219.0127924,
        "test_rmse": 14149.53069938337,
        "test_mae": 9725.148811311916,
        "test_mape": 29.8019353889437
      },
      {
        "algorithm": "前向逐步 (Forward)",
        "k": 2,
        "features": [
          "R&D Spend",
          "Marketing Spend"
        ],
        "features_str": "R&D Spend + Marketing Spend",
        "train_r2": 0.967055524404828,
        "test_r2": 0.8763677463390387,
        "test_adj_r2": 0.8410442452930498,
        "test_mse": 191025924.32240102,
        "test_rmse": 13821.212838329386,
        "test_mae": 9337.710905157146,
        "test_mape": 29.09400797691708
      },
      {
        "algorithm": "前向逐步 (Forward)",
        "k": 3,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York",
        "train_r2": 0.96844922592908,
        "test_r2": 0.8632012408642491,
        "test_adj_r2": 0.7948018612963736,
        "test_mse": 211369676.08571497,
        "test_rmse": 14538.55825333843,
        "test_mae": 10154.173964698297,
        "test_mape": 30.542111924971056
      },
      {
        "algorithm": "前向逐步 (Forward)",
        "k": 4,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York",
          "Administration"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York + Administration",
        "train_r2": 0.9687069895200587,
        "test_r2": 0.8570800420194233,
        "test_adj_r2": 0.742744075634962,
        "test_mse": 220827626.0354154,
        "test_rmse": 14860.270052573587,
        "test_mae": 10567.859730278204,
        "test_mape": 30.968196917898815
      },
      {
        "algorithm": "前向逐步 (Forward)",
        "k": 5,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York",
          "Administration",
          "State_Florida"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York + Administration + State_Florida",
        "train_r2": 0.9687430326110055,
        "test_r2": 0.8560833333190013,
        "test_adj_r2": 0.6761874999677531,
        "test_mse": 222367654.5889709,
        "test_rmse": 14911.997002044056,
        "test_mae": 10719.996875308007,
        "test_mape": 30.933233436762052
      },
      {
        "algorithm": "後向淘汰 (Backward)",
        "k": 1,
        "features": [
          "R&D Spend"
        ],
        "features_str": "R&D Spend",
        "train_r2": 0.9639102753496279,
        "test_r2": 0.8704243047740622,
        "test_adj_r2": 0.85422734287082,
        "test_mse": 200209219.0127924,
        "test_rmse": 14149.53069938337,
        "test_mae": 9725.148811311916,
        "test_mape": 29.8019353889437
      },
      {
        "algorithm": "後向淘汰 (Backward)",
        "k": 2,
        "features": [
          "R&D Spend",
          "Marketing Spend"
        ],
        "features_str": "R&D Spend + Marketing Spend",
        "train_r2": 0.967055524404828,
        "test_r2": 0.8763677463390387,
        "test_adj_r2": 0.8410442452930498,
        "test_mse": 191025924.32240102,
        "test_rmse": 13821.212838329386,
        "test_mae": 9337.710905157146,
        "test_mape": 29.09400797691708
      },
      {
        "algorithm": "後向淘汰 (Backward)",
        "k": 3,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York",
        "train_r2": 0.96844922592908,
        "test_r2": 0.8632012408642491,
        "test_adj_r2": 0.7948018612963736,
        "test_mse": 211369676.08571497,
        "test_rmse": 14538.55825333843,
        "test_mae": 10154.173964698297,
        "test_mape": 30.542111924971056
      },
      {
        "algorithm": "後向淘汰 (Backward)",
        "k": 4,
        "features": [
          "R&D Spend",
          "Administration",
          "Marketing Spend",
          "State_New York"
        ],
        "features_str": "R&D Spend + Administration + Marketing Spend + State_New York",
        "train_r2": 0.9687069895200587,
        "test_r2": 0.8570800420194233,
        "test_adj_r2": 0.742744075634962,
        "test_mse": 220827626.0354154,
        "test_rmse": 14860.270052573587,
        "test_mae": 10567.859730278202,
        "test_mape": 30.968196917898812
      },
      {
        "algorithm": "後向淘汰 (Backward)",
        "k": 5,
        "features": [
          "R&D Spend",
          "Administration",
          "Marketing Spend",
          "State_Florida",
          "State_New York"
        ],
        "features_str": "R&D Spend + Administration + Marketing Spend + State_Florida + State_New York",
        "train_r2": 0.9687430326110055,
        "test_r2": 0.8560833333190012,
        "test_adj_r2": 0.6761874999677528,
        "test_mse": 222367654.58897105,
        "test_rmse": 14911.99700204406,
        "test_mae": 10719.996875308014,
        "test_mape": 30.933233436762052
      },
      {
        "algorithm": "Lasso (L1)",
        "k": 1,
        "features": [
          "R&D Spend"
        ],
        "features_str": "R&D Spend",
        "train_r2": 0.9639102753496279,
        "test_r2": 0.8704243047740622,
        "test_adj_r2": 0.85422734287082,
        "test_mse": 200209219.0127924,
        "test_rmse": 14149.53069938337,
        "test_mae": 9725.148811311916,
        "test_mape": 29.8019353889437
      },
      {
        "algorithm": "Lasso (L1)",
        "k": 2,
        "features": [
          "R&D Spend",
          "Marketing Spend"
        ],
        "features_str": "R&D Spend + Marketing Spend",
        "train_r2": 0.967055524404828,
        "test_r2": 0.8763677463390387,
        "test_adj_r2": 0.8410442452930498,
        "test_mse": 191025924.32240102,
        "test_rmse": 13821.212838329386,
        "test_mae": 9337.710905157146,
        "test_mape": 29.09400797691708
      },
      {
        "algorithm": "Lasso (L1)",
        "k": 3,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York",
        "train_r2": 0.96844922592908,
        "test_r2": 0.8632012408642491,
        "test_adj_r2": 0.7948018612963736,
        "test_mse": 211369676.08571497,
        "test_rmse": 14538.55825333843,
        "test_mae": 10154.173964698297,
        "test_mape": 30.542111924971056
      },
      {
        "algorithm": "Lasso (L1)",
        "k": 4,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York",
          "Administration"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York + Administration",
        "train_r2": 0.9687069895200587,
        "test_r2": 0.8570800420194233,
        "test_adj_r2": 0.742744075634962,
        "test_mse": 220827626.0354154,
        "test_rmse": 14860.270052573587,
        "test_mae": 10567.859730278204,
        "test_mape": 30.968196917898815
      },
      {
        "algorithm": "Lasso (L1)",
        "k": 5,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York",
          "Administration",
          "State_Florida"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York + Administration + State_Florida",
        "train_r2": 0.9687430326110055,
        "test_r2": 0.8560833333190013,
        "test_adj_r2": 0.6761874999677531,
        "test_mse": 222367654.5889709,
        "test_rmse": 14911.997002044056,
        "test_mae": 10719.996875308007,
        "test_mape": 30.933233436762052
      },
      {
        "algorithm": "Ridge (L2)",
        "k": 1,
        "features": [
          "R&D Spend"
        ],
        "features_str": "R&D Spend",
        "train_r2": 0.9639102753496279,
        "test_r2": 0.8704243047740622,
        "test_adj_r2": 0.85422734287082,
        "test_mse": 200209219.0127924,
        "test_rmse": 14149.53069938337,
        "test_mae": 9725.148811311916,
        "test_mape": 29.8019353889437
      },
      {
        "algorithm": "Ridge (L2)",
        "k": 2,
        "features": [
          "R&D Spend",
          "Marketing Spend"
        ],
        "features_str": "R&D Spend + Marketing Spend",
        "train_r2": 0.967055524404828,
        "test_r2": 0.8763677463390387,
        "test_adj_r2": 0.8410442452930498,
        "test_mse": 191025924.32240102,
        "test_rmse": 13821.212838329386,
        "test_mae": 9337.710905157146,
        "test_mape": 29.09400797691708
      },
      {
        "algorithm": "Ridge (L2)",
        "k": 3,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York",
        "train_r2": 0.96844922592908,
        "test_r2": 0.8632012408642491,
        "test_adj_r2": 0.7948018612963736,
        "test_mse": 211369676.08571497,
        "test_rmse": 14538.55825333843,
        "test_mae": 10154.173964698297,
        "test_mape": 30.542111924971056
      },
      {
        "algorithm": "Ridge (L2)",
        "k": 4,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York",
          "Administration"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York + Administration",
        "train_r2": 0.9687069895200587,
        "test_r2": 0.8570800420194233,
        "test_adj_r2": 0.742744075634962,
        "test_mse": 220827626.0354154,
        "test_rmse": 14860.270052573587,
        "test_mae": 10567.859730278204,
        "test_mape": 30.968196917898815
      },
      {
        "algorithm": "Ridge (L2)",
        "k": 5,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "State_New York",
          "Administration",
          "State_Florida"
        ],
        "features_str": "R&D Spend + Marketing Spend + State_New York + Administration + State_Florida",
        "train_r2": 0.9687430326110055,
        "test_r2": 0.8560833333190013,
        "test_adj_r2": 0.6761874999677531,
        "test_mse": 222367654.5889709,
        "test_rmse": 14911.997002044056,
        "test_mae": 10719.996875308007,
        "test_mape": 30.933233436762052
      },
      {
        "algorithm": "相關係數 (Correlation)",
        "k": 1,
        "features": [
          "R&D Spend"
        ],
        "features_str": "R&D Spend",
        "train_r2": 0.9639102753496279,
        "test_r2": 0.8704243047740622,
        "test_adj_r2": 0.85422734287082,
        "test_mse": 200209219.0127924,
        "test_rmse": 14149.53069938337,
        "test_mae": 9725.148811311916,
        "test_mape": 29.8019353889437
      },
      {
        "algorithm": "相關係數 (Correlation)",
        "k": 2,
        "features": [
          "R&D Spend",
          "Marketing Spend"
        ],
        "features_str": "R&D Spend + Marketing Spend",
        "train_r2": 0.967055524404828,
        "test_r2": 0.8763677463390387,
        "test_adj_r2": 0.8410442452930498,
        "test_mse": 191025924.32240102,
        "test_rmse": 13821.212838329386,
        "test_mae": 9337.710905157146,
        "test_mape": 29.09400797691708
      },
      {
        "algorithm": "相關係數 (Correlation)",
        "k": 3,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "Administration"
        ],
        "features_str": "R&D Spend + Marketing Spend + Administration",
        "train_r2": 0.9672239106066932,
        "test_r2": 0.8724377324807853,
        "test_adj_r2": 0.8086565987211778,
        "test_mse": 197098243.70219234,
        "test_rmse": 14039.16819837245,
        "test_mae": 9704.381762875337,
        "test_mape": 29.475360770870367
      },
      {
        "algorithm": "相關係數 (Correlation)",
        "k": 4,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "Administration",
          "State_New York"
        ],
        "features_str": "R&D Spend + Marketing Spend + Administration + State_New York",
        "train_r2": 0.9687069895200587,
        "test_r2": 0.8570800420194233,
        "test_adj_r2": 0.7427440756349621,
        "test_mse": 220827626.03541535,
        "test_rmse": 14860.270052573585,
        "test_mae": 10567.859730278202,
        "test_mape": 30.968196917898812
      },
      {
        "algorithm": "相關係數 (Correlation)",
        "k": 5,
        "features": [
          "R&D Spend",
          "Marketing Spend",
          "Administration",
          "State_New York",
          "State_Florida"
        ],
        "features_str": "R&D Spend + Marketing Spend + Administration + State_New York + State_Florida",
        "train_r2": 0.9687430326110055,
        "test_r2": 0.8560833333190012,
        "test_adj_r2": 0.6761874999677528,
        "test_mse": 222367654.588971,
        "test_rmse": 14911.997002044058,
        "test_mae": 10719.996875308007,
        "test_mape": 30.933233436762052
      }
    ],
    "corr_chart_data": [
      {
        "feature": "R&D Spend",
        "corr": 0.9729004656594832
      },
      {
        "feature": "Marketing Spend",
        "corr": 0.7477657217414767
      },
      {
        "feature": "Administration",
        "corr": 0.20071656826872128
      },
      {
        "feature": "State_Florida",
        "corr": 0.11624426298842248
      },
      {
        "feature": "State_New York",
        "corr": 0.03136760015130279
      }
    ],
    "scatter_points": [
      {
        "actual": 146121.95,
        "pred": 135828.97138334726,
        "res": 10292.978616652748
      },
      {
        "actual": 110352.25,
        "pred": 115511.74726593902,
        "res": -5159.497265939019
      },
      {
        "actual": 124266.9,
        "pred": 129413.18068435224,
        "res": -5146.280684352241
      },
      {
        "actual": 14681.4,
        "pred": 50157.62261118104,
        "res": -35476.22261118104
      },
      {
        "actual": 118474.03,
        "pred": 117189.9856314874,
        "res": 1284.0443685125938
      },
      {
        "actual": 155752.6,
        "pred": 160790.35779854396,
        "res": -5037.757798543957
      },
      {
        "actual": 71498.49,
        "pred": 71552.95939135585,
        "res": -54.46939135584398
      },
      {
        "actual": 132602.65,
        "pred": 150854.14323087194,
        "res": -18251.493230871944
      },
      {
        "actual": 103282.38,
        "pred": 104511.75792795738,
        "res": -1229.3779279573791
      },
      {
        "actual": 81229.06,
        "pred": 69784.07284379531,
        "res": 11444.98715620469
      }
    ]
  },
  "boston": {
    "dataset_name": "Boston Housing 波士頓房價預測",
    "target_col": "MEDV",
    "total_samples": 506,
    "train_samples": 404,
    "test_samples": 102,
    "features_count": 13,
    "all_features": [
      "CRIM",
      "ZN",
      "INDUS",
      "CHAS",
      "NOX",
      "RM",
      "AGE",
      "DIS",
      "RAD",
      "TAX",
      "PTRATIO",
      "B",
      "LSTAT"
    ],
    "optimal_k": 5,
    "optimal_features": [
      "NOX",
      "RM",
      "DIS",
      "PTRATIO",
      "LSTAT"
    ],
    "final_model": {
      "intercept": 39.37626975280368,
      "coefficients": {
        "NOX": -19.054935325521974,
        "RM": 4.071802622911642,
        "DIS": -1.2191014050398437,
        "PTRATIO": -1.0616379191020482,
        "LSTAT": -0.5965025861860722
      },
      "test_r2": 0.6630448443650105,
      "test_mse": 23.991884942745994,
      "test_rmse": 4.898151175979157,
      "test_mae": 3.249893930248215,
      "test_mape": 16.351418438991647
    },
    "best_subset_records": [
      {
        "k": 1,
        "features": [
          "LSTAT"
        ],
        "features_str": "LSTAT",
        "train_r2": 0.557652581975401,
        "train_adj_r2": 0.5565522152638971,
        "train_mse": 38.81731834552192,
        "train_rmse": 6.230354592278189,
        "train_mae": 4.60401218110491,
        "aic": 1484.1820644472198,
        "bic": 1496.1863090811032
      },
      {
        "k": 2,
        "features": [
          "RM",
          "LSTAT"
        ],
        "features_str": "RM + LSTAT",
        "train_r2": 0.6479869348900588,
        "train_adj_r2": 0.6462312587548471,
        "train_mse": 30.890206777234216,
        "train_rmse": 5.557895894781964,
        "train_mae": 4.06460039517569,
        "aic": 1393.897437161298,
        "bic": 1409.9030966731427
      },
      {
        "k": 3,
        "features": [
          "RM",
          "PTRATIO",
          "LSTAT"
        ],
        "features_str": "RM + PTRATIO + LSTAT",
        "train_r2": 0.6857079988684365,
        "train_adj_r2": 0.6833508088599498,
        "train_mse": 27.580069791877015,
        "train_rmse": 5.251673046932474,
        "train_mae": 3.7351627996888914,
        "aic": 1350.105734766293,
        "bic": 1370.1128091560986
      },
      {
        "k": 4,
        "features": [
          "RM",
          "DIS",
          "PTRATIO",
          "LSTAT"
        ],
        "features_str": "RM + DIS + PTRATIO + LSTAT",
        "train_r2": 0.6979678531088175,
        "train_adj_r2": 0.6949399619119134,
        "train_mse": 26.504230653844335,
        "train_rmse": 5.1482259715210965,
        "train_mae": 3.6704034287008795,
        "aic": 1336.0309644961715,
        "bic": 1360.0394537639384
      },
      {
        "k": 5,
        "features": [
          "NOX",
          "RM",
          "DIS",
          "PTRATIO",
          "LSTAT"
        ],
        "features_str": "NOX + RM + DIS + PTRATIO + LSTAT",
        "train_r2": 0.7168556847558584,
        "train_adj_r2": 0.7132985953683693,
        "train_mse": 24.846766533958732,
        "train_rmse": 4.98465310066395,
        "train_mae": 3.594438673457759,
        "aic": 1311.9419603863073,
        "bic": 1339.9518645320354
      }
    ],
    "eval_matrix": [
      {
        "algorithm": "最佳子集 (Best Subset)",
        "k": 1,
        "features": [
          "LSTAT"
        ],
        "features_str": "LSTAT",
        "train_r2": 0.557652581975401,
        "test_r2": 0.47655141495178166,
        "test_adj_r2": 0.4713169291012995,
        "test_mse": 37.270592290696996,
        "test_rmse": 6.104964560969785,
        "test_mae": 4.320313935895308,
        "test_mape": 20.443445405889836
      },
      {
        "algorithm": "最佳子集 (Best Subset)",
        "k": 2,
        "features": [
          "RM",
          "LSTAT"
        ],
        "features_str": "RM + LSTAT",
        "train_r2": 0.6479869348900588,
        "test_r2": 0.5913501249193585,
        "test_adj_r2": 0.5830945718874263,
        "test_mse": 29.096693197426166,
        "test_rmse": 5.394135074080567,
        "test_mae": 3.6222158376342857,
        "test_mape": 18.847572732751157
      },
      {
        "algorithm": "最佳子集 (Best Subset)",
        "k": 3,
        "features": [
          "RM",
          "PTRATIO",
          "LSTAT"
        ],
        "features_str": "RM + PTRATIO + LSTAT",
        "train_r2": 0.6857079988684365,
        "test_r2": 0.6422652023214946,
        "test_adj_r2": 0.6313141370864384,
        "test_mse": 25.471437259195877,
        "test_rmse": 5.0469235440212366,
        "test_mae": 3.421432759218087,
        "test_mape": 17.48838924047406
      },
      {
        "algorithm": "最佳子集 (Best Subset)",
        "k": 4,
        "features": [
          "RM",
          "DIS",
          "PTRATIO",
          "LSTAT"
        ],
        "features_str": "RM + DIS + PTRATIO + LSTAT",
        "train_r2": 0.6979678531088175,
        "test_r2": 0.6506712185232614,
        "test_adj_r2": 0.636265907946901,
        "test_mse": 24.87291199502656,
        "test_rmse": 4.987275006957864,
        "test_mae": 3.3833114226500203,
        "test_mape": 17.774075706307897
      },
      {
        "algorithm": "最佳子集 (Best Subset)",
        "k": 5,
        "features": [
          "NOX",
          "RM",
          "DIS",
          "PTRATIO",
          "LSTAT"
        ],
        "features_str": "NOX + RM + DIS + PTRATIO + LSTAT",
        "train_r2": 0.7168556847558584,
        "test_r2": 0.6630448443650105,
        "test_adj_r2": 0.645495096675688,
        "test_mse": 23.991884942745994,
        "test_rmse": 4.898151175979157,
        "test_mae": 3.249893930248215,
        "test_mape": 16.351418438991647
      },
      {
        "algorithm": "前向逐步 (Forward)",
        "k": 1,
        "features": [
          "LSTAT"
        ],
        "features_str": "LSTAT",
        "train_r2": 0.557652581975401,
        "test_r2": 0.47655141495178166,
        "test_adj_r2": 0.4713169291012995,
        "test_mse": 37.270592290696996,
        "test_rmse": 6.104964560969785,
        "test_mae": 4.320313935895308,
        "test_mape": 20.443445405889836
      },
      {
        "algorithm": "前向逐步 (Forward)",
        "k": 2,
        "features": [
          "LSTAT",
          "RM"
        ],
        "features_str": "LSTAT + RM",
        "train_r2": 0.6479869348900588,
        "test_r2": 0.5913501249193587,
        "test_adj_r2": 0.5830945718874265,
        "test_mse": 29.09669319742615,
        "test_rmse": 5.394135074080565,
        "test_mae": 3.6222158376342826,
        "test_mape": 18.84757273275116
      },
      {
        "algorithm": "前向逐步 (Forward)",
        "k": 3,
        "features": [
          "LSTAT",
          "RM",
          "PTRATIO"
        ],
        "features_str": "LSTAT + RM + PTRATIO",
        "train_r2": 0.6857079988684365,
        "test_r2": 0.6422652023214946,
        "test_adj_r2": 0.6313141370864384,
        "test_mse": 25.471437259195877,
        "test_rmse": 5.0469235440212366,
        "test_mae": 3.4214327592180864,
        "test_mape": 17.488389240474064
      },
      {
        "algorithm": "前向逐步 (Forward)",
        "k": 4,
        "features": [
          "LSTAT",
          "RM",
          "PTRATIO",
          "DIS"
        ],
        "features_str": "LSTAT + RM + PTRATIO + DIS",
        "train_r2": 0.6979678531088174,
        "test_r2": 0.650671218523261,
        "test_adj_r2": 0.6362659079469006,
        "test_mse": 24.872911995026577,
        "test_rmse": 4.987275006957866,
        "test_mae": 3.3833114226500207,
        "test_mape": 17.77407570630791
      },
      {
        "algorithm": "前向逐步 (Forward)",
        "k": 5,
        "features": [
          "LSTAT",
          "RM",
          "PTRATIO",
          "DIS",
          "NOX"
        ],
        "features_str": "LSTAT + RM + PTRATIO + DIS + NOX",
        "train_r2": 0.7168556847558583,
        "test_r2": 0.6630448443650082,
        "test_adj_r2": 0.6454950966756856,
        "test_mse": 23.991884942746157,
        "test_rmse": 4.898151175979173,
        "test_mae": 3.249893930248245,
        "test_mape": 16.351418438991676
      },
      {
        "algorithm": "後向淘汰 (Backward)",
        "k": 1,
        "features": [
          "LSTAT"
        ],
        "features_str": "LSTAT",
        "train_r2": 0.557652581975401,
        "test_r2": 0.47655141495178166,
        "test_adj_r2": 0.4713169291012995,
        "test_mse": 37.270592290696996,
        "test_rmse": 6.104964560969785,
        "test_mae": 4.320313935895308,
        "test_mape": 20.443445405889836
      },
      {
        "algorithm": "後向淘汰 (Backward)",
        "k": 2,
        "features": [
          "RM",
          "LSTAT"
        ],
        "features_str": "RM + LSTAT",
        "train_r2": 0.6479869348900588,
        "test_r2": 0.5913501249193585,
        "test_adj_r2": 0.5830945718874263,
        "test_mse": 29.096693197426166,
        "test_rmse": 5.394135074080567,
        "test_mae": 3.6222158376342857,
        "test_mape": 18.847572732751157
      },
      {
        "algorithm": "後向淘汰 (Backward)",
        "k": 3,
        "features": [
          "RM",
          "PTRATIO",
          "LSTAT"
        ],
        "features_str": "RM + PTRATIO + LSTAT",
        "train_r2": 0.6857079988684365,
        "test_r2": 0.6422652023214946,
        "test_adj_r2": 0.6313141370864384,
        "test_mse": 25.471437259195877,
        "test_rmse": 5.0469235440212366,
        "test_mae": 3.421432759218087,
        "test_mape": 17.48838924047406
      },
      {
        "algorithm": "後向淘汰 (Backward)",
        "k": 4,
        "features": [
          "RM",
          "DIS",
          "PTRATIO",
          "LSTAT"
        ],
        "features_str": "RM + DIS + PTRATIO + LSTAT",
        "train_r2": 0.6979678531088175,
        "test_r2": 0.6506712185232614,
        "test_adj_r2": 0.636265907946901,
        "test_mse": 24.87291199502656,
        "test_rmse": 4.987275006957864,
        "test_mae": 3.3833114226500203,
        "test_mape": 17.774075706307897
      },
      {
        "algorithm": "後向淘汰 (Backward)",
        "k": 5,
        "features": [
          "NOX",
          "RM",
          "DIS",
          "PTRATIO",
          "LSTAT"
        ],
        "features_str": "NOX + RM + DIS + PTRATIO + LSTAT",
        "train_r2": 0.7168556847558584,
        "test_r2": 0.6630448443650105,
        "test_adj_r2": 0.645495096675688,
        "test_mse": 23.991884942745994,
        "test_rmse": 4.898151175979157,
        "test_mae": 3.249893930248215,
        "test_mape": 16.351418438991647
      },
      {
        "algorithm": "Lasso (L1)",
        "k": 1,
        "features": [
          "LSTAT"
        ],
        "features_str": "LSTAT",
        "train_r2": 0.557652581975401,
        "test_r2": 0.47655141495178166,
        "test_adj_r2": 0.4713169291012995,
        "test_mse": 37.270592290696996,
        "test_rmse": 6.104964560969785,
        "test_mae": 4.320313935895308,
        "test_mape": 20.443445405889836
      },
      {
        "algorithm": "Lasso (L1)",
        "k": 2,
        "features": [
          "LSTAT",
          "RM"
        ],
        "features_str": "LSTAT + RM",
        "train_r2": 0.6479869348900588,
        "test_r2": 0.5913501249193587,
        "test_adj_r2": 0.5830945718874265,
        "test_mse": 29.09669319742615,
        "test_rmse": 5.394135074080565,
        "test_mae": 3.6222158376342826,
        "test_mape": 18.84757273275116
      },
      {
        "algorithm": "Lasso (L1)",
        "k": 3,
        "features": [
          "LSTAT",
          "RM",
          "PTRATIO"
        ],
        "features_str": "LSTAT + RM + PTRATIO",
        "train_r2": 0.6857079988684365,
        "test_r2": 0.6422652023214946,
        "test_adj_r2": 0.6313141370864384,
        "test_mse": 25.471437259195877,
        "test_rmse": 5.0469235440212366,
        "test_mae": 3.4214327592180864,
        "test_mape": 17.488389240474064
      },
      {
        "algorithm": "Lasso (L1)",
        "k": 4,
        "features": [
          "LSTAT",
          "RM",
          "PTRATIO",
          "B"
        ],
        "features_str": "LSTAT + RM + PTRATIO + B",
        "train_r2": 0.6941192512282451,
        "test_r2": 0.6548331957788514,
        "test_adj_r2": 0.6405995131305565,
        "test_mse": 24.57657084166962,
        "test_rmse": 4.95747625729762,
        "test_mae": 3.2452460945763746,
        "test_mape": 16.0149031964387
      },
      {
        "algorithm": "Lasso (L1)",
        "k": 5,
        "features": [
          "LSTAT",
          "RM",
          "PTRATIO",
          "B",
          "TAX"
        ],
        "features_str": "LSTAT + RM + PTRATIO + B + TAX",
        "train_r2": 0.6943183087404061,
        "test_r2": 0.6533032749027807,
        "test_adj_r2": 0.6352461538039673,
        "test_mse": 24.685504285827843,
        "test_rmse": 4.968450893973678,
        "test_mae": 3.241139914796127,
        "test_mape": 15.965305043680203
      },
      {
        "algorithm": "Ridge (L2)",
        "k": 1,
        "features": [
          "LSTAT"
        ],
        "features_str": "LSTAT",
        "train_r2": 0.557652581975401,
        "test_r2": 0.47655141495178166,
        "test_adj_r2": 0.4713169291012995,
        "test_mse": 37.270592290696996,
        "test_rmse": 6.104964560969785,
        "test_mae": 4.320313935895308,
        "test_mape": 20.443445405889836
      },
      {
        "algorithm": "Ridge (L2)",
        "k": 2,
        "features": [
          "LSTAT",
          "DIS"
        ],
        "features_str": "LSTAT + DIS",
        "train_r2": 0.5740896133898565,
        "test_r2": 0.5020808273218292,
        "test_adj_r2": 0.49202185413641164,
        "test_mse": 35.45284677176036,
        "test_rmse": 5.954229318036076,
        "test_mae": 4.235138780371252,
        "test_mape": 20.728494868812653
      },
      {
        "algorithm": "Ridge (L2)",
        "k": 3,
        "features": [
          "LSTAT",
          "DIS",
          "RAD"
        ],
        "features_str": "LSTAT + DIS + RAD",
        "train_r2": 0.5796327747135629,
        "test_r2": 0.5062001824665858,
        "test_adj_r2": 0.4910838615216855,
        "test_mse": 35.15954039843877,
        "test_rmse": 5.929548077083005,
        "test_mae": 4.213392320219976,
        "test_mape": 20.564109503031837
      },
      {
        "algorithm": "Ridge (L2)",
        "k": 4,
        "features": [
          "LSTAT",
          "DIS",
          "RAD",
          "RM"
        ],
        "features_str": "LSTAT + DIS + RAD + RM",
        "train_r2": 0.6659833268248494,
        "test_r2": 0.609369208531561,
        "test_adj_r2": 0.5932607222854397,
        "test_mse": 27.81369819477369,
        "test_rmse": 5.273869375968055,
        "test_mae": 3.476957353196692,
        "test_mape": 18.387121878486433
      },
      {
        "algorithm": "Ridge (L2)",
        "k": 5,
        "features": [
          "LSTAT",
          "DIS",
          "RAD",
          "RM",
          "TAX"
        ],
        "features_str": "LSTAT + DIS + RAD + RM + TAX",
        "train_r2": 0.6824862713534894,
        "test_r2": 0.6002495948528912,
        "test_adj_r2": 0.5794292612514793,
        "test_mse": 28.463033034861276,
        "test_rmse": 5.335075729065266,
        "test_mae": 3.5986987432951816,
        "test_mape": 18.612522829651873
      },
      {
        "algorithm": "相關係數 (Correlation)",
        "k": 1,
        "features": [
          "LSTAT"
        ],
        "features_str": "LSTAT",
        "train_r2": 0.557652581975401,
        "test_r2": 0.47655141495178166,
        "test_adj_r2": 0.4713169291012995,
        "test_mse": 37.270592290696996,
        "test_rmse": 6.104964560969785,
        "test_mae": 4.320313935895308,
        "test_mape": 20.443445405889836
      },
      {
        "algorithm": "相關係數 (Correlation)",
        "k": 2,
        "features": [
          "LSTAT",
          "RM"
        ],
        "features_str": "LSTAT + RM",
        "train_r2": 0.6479869348900588,
        "test_r2": 0.5913501249193587,
        "test_adj_r2": 0.5830945718874265,
        "test_mse": 29.09669319742615,
        "test_rmse": 5.394135074080565,
        "test_mae": 3.6222158376342826,
        "test_mape": 18.84757273275116
      },
      {
        "algorithm": "相關係數 (Correlation)",
        "k": 3,
        "features": [
          "LSTAT",
          "RM",
          "INDUS"
        ],
        "features_str": "LSTAT + RM + INDUS",
        "train_r2": 0.6506147966108086,
        "test_r2": 0.5856220749885586,
        "test_adj_r2": 0.5729370364678001,
        "test_mse": 29.504541875767583,
        "test_rmse": 5.431808343062887,
        "test_mae": 3.6194985845993735,
        "test_mape": 18.639354338557233
      },
      {
        "algorithm": "相關係數 (Correlation)",
        "k": 4,
        "features": [
          "LSTAT",
          "RM",
          "INDUS",
          "TAX"
        ],
        "features_str": "LSTAT + RM + INDUS + TAX",
        "train_r2": 0.6600863294009525,
        "test_r2": 0.5935783881446843,
        "test_adj_r2": 0.5768187340475579,
        "test_mse": 28.938036373127325,
        "test_rmse": 5.379408552352881,
        "test_mae": 3.5976466401202916,
        "test_mape": 18.316238504665332
      },
      {
        "algorithm": "相關係數 (Correlation)",
        "k": 5,
        "features": [
          "LSTAT",
          "RM",
          "INDUS",
          "TAX",
          "PTRATIO"
        ],
        "features_str": "LSTAT + RM + INDUS + TAX + PTRATIO",
        "train_r2": 0.6877540217306215,
        "test_r2": 0.6418294162366605,
        "test_adj_r2": 0.6231746983323199,
        "test_mse": 25.50246610511838,
        "test_rmse": 5.049996644070012,
        "test_mae": 3.4056200441707114,
        "test_mape": 17.294365131044184
      }
    ],
    "corr_chart_data": [
      {
        "feature": "LSTAT",
        "corr": -0.7376627261740147
      },
      {
        "feature": "RM",
        "corr": 0.6953599470715395
      },
      {
        "feature": "PTRATIO",
        "corr": -0.5077866855375617
      },
      {
        "feature": "INDUS",
        "corr": -0.4837251600283727
      },
      {
        "feature": "TAX",
        "corr": -0.468535933567767
      },
      {
        "feature": "NOX",
        "corr": -0.42732077237328264
      },
      {
        "feature": "CRIM",
        "corr": -0.3883046085868113
      },
      {
        "feature": "RAD",
        "corr": -0.38162623063977763
      },
      {
        "feature": "AGE",
        "corr": -0.3769545650045963
      },
      {
        "feature": "ZN",
        "corr": 0.36044534245054277
      }
    ],
    "scatter_points": [
      {
        "actual": 22.4,
        "pred": 19.942072665961973,
        "res": 2.4579273340380254
      },
      {
        "actual": 28.6,
        "pred": 30.2481509957356,
        "res": -1.6481509957355982
      },
      {
        "actual": 19.5,
        "pred": 18.388010006093882,
        "res": 1.1119899939061177
      },
      {
        "actual": 24.8,
        "pred": 25.941802011893525,
        "res": -1.1418020118935246
      },
      {
        "actual": 24.5,
        "pred": 20.96518292133627,
        "res": 3.5348170786637283
      },
      {
        "actual": 21.4,
        "pred": 19.233574341308845,
        "res": 2.1664256586911534
      },
      {
        "actual": 33.1,
        "pred": 32.86849641755714,
        "res": 0.23150358244286195
      },
      {
        "actual": 22.9,
        "pred": 22.427887585897437,
        "res": 0.4721124141025612
      },
      {
        "actual": 20.7,
        "pred": 21.975295938416835,
        "res": -1.2752959384168356
      },
      {
        "actual": 24.1,
        "pred": 28.87706191933116,
        "res": -4.77706191933116
      },
      {
        "actual": 50.0,
        "pred": 39.30100987975313,
        "res": 10.698990120246869
      },
      {
        "actual": 24.7,
        "pred": 25.71396959663057,
        "res": -1.0139695966305702
      },
      {
        "actual": 28.7,
        "pred": 28.57932859494729,
        "res": 0.12067140505270757
      },
      {
        "actual": 7.2,
        "pred": 16.513637570509914,
        "res": -9.313637570509915
      },
      {
        "actual": 37.0,
        "pred": 32.273770203132116,
        "res": 4.726229796867884
      },
      {
        "actual": 20.3,
        "pred": 24.06365959485911,
        "res": -3.76365959485911
      },
      {
        "actual": 30.1,
        "pred": 34.53859215502828,
        "res": -4.438592155028282
      },
      {
        "actual": 19.5,
        "pred": 18.710665676192413,
        "res": 0.7893343238075872
      },
      {
        "actual": 23.4,
        "pred": 24.261981089735546,
        "res": -0.8619810897355471
      },
      {
        "actual": 11.5,
        "pred": 11.995937136541713,
        "res": -0.4959371365417127
      },
      {
        "actual": 21.6,
        "pred": 26.179962540118968,
        "res": -4.5799625401189665
      },
      {
        "actual": 14.9,
        "pred": 16.512072958445984,
        "res": -1.6120729584459834
      },
      {
        "actual": 15.2,
        "pred": 15.647805016012214,
        "res": -0.44780501601221445
      },
      {
        "actual": 19.4,
        "pred": 17.561712748918776,
        "res": 1.8382872510812227
      },
      {
        "actual": 8.4,
        "pred": 16.284184591453815,
        "res": -7.884184591453815
      },
      {
        "actual": 28.0,
        "pred": 28.73926344639602,
        "res": -0.7392634463960199
      },
      {
        "actual": 22.6,
        "pred": 23.005104539611015,
        "res": -0.40510453961101334
      },
      {
        "actual": 13.5,
        "pred": 14.935586970105696,
        "res": -1.435586970105696
      },
      {
        "actual": 14.5,
        "pred": 19.626149532632972,
        "res": -5.126149532632972
      },
      {
        "actual": 31.0,
        "pred": 33.835609371547804,
        "res": -2.835609371547804
      },
      {
        "actual": 10.9,
        "pred": 19.313921009340394,
        "res": -8.413921009340394
      },
      {
        "actual": 21.9,
        "pred": 13.970829042071685,
        "res": 7.929170957928314
      },
      {
        "actual": 22.0,
        "pred": 28.58024255710655,
        "res": -6.580242557106551
      },
      {
        "actual": 19.0,
        "pred": 20.811135821639585,
        "res": -1.811135821639585
      },
      {
        "actual": 21.4,
        "pred": 21.39585246877529,
        "res": 0.0041475312247101215
      },
      {
        "actual": 25.0,
        "pred": 28.22979898177534,
        "res": -3.229798981775339
      },
      {
        "actual": 17.5,
        "pred": 19.432453182028446,
        "res": -1.9324531820284463
      },
      {
        "actual": 36.5,
        "pred": 35.403184779591044,
        "res": 1.0968152204089563
      },
      {
        "actual": 20.1,
        "pred": 23.294224481852492,
        "res": -3.1942244818524905
      },
      {
        "actual": 20.4,
        "pred": 20.38744082410918,
        "res": 0.012559175890817897
      },
      {
        "actual": 16.2,
        "pred": 21.03674640393094,
        "res": -4.836746403930942
      },
      {
        "actual": 23.6,
        "pred": 32.24020889570063,
        "res": -8.640208895700631
      },
      {
        "actual": 7.4,
        "pred": 4.018540868130188,
        "res": 3.3814591318698124
      },
      {
        "actual": 35.2,
        "pred": 32.85635513706599,
        "res": 2.3436448629340134
      },
      {
        "actual": 50.0,
        "pred": 39.826060333669716,
        "res": 10.173939666330284
      },
      {
        "actual": 19.3,
        "pred": 24.258399490488564,
        "res": -4.9583994904885635
      },
      {
        "actual": 21.2,
        "pred": 21.710113919513642,
        "res": -0.5101139195136426
      },
      {
        "actual": 15.6,
        "pred": 15.235162261712489,
        "res": 0.36483773828751076
      },
      {
        "actual": 33.4,
        "pred": 33.423367222560636,
        "res": -0.023367222560636947
      },
      {
        "actual": 19.1,
        "pred": 18.458737315446626,
        "res": 0.6412626845533751
      },
      {
        "actual": 21.0,
        "pred": 21.89497682312326,
        "res": -0.8949768231232618
      },
      {
        "actual": 23.7,
        "pred": 27.955765787196874,
        "res": -4.255765787196875
      },
      {
        "actual": 18.9,
        "pred": 15.386265189966196,
        "res": 3.513734810033803
      },
      {
        "actual": 16.8,
        "pred": 15.832733899103154,
        "res": 0.9672661008968468
      },
      {
        "actual": 19.7,
        "pred": 21.125025015279547,
        "res": -1.425025015279548
      },
      {
        "actual": 17.7,
        "pred": 18.438510319026022,
        "res": -0.7385103190260232
      },
      {
        "actual": 22.6,
        "pred": 26.847579830221896,
        "res": -4.247579830221895
      },
      {
        "actual": 11.8,
        "pred": 13.402721087621629,
        "res": -1.602721087621628
      },
      {
        "actual": 34.9,
        "pred": 35.38584916488121,
        "res": -0.4858491648812091
      },
      {
        "actual": 20.6,
        "pred": 22.877889615757645,
        "res": -2.277889615757644
      },
      {
        "actual": 20.2,
        "pred": 21.311219274654352,
        "res": -1.1112192746543528
      },
      {
        "actual": 32.0,
        "pred": 33.92400717492929,
        "res": -1.9240071749292866
      },
      {
        "actual": 22.3,
        "pred": 28.799010657414122,
        "res": -6.4990106574141215
      },
      {
        "actual": 23.3,
        "pred": 21.232302760482092,
        "res": 2.0676972395179085
      },
      {
        "actual": 14.4,
        "pred": 8.285632408166371,
        "res": 6.114367591833629
      },
      {
        "actual": 31.2,
        "pred": 28.826569762487217,
        "res": 2.373430237512782
      },
      {
        "actual": 24.0,
        "pred": 25.08192395465918,
        "res": -1.0819239546591817
      },
      {
        "actual": 29.6,
        "pred": 26.25001460674567,
        "res": 3.3499853932543324
      },
      {
        "actual": 19.6,
        "pred": 17.97758955780305,
        "res": 1.6224104421969514
      },
      {
        "actual": 21.6,
        "pred": 26.300107964172412,
        "res": -4.70010796417241
      },
      {
        "actual": 20.0,
        "pred": 17.024150564639797,
        "res": 2.975849435360203
      },
      {
        "actual": 27.0,
        "pred": 32.217526672413484,
        "res": -5.217526672413484
      },
      {
        "actual": 33.2,
        "pred": 32.31875305416574,
        "res": 0.8812469458342633
      },
      {
        "actual": 15.4,
        "pred": 16.580227686299764,
        "res": -1.180227686299764
      },
      {
        "actual": 30.5,
        "pred": 31.65511410741114,
        "res": -1.1551141074111406
      },
      {
        "actual": 7.2,
        "pred": 5.9628263060614515,
        "res": 1.2371736939385487
      },
      {
        "actual": 23.9,
        "pred": 27.18464948950819,
        "res": -3.2846494895081904
      },
      {
        "actual": 16.3,
        "pred": 13.630118214928551,
        "res": 2.66988178507145
      },
      {
        "actual": 23.9,
        "pred": 27.462744309426466,
        "res": -3.562744309426467
      },
      {
        "actual": 50.0,
        "pred": 43.43770880693782,
        "res": 6.56229119306218
      },
      {
        "actual": 22.8,
        "pred": 29.740166974756328,
        "res": -6.940166974756327
      },
      {
        "actual": 15.4,
        "pred": 15.308259466549863,
        "res": 0.09174053345013711
      },
      {
        "actual": 19.2,
        "pred": 21.176368650956505,
        "res": -1.9763686509565055
      },
      {
        "actual": 19.6,
        "pred": 19.315488906876,
        "res": 0.2845110931240029
      },
      {
        "actual": 22.6,
        "pred": 17.529206115163333,
        "res": 5.070793884836668
      },
      {
        "actual": 33.2,
        "pred": 34.03047500123523,
        "res": -0.8304750012352287
      },
      {
        "actual": 50.0,
        "pred": 22.450287486634203,
        "res": 27.549712513365797
      },
      {
        "actual": 22.2,
        "pred": 26.50061989016082,
        "res": -4.300619890160821
      },
      {
        "actual": 14.9,
        "pred": 16.92732513264506,
        "res": -2.0273251326450588
      },
      {
        "actual": 19.8,
        "pred": 25.103751464334668,
        "res": -5.303751464334667
      },
      {
        "actual": 23.7,
        "pred": 10.348359166144263,
        "res": 13.351640833855736
      },
      {
        "actual": 19.0,
        "pred": 15.954901322632459,
        "res": 3.045098677367541
      },
      {
        "actual": 20.3,
        "pred": 21.284225689477992,
        "res": -0.9842256894779915
      },
      {
        "actual": 11.9,
        "pred": 22.962075927522726,
        "res": -11.062075927522725
      },
      {
        "actual": 13.6,
        "pred": 12.341749268315638,
        "res": 1.2582507316843614
      },
      {
        "actual": 29.8,
        "pred": 33.31978246160423,
        "res": -3.519782461604226
      },
      {
        "actual": 21.7,
        "pred": 23.055948441394527,
        "res": -1.3559484413945277
      },
      {
        "actual": 19.5,
        "pred": 17.21633951683659,
        "res": 2.283660483163409
      },
      {
        "actual": 21.1,
        "pred": 21.478856882893556,
        "res": -0.37885688289355457
      },
      {
        "actual": 24.5,
        "pred": 26.310706049578513,
        "res": -1.8107060495785134
      },
      {
        "actual": 13.4,
        "pred": 14.35167129749926,
        "res": -0.95167129749926
      },
      {
        "actual": 18.6,
        "pred": 23.709049598628905,
        "res": -5.1090495986289035
      }
    ]
  }
};
