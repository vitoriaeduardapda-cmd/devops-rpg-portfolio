import Link from "next/link";

// Para adicionar uma missão nova, é só copiar um bloco { ... } e mudar os textos.
// É aqui que você vai colocar seus projetos de verdade aos poucos.
const missoes = [
  {
    rank: "S",
    nome: "DevOps RPG Portfolio",
    tipo: "Main Quest — Em andamento",
    descricao:
      "Portfólio interativo em Next.js com mapa do reino. O próprio site demonstra CI/CD na prática.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    status: "Em andamento",
  },
  {
    rank: "A",
    nome: "Cofre dos Pagamentos",
    tipo: "Main Quest — Concluída",
    descricao:
      "Automação em Python com Pandas, OpenPyXL e PyPDF para separar documentos de pagamento na rede do cliente, por exigência de contrato. Lê planilhas e PDFs e organiza os arquivos para agilizar a rotina de pagamentos.",
    stack: ["Python", "Pandas", "OpenPyXL", "PyPDF", "Git"],
    status: "Concluída",
  },
  {
    rank: "B",
    nome: "Torre de Monitoramento",
    tipo: "Side Quest — Futura",
    descricao:
      "Exemplo de missão futura: página de status da aplicação com Prometheus e Grafana.",
    stack: ["Prometheus", "Grafana", "Docker"],
    status: "Bloqueada",
  },
];

// Ferramentas com destaque maior — tons mais escuros e vivos, ainda doces
const pasteis = [
  "bg-gradient-to-r from-[#FB7185] to-[#F472B6] border-[#BE123C] shadow-rose-400/50",
  "bg-gradient-to-r from-[#38BDF8] to-[#818CF8] border-[#0369A1] shadow-sky-400/50",
  "bg-gradient-to-r from-[#A78BFA] to-[#C084FC] border-[#6D28D9] shadow-violet-400/50",
  "bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] border-[#B45309] shadow-amber-400/50",
];

export default function Projetos() {
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
          <div className="text-6xl mb-4">🐉</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Caverna
          </h1>
          <p className="text-purple-300 font-mono mt-3">
            Missões concluídas — meus projetos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missoes.map((missao) => (
            <div
              key={missao.nome}
              className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 hover:border-pink-400/50 hover:bg-purple-800/20 transition-all shadow-lg shadow-purple-900/20"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-sm font-bold rounded-full bg-pink-600/30 border border-pink-400/40 text-pink-200">
                  Rank {missao.rank}
                </span>
                <span className="text-xs font-mono text-purple-300">
                  {missao.status}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-pink-200 mb-1">
                {missao.nome}
              </h2>
              <p className="text-purple-300 font-mono text-sm mb-3">
                {missao.tipo}
              </p>
              <p className="text-purple-200/80 text-sm mb-4">
                {missao.descricao}
              </p>

              <div className="flex flex-wrap gap-2 border-t border-purple-500/20 pt-4 mt-2">
                {missao.stack.map((tech, i) => (
                  <span
                    key={tech}
                    style={{
                      textShadow:
                        "0 1px 4px rgba(40,10,40,0.8), 0 0 2px rgba(40,10,40,0.9)",
                    }}
                    className={`px-3.5 py-2 text-sm font-extrabold uppercase tracking-wider rounded-lg border-2 text-white shadow-lg transition-all duration-200 cursor-default hover:scale-110 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-400/50 hover:brightness-110 ${pasteis[i % pasteis.length]}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
