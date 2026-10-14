import Link from "next/link";

// Para adicionar uma habilidade, é só colocar o nome na lista certa.
// Grupos: o que você já usa, o que está em batalha e as próximas magias.
const grupos = [
  {
    titulo: "Magias dominadas",
    descricao: "Ferramentas que já uso com confiança",
    stack: ["Python", "Pandas", "OpenPyXL", "PyPDF", "Git", "GitHub"],
  },
  {
    titulo: "Em batalha",
    descricao: "Estou usando agora neste portfólio",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel", "GSAP"],
  },
  {
    titulo: "Próximas magias",
    descricao: "Roteiro de aprendizado DevOps/Cloud",
    stack: ["Docker", "GitHub Actions", "Terraform", "AWS", "Prometheus", "Grafana"],
  },
];

// Mesmas cores das ferramentas da Caverna
const pasteis = [
  "bg-gradient-to-r from-[#FB7185] to-[#F472B6] border-[#BE123C] shadow-rose-400/50",
  "bg-gradient-to-r from-[#38BDF8] to-[#818CF8] border-[#0369A1] shadow-sky-400/50",
  "bg-gradient-to-r from-[#A78BFA] to-[#C084FC] border-[#6D28D9] shadow-violet-400/50",
  "bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] border-[#D97706] shadow-amber-300/50",
];

export default function Habilidades() {
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
          <div className="text-6xl mb-4">🌲</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Floresta
          </h1>
          <p className="text-purple-300 font-mono mt-3">
            Habilidades — ferramentas e tecnologias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {grupos.map((grupo) => (
            <div
              key={grupo.titulo}
              className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 hover:border-pink-400/50 hover:bg-purple-800/20 transition-all shadow-lg shadow-purple-900/20"
            >
              <h2 className="text-xl font-bold text-pink-200 mb-1">
                {grupo.titulo}
              </h2>
              <p className="text-purple-400/80 text-sm mb-4">
                {grupo.descricao}
              </p>
              <div className="flex flex-wrap gap-2 border-t border-purple-500/20 pt-4">
                {grupo.stack.map((tech, i) => (
                  <span
                    key={tech}
                    style={{
                      textShadow:
                        "0 1px 4px rgba(40,10,40,0.8), 0 0 2px rgba(40,10,40,0.9)",
                    }}
                    className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-lg border-2 text-white shadow-md transition-all duration-200 cursor-default hover:scale-110 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-400/50 hover:brightness-110 ${pasteis[i % pasteis.length]}`}
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
