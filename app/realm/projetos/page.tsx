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

              <div className="flex flex-wrap gap-2">
                {missao.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-mono rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-200"
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
