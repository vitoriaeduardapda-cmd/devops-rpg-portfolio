"use client";

import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

type LocalComCor = {
  id: string;
  nome: string;
  href: string | null;
  asset: string;
  x: number;
  y: number;
  cor: string;
};

// Coordenadas e assets fornecidos por você (em porcentagem 0-100)
const locais: LocalComCor[] = [
  { id: "castelo", nome: "Castelo", href: "/realm/experiencia", asset: "castelo.png", x: 13.83, y: 41.67, cor: "from-pink-400 to-purple-500" },
  { id: "floresta", nome: "Floresta", href: "/realm/habilidades", asset: "floresta.png", x: 38.5, y: 44.83, cor: "from-emerald-400 to-teal-500" },
  { id: "caverna", nome: "Caverna", href: "/realm/projetos", asset: "caverna.png", x: 65.5, y: 45.89, cor: "from-rose-500 to-fuchsia-600" },
  { id: "cristal", nome: "Cristal", href: "/realm/cristal", asset: "cristal.png", x: 95.75, y: 45.1, cor: "from-fuchsia-400 to-purple-600" },
  { id: "torre", nome: "Torre", href: "/realm/torre", asset: "torre.png", x: 85.5, y: 92.3, cor: "from-indigo-400 to-blue-500" },
  { id: "vila", nome: "Vila", href: "/realm/sobre", asset: "vila.png", x: 36.42, y: 78.85, cor: "from-amber-400 to-orange-500" },
  { id: "carrinho", nome: "Carrinho", href: null, asset: "carrinhomenina.png", x: 2.92, y: 92.04, cor: "from-pink-400 to-purple-500" },
];

export default function MapaFinal() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const carrinhoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ajusta o tamanho do container para manter proporção do fundo (16:9)
    function ajustarTamanho() {
      const el = containerRef.current;
      if (!el) return;
      const largura = el.offsetWidth;
      el.style.height = `${largura * 0.5625}px`; // 16:9
    }
    ajustarTamanho();
    window.addEventListener("resize", ajustarTamanho);
    return () => window.removeEventListener("resize", ajustarTamanho);
  }, []);

  function viajarPara(id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const local = locais.find((l) => l.id === id);
    if (!local || !local.href) return;
    router.push(local.href);
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#0f0b2a] text-white"
      style={{
        backgroundImage: `url('/fundo.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Título */}
      <h1 className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent backdrop-blur-sm">
        🗺️ O Reino — Mapa Final
      </h1>

      {/* Overlay de unificação: neblina rosa/lilás suave para casar fundo + assets */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(236,72,153,0.25) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.25) 0%, transparent 45%), linear-gradient(180deg, rgba(15,11,42,0.3) 0%, rgba(26,11,31,0.6) 100%)",
        }}
      />

      {/* Área do mapa com fundo e assets */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1800px] mx-auto pt-20 cursor-pointer aspect-video"
      >
        {/* Assets posicionados por coordenadas (porcentagem) - Tamanho DOBRADO */}
        {locais.map((local) => (
          <div
            key={local.id}
            className="absolute cursor-pointer group transition-transform duration-300"
            style={{
              left: `${local.x}%`,
              top: `${local.y}%`,
              transform: "translate(-50%, -50%)",
              width: "260px",
              height: "260px",
            }}
            onClick={(e) => viajarPara(local.id, e)}
          >
            {/* Glow atrás da imagem para integrar com o fundo */}
            <div
              className="absolute inset-0 rounded-full blur-[40px] opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle, ${local.cor.replace("from-", "").replace(" to-", ",")} 0%, transparent 70%)`,
              }}
            />

            {/* Imagem do asset com borda e sombra */}
            <img
              src={`/${local.asset}`}
              alt={local.nome}
              className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300 relative z-10"
              loading="lazy"
            />

            {/* Borda ornamental sutil ao redor da ilha */}
            <div
              className="absolute inset-0 rounded-full border-2 border-pink-400/40 opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none"
            />

            {/* Nome da ilha (exceto carrinho) */}
            {local.href && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-bold text-pink-200 bg-black/70 px-3 py-1.5 rounded border border-pink-500/50 backdrop-blur-sm group-hover:bg-pink-500/40">
                {local.nome}
              </span>
            )}
          </div>
        ))}

        {/* Carrinho mineiro (posicionado na coordenada específica, tamanho dobrado) */}
        <div
          ref={carrinhoRef}
          className="absolute z-50 w-32 h-32 flex items-center justify-center pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) rotate(-90deg)`,
          }}
        >
          <img
            src="/carrinhomenina.png"
            alt="Carrinho mineiro"
            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(236,72,153,0.7)]"
          />
        </div>
      </div>

      {/* Instrução */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-purple-300 text-sm font-mono backdrop-blur-sm px-3 py-1 rounded bg-black/40">
        Clique em uma ilha para viajar ⛏️
      </p>
    </main>
  );
}
