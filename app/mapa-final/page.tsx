"use client";

import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Coordenadas e assets fornecidos por você
const locais = [
  { id: "castelo", nome: "Castelo", href: "/realm/experiencia", asset: "castelo.png", x: 13.83, y: 41.67 },
  { id: "floresta", nome: "Floresta", href: "/realm/habilidades", asset: "floresta.png", x: 38.5, y: 44.83 },
  { id: "caverna", nome: "Caverna", href: "/realm/projetos", asset: "caverna.png", x: 65.5, y: 45.89 },
  { id: "cristal", nome: "Cristal", href: "/realm/cristal", asset: "cristal.png", x: 95.75, y: 45.1 },
  { id: "torre", nome: "Torre", href: "/realm/torre", asset: "torre.png", x: 85.5, y: 92.3 },
  { id: "vila", nome: "Vila", href: "/realm/sobre", asset: "vila.png", x: 36.42, y: 78.85 },
  { id: "carrinho", nome: "Carrinho", href: null, asset: "carrinhomenina.png", x: 2.92, y: 92.04 },
];

export default function MapaFinal() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const carrinhoRef = useRef<HTMLDivElement>(null);

  // Mapeamento de id para elemento DOM (para animação do carrinho)
  const elRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    // Posiciona o carrinho inicialmente
    const carrinho = locais.find((l) => l.id === "carrinho");
    if (carrinho && carrinhoRef.current) {
      gsap.set(carrinhoRef.current, { x: carrinho.x, y: carrinho.y });
    }
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
        // Fundo do reino cobrindo toda a tela
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

      {/* Área do mapa com fundo e assets */}
      <div
        ref={containerRef}
        className="relative w-full h-[85vh] max-w-[1600px] mx-auto pt-20 cursor-pointer"
      >
        {/* Assets posicionados por coordenadas (porcentagem) */}
        {locais.map((local) => (
          <div
            key={local.id}
            className="absolute cursor-pointer group transition-transform duration-300"
            style={{
              left: `${local.x}%`,
              top: `${local.y}%`,
              transform: "translate(-50%, -50%)",
              width: "140px",
              height: "140px",
            }}
            onClick={(e) => viajarPara(local.id, e)}
            ref={(el) => {
              if (el) elRefs.current[local.id] = el;
            }}
          >
            {/* Imagem do asset */}
            <img
              src={`/${local.asset}`}
              alt={local.nome}
              className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            {/* Nome da ilha (exceto carrinho) */}
            {local.href && (
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-pink-200 bg-black/60 px-2 py-1 rounded border border-pink-500/50 backdrop-blur-sm group-hover:bg-pink-500/30">
                {local.nome}
              </span>
            )}
          </div>
        ))}

        {/* Carrinho mineiro (posicionado na coordenada específica) */}
        <div
          ref={carrinhoRef}
          className="absolute z-40 w-20 h-20 flex items-center justify-center pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) rotate(-90deg)`,
          }}
        >
          <img
            src="/carrinhomenina.png"
            alt="Carrinho mineiro"
            className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]"
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
