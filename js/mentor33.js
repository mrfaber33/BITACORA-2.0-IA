// ===============================
// 🤖 MENTOR33 - EDGE33 PRO
// ===============================

// 🔹 1. ANALIZAR TRADES
function analizarTrades(trades) {
  if (!trades || trades.length === 0) return null;

  let total = trades.length;
  let wins = trades.filter(t => t.resultado === "win").length;
  let losses = trades.filter(t => t.resultado === "loss").length;

  let winRate = (wins / total) * 100;

  // 🔹 Profit Factor
  let profit = trades
    .filter(t => t.resultado === "win")
    .reduce((acc, t) => acc + (t.profit || 0), 0);

  let loss = trades
    .filter(t => t.resultado === "loss")
    .reduce((acc, t) => acc + Math.abs(t.profit || 0), 0);

  let profitFactor = loss > 0 ? profit / loss : profit;

  // 🔹 RR promedio
  let rrPromedio =
    trades.reduce((acc, t) => acc + (t.rr || 0), 0) / total;

  // 🔹 Horarios
  let noche = trades.filter(t => t.hora >= 22);
  let winNoche =
    noche.filter(t => t.resultado === "win").length;

  let winRateNoche =
    noche.length > 0 ? (winNoche / noche.length) * 100 : 0;

  // 🔹 Trades por día (sobreoperación)
  let tradesPorDia = {};
  trades.forEach(t => {
    tradesPorDia[t.fecha] = (tradesPorDia[t.fecha] || 0) + 1;
  });

  let sobreoperando = Object.values(tradesPorDia).some(c => c > 2);

  // 🔹 Riesgo alto
  let riesgoAlto = trades.some(t => t.riesgo > 2);

  // 🔹 Edge detection (tu sistema)
  let edgeTrades = trades.filter(t => t.setup === "H4_Q33" && t.confirmacion === true);
  let nonEdgeTrades = trades.filter(t => !(t.setup === "H4_Q33" && t.confirmacion === true));

  let winEdge =
    edgeTrades.filter(t => t.resultado === "win").length;

  let winRateEdge =
    edgeTrades.length > 0 ? (win
