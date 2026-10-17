import Link from "next/link";

// Cristal — Status do Sistema
// Mostra a saúde do próprio reino (este site), rodando na Vercel.
export default function Cristal() {
  const agora = new Date();
  const versao = "1.0.0";

  const sinais = [
    {
      servico: "Portal do Reino (Next.js)",
      status: "Online",
      detalhe: "Respondendo na Vercel",
      cor: "text-pink-200",
    },
    {
      servico: "Repositório do Código",
      status: "Sincronizado",
      detalhe: "GitHub — github.com/vitoriaeduardapda-cmd/devops-rpg-portfolio",
      cor: "text-purple-200",
    },
    {
      servico: "Deploy Automático",
      status: "Ativo",
      detalhe: "Vercel CI/CD — push → build → ar",
      cor: "text-pink-200",
    },
    {
      servico: "Cristal Core",
      status: "Estável",
      detalhe: "Versão " + versao,
      cor: "text-purple-200",
    },
  ];

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
          <div className="text-6xl mb-4">💎</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Cristal
          </h1>
          <p className="text-purple-300 font-mono mt-3">
            Status do Sistema — saúde do reino
          </p>
        </div>

        {/* Crystal Core */}
        <div className="flex justify-center mb-10">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 shadow-[0_0_40px_rgba(236,72,153,0.6)]" />
            <div className="absolute inset-[8px] rounded-full bg-[#1a0b1f] flex items-center justify-center" />
            <div className="absolute inset-0 flex items-center justify-center text-pink-200 font-mono font-bold text-xl">
              CORE
            </div>
          </div>
        </div>

        {/* Status dos serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {sinais.map((sinal) => (
            <div
              key={sinal.servico}
              className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 text-center hover:border-pink-400/50 hover:bg-purple-800/20 transition-all shadow-lg shadow-purple-900/20"
            >
              <div className={`font-mono text-sm mb-1 ${sinal.cor}`}>
                ● {sinal.status}
              </div>
              <h3 className="text-sm font-bold text-pink-200 mb-1">
                {sinal.servico}
              </h3>
              <p className="text-purple-400/80 text-xs leading-relaxed">
                {sinal.detalhe}
              </p>
            </div>
          ))}
        </div>

        {/* Informações do sistema */}
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 shadow-lg shadow-purple-900/20">
          <div className="flex justify-between items-start mb-3">
            <span className="text-purple-300 font-mono text-sm">Versão do sistema</span>
            <span className="text-pink-200 font-bold text-sm">{versao}</span>
          </div>
          <div className="flex justify-between items-start mb-3">
            <span className="text-purple-300 font-mono text-sm">Última atualização</span>
            <span className="text-pink-200 font-bold text-sm">
              {agora.toLocaleDateString("pt-BR")} às {agora.toLocaleTimeString("pt-BR")}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-purple-300 font-mono text-sm">Ambiente</span>
            <span className="text-purple-200 font-bold text-sm">Vercel (produção)</span>
          </div>
        </div>
      </div>
    </main>
  );
}
