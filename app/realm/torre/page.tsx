import Link from "next/link";

// Torre — Monitoramento
// Métricas simples do reino. Como o front-end ainda não tem backend,
// estes números são simulados para ilustrar o conceito de observabilidade.
export default function Torre() {
  const metricas = [
    {
      nome: "Missões concluídas",
      valor: "2",
      detalhe: "Cofre dos Pagamentos + Portfólio RPG",
      icone: "✅",
      cor: "text-pink-200",
    },
    {
      nome: "Locais do reino",
      valor: "6",
      detalhe: "Castelo, Floresta, Caverna, Cristal, Vila, Torre",
      icone: "🗺️",
      cor: "text-purple-200",
    },
    {
      nome: "Versão do deploy",
      valor: "1.0.0",
      detalhe: "Rodando na Vercel",
      icone: "🚀",
      cor: "text-pink-200",
    },
    {
      nome: "Uptime",
      valor: "100%",
      detalhe: "Desde o último push",
      icone: "⏱️",
      cor: "text-purple-200",
    },
  ];

  // Simula um gráfico de atividade por dia (últimos 7 dias)
  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const valores = [4, 7, 2, 9, 5, 8, 6];
  const max = Math.max(...valores);

  return (
    <main className="min-h-screen bg-[#1a0b1f] text-white p-8 md:p-12">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/realm"
          className="inline-block mb-8 px-4 py-2 border border-purple-500/40 text-purple-200 rounded-full hover:bg-purple-500/10 hover:border-pink-400/50 transition-all"
        >
          ← Voltar ao mapa
        </Link>

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔭</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Torre
          </h1>
          <p className="text-purple-300 font-mono mt-3">
            Monitoramento — observabilidade do reino
          </p>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {metricas.map((m) => (
            <div
              key={m.nome}
              className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 text-center hover:border-pink-400/50 hover:bg-purple-800/20 transition-all shadow-lg shadow-purple-900/20"
            >
              <div className="text-3xl mb-2">{m.icone}</div>
              <div className={`text-2xl font-bold ${m.cor}`}>{m.valor}</div>
              <p className="text-purple-400/80 text-xs mt-1">{m.nome}</p>
              <p className="text-purple-400/60 text-[10px] mt-1">{m.detalhe}</p>
            </div>
          ))}
        </div>

        {/* Gráfico de atividade (simulado) */}
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 shadow-lg shadow-purple-900/20">
          <div className="flex justify-between items-end mb-4">
            <span className="text-purple-300 font-mono text-sm">
              Atividade nos últimos 7 dias
            </span>
            <span className="text-purple-400 text-[10px]">
              Simulado — preparando para Prometheus + Grafana
            </span>
          </div>
          <div className="flex items-end justify-between h-32 gap-2">
            {dias.map((dia, i) => {
              const altura = (valores[i] / max) * 100;
              return (
                <div
                  key={dia}
                  className="flex flex-col items-center gap-1 w-full"
                >
                  <div
                    className="w-full bg-gradient-to-t from-pink-500 to-purple-500 rounded-t-lg shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                    style={{ height: altura + "%" }}
                    title={`${dia}: ${valores[i]} ações`}
                  />
                  <span className="text-[10px] text-purple-400">{dia}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-center text-purple-500 text-xs font-mono">
          Observabilidade: logs, métricas e traces virão com Prometheus + Grafana
        </div>
      </div>
    </main>
  );
}
