import Link from "next/link";

// Castelo = Experiência. Cada bloco é um capítulo da jornada.
// Para adicionar, copie um bloco { ... } e mude os textos.
const capitulos = [
  {
    titulo: "Automação para cliente real",
    periodo: "Concluída",
    descricao:
      "Script em Python com Pandas, OpenPyXL e PyPDF para separar documentos de pagamento na rede do cliente, por exigência de contrato. Minha primeira entrega profissional.",
  },
  {
    titulo: "DevOps RPG Portfolio",
    periodo: "Em andamento",
    descricao:
      "Portfólio interativo em Next.js que demonstra na prática Git, GitHub e deploy automático na Vercel. Cada tecnologia nova vira uma área do reino.",
  },
  {
    titulo: "Rumo ao Cloud",
    periodo: "Próximo capítulo",
    descricao:
      "Roteiro aberto: GitHub Actions, Docker, Terraform e AWS — com a Torre de Monitoramento (Prometheus e Grafana) no horizonte.",
  },
];

export default function Experiencia() {
  return (
    <main className="min-h-screen bg-[#1a0b1f] text-white p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/realm"
          className="inline-block mb-8 px-4 py-2 border border-purple-500/40 text-purple-200 rounded-full hover:bg-purple-500/10 hover:border-pink-400/50 transition-all"
        >
          ← Voltar ao mapa
        </Link>

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏰</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Castelo
          </h1>
          <p className="text-purple-300 font-mono mt-3">
            Experiência — minha jornada profissional
          </p>
        </div>

        <div className="space-y-6 border-l-2 border-purple-500/30 ml-3 pl-8">
          {capitulos.map((cap) => (
            <div key={cap.titulo} className="relative">
              <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-md shadow-pink-500/50" />
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 hover:border-pink-400/50 hover:bg-purple-800/20 transition-all shadow-lg shadow-purple-900/20">
                <span className="text-xs font-mono text-purple-300">
                  {cap.periodo}
                </span>
                <h2 className="text-2xl font-bold text-pink-200 mt-1 mb-2">
                  {cap.titulo}
                </h2>
                <p className="text-purple-200/80 text-sm leading-relaxed">
                  {cap.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
