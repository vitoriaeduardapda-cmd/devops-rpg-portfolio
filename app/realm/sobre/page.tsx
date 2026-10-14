import Link from "next/link";

// Vila = Sobre Mim. Ajuste os textos à vontade — é a sua história.
export default function Sobre() {
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
          <div className="text-6xl mb-4">🏘️</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Vila
          </h1>
          <p className="text-purple-300 font-mono mt-3">
            Sobre mim — quem é a aventureira
          </p>
        </div>

        <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8 shadow-lg shadow-purple-900/20 space-y-4">
          <p className="text-purple-100/90 leading-relaxed">
            Sou a Vitória Eduarda, uma DevOps Adventurer em transição para
            DevOps e Cloud. Gosto de aprender construindo: este portfólio é um
            RPG jogável e, ao mesmo tempo, a demonstração prática do que estudo
            — Next.js, Git, CI/CD e deploy automático.
          </p>
          <p className="text-purple-100/90 leading-relaxed">
            Já entreguei automação de verdade para cliente: um script em Python
            com Pandas que organiza documentos de pagamento na rede do cliente.
            Agora estou expandindo o reino rumo a Docker, Terraform e AWS.
          </p>
          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href="https://github.com/vitoriaeduardapda-cmd"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform"
            >
              GitHub
            </a>
            <Link
              href="/realm/projetos"
              className="px-5 py-2.5 rounded-full border border-purple-500/40 text-purple-200 hover:bg-purple-500/10 hover:border-pink-400/50 transition-all"
            >
              Ver missões
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
