
# ===========================================================
# 4) HFT (microstructure) — interface stub for intraday
# data needs: intraday (wide midprice), features like order_imbalance, spread, etc.
# ===========================================================
def build_signals_hft_stub(data: Dict, horizon_secs: int = 5, max_weight: float = 0.02) -> pd.DataFrame:
    """
    注意：HFT 需要毫秒/秒级逐笔或盘口数据、撮合仿真与交易成本模型。
    这里提供接口与占位逻辑：若无 intraday，则返回空权重。
    """
    if "intraday" not in data:
        return pd.DataFrame()
    # 你可以在此处：根据订单不平衡/短窗动量/反转/费率门槛 生成秒级信号
    # 输出仍然按“分钟末/日末聚合 -> T+1 开盘执行”的权重（或由你的撮合层实时执行）
    return pd.DataFrame()

