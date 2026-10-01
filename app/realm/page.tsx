import Link from "next/link";

const locations = [
  {
    emoji: "🏰",
    name: "Castelo",
    label: "Experiência",
    description: "Minha jornada profissional",
  },
  {
    emoji: "🌲",
    name: "Floresta",
    label: "Habilidades",
    description: "Ferramentas e tecnologias",
  },
  {
    emoji: "🐉",
    name: "Caverna",
    label: "Projetos",
    description: "Missões concluídas — clique para entrar",
    href: "/realm/projetos",
  },
  {
    emoji: "💎",
    name: "Cristal",
    label: "Status do Sistema",
    description: "Saúde da aplicação",
  },
  {
    emoji: "🏘️",
    name: "Vila",
    label: "Sobre Mim",
    description: "Quem sou eu",
  },
  {
    emoji: "🔭",
    name: "Torre",
    label: "Monitoramento",
    description: "Observabilidade e métricas",
  },
];

export default function Realm() {
  return (
    <main className="min-h-screen bg-[#1a0b1f] text-white p-8 md:p-12">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-8 px-4 py-2 border border-purple-500/40 text-purple-200 rounded-full hover:bg-purple-500/10 hover:border-pink-400/50 transition-all"
        >
          ← Voltar para a entrada
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          🗺️ O Reino
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => {
            const card = (
              <>
                <div className="text-6xl mb-4">{location.emoji}</div>
                <h2 className="text-2xl font-bold text-pink-200 mb-1">
                  {location.name}
                </h2>
                <p className="text-purple-300 font-mono text-sm mb-2">
                  {location.label}
                </p>
                <p className="text-purple-400/80 text-sm">
                  {location.description}
                </p>
              </>
            );

            const estilo =
              "bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 text-center hover:border-pink-400/50 hover:bg-purple-800/20 transition-all shadow-lg shadow-purple-900/20";

            // Se tem href, vira portal clicável. Se não, é só um card apagado por enquanto.
            if ("href" in location && location.href) {
              return (
                <Link
                  key={location.name}
                  href={location.href}
                  className={`${estilo} cursor-pointer hover:scale-[1.02]`}
                >
                  {card}
                </Link>
              );
            }

            return (
              <div key={location.name} className={`${estilo} opacity-80`}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}