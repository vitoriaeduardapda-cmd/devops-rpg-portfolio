"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const locais = [
  {
    id: "castelo",
    nome: "Castelo",
    label: "Experiência",
    href: "/realm/experiencia",
    emoji: "🏰",
    x: 22,
    y: 18,
    cor: "from-pink-400 to-purple-500",
  },
  {
    id: "floresta",
    nome: "Floresta",
    label: "Habilidades",
    href: "/realm/habilidades",
    emoji: "🌲",
    x: 48,
    y: 14,
    cor: "from-emerald-400 to-teal-500",
  },
  {
    id: "caverna",
    nome: "Caverna",
    label: "Projetos",
    href: "/realm/projetos",
    emoji: "🐉",
    x: 72,
    y: 22,
    cor: "from-rose-500 to-fuchsia-600",
  },
  {
    id: "cristal",
    nome: "Cristal",
    label: "Status",
    href: "/realm/cristal",
    emoji: "💎",
    x: 86,
    y: 34,
    cor: "from-fuchsia-400 to-purple-600",
  },
  {
    id: "vila",
    nome: "Vila",
    label: "Sobre Mim",
    href: "/realm/sobre",
    emoji: "🏘️",
    x: 44,
    y: 62,
    cor: "from-amber-400 to-orange-500",
  },
  {
    id: "torre",
    nome: "Torre",
    label: "Monitoramento",
    href: "/realm/torre",
    emoji: "🔭",
    x: 78,
    y: 72,
    cor: "from-indigo-400 to-blue-500",
  },
];

export default function MapaJogo() {
  const router = useRouter();
  const carrinhoRef = useRef<HTMLDivElement>(null);
  const [posicaoAtual, setPosicaoAtual] = useState<{ x: number; y: number }>({
    x: 12,
    y: 82,
  });

  // Posições em porcentagem do container
  const posicoes: Record<string, { x: number; y: number }> = {
    castelo: { x: 22, y: 18 },
    floresta: { x: 48, y: 14 },
    caverna: { x: 72, y: 22 },
    cristal: { x: 86, y: 34 },
    vila: { x: 44, y: 62 },
    torre: { x: 78, y: 72 },
  };

  useEffect(() => {
    // Posiciona o carrinho no início
    gsap.set(carrinhoRef.current, { x: 12, y: 82 });
  }, []);

  function viajarPara(id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const alvo = posicoes[id];
    if (!alvo) return;

    // Anima o carrinho mineiro até a ilha
    gsap.to(carrinhoRef.current, {
      x: alvo.x,
      y: alvo.y,
      duration: 1.6,
      ease: "power2.inOut",
      rotation: () => {
        // Gira levemente na direção do movimento
        const dx = alvo.x - posicaoAtual.x;
        const dy = alvo.y - posicaoAtual.y;
        return Math.atan2(dy, dx) * (180 / Math.PI) - 90;
      },
      onComplete: () => {
        setPosicaoAtual(alvo);
        // Após a animação, navega para a página do local
        router.push(locais.find((l) => l.id === id)!.href);
      },
    });
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0b2a] via-[#2d1b3d] to-[#1a0b1f] text-white"
    >
      {/* Céu com estrelas sutis */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ddd, rgba(0,0,0,0)), radial-gradient(2px 2px at 160px 120px, #eee, rgba(0,0,0,0))",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Menu lateral */}
      <nav className="absolute top-24 left-8 z-20 flex flex-col gap-2">
        {locais.map((local) => (
          <button
            key={local.id}
            onClick={(e) => viajarPara(local.id, e)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-purple-500/40 bg-purple-900/40 text-pink-200 text-sm font-medium hover:bg-purple-800/60 hover:border-pink-400/60 transition-all backdrop-blur-sm"
          >
            <span className="text-xl">{local.emoji}</span>
            <span>{local.nome}</span>
            <span className="text-xs font-mono text-purple-400/70">{local.label}</span>
          </button>
        ))}
      </nav>

      {/* Título */}
      <h1 className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent backdrop-blur-sm">
        🗺️ O Reino — Mapa do Jogo
      </h1>

      {/* Área do mapa */}
      <div
        className="relative w-full h-[80vh] max-w-[1200px] mx-auto pt-32"
        style={{
          // Fundo simulando mapa com nuvens (apenas CSS)
          background:
            "radial-gradient(circle at 20% 30%, rgba(236,72,153,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.15) 0%, transparent 40%)",
        }}
      >
        {/* Caminhos entre ilhas (linhas sutis) */}
        <div className="absolute inset-0 pointer-events-none">
          {[["castelo", "floresta"], ["floresta", "caverna"], ["caverna", "cristal"], ["floresta", "vila"], ["vila", "torre"]].map(
            ([a, b], i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  top: `${(posicoes[a].y + posicoes[b].y) / 2}%`,
                  left: `${(posicoes[a].x + posicoes[b].x) / 2}%`,
                  width: `${Math.abs(posicoes[a].x - posicoes[b].x) * 1.5}%`,
                  height: `${Math.abs(posicoes[a].y - posicoes[b].y) * 1.5}%`,
                  border: "1px solid rgba(236,72,153,0.25)",
                  borderRadius: "50%",
                  transform: `translate(-50%, -50%) rotate(${Math.atan2(posicoes[b].y - posicoes[a].y, posicoes[b].x - posicoes[a].x) * (180 / Math.PI)}deg)`,
                }}
              />
            )
          )}
        </div>

        {/* Ilhas */}
        {locais.map((local) => (
          <div
            key={local.id}
            className="absolute flex flex-col items-center justify-center cursor-pointer group"
            style={{
              left: `${local.x}%`,
              top: `${local.y}%`,
              transform: "translate(-50%, -50%)",
              width: "110px",
              height: "110px",
            }}
            onClick={(e) => viajarPara(local.id, e)}
          >
            {/* Sombra da ilha */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-40"
              style={{
                background: `linear-gradient(135deg, ${local.cor.replace("from-", "").replace(" to-", ",")})`,
              }}
            />
            {/* Ilha em si */}
            <div
              className="relative z-10 w-32 h-32 rounded-[60%_40%_70%_40%/50%_60%_40%_50%] bg-gradient-to-tr from-pink-500 via-purple-500 to-purple-700 shadow-[0_0_30px_rgba(236,72,153,0.5)] border border-pink-400/30 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300"
            >
              {local.emoji}
            </div>
            {/* Nome da ilha */}
            <span className="mt-2 text-xs font-bold text-pink-200 backdrop-blur-sm px-2 py-1 rounded bg-black/40 group-hover:bg-pink-500/30">
              {local.nome}
            </span>
          </div>
        ))}

        {/* Carrinho mineiro */}
        <div
          ref={carrinhoRef}
          className="absolute z-30 w-16 h-16 flex items-center justify-center pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) rotate(-90deg)`,
          }}
        >
          {/* Vagão do carrinho */}
          <div className="relative w-12 h-8 bg-pink-500 rounded-t-lg shadow-lg border-2 border-pink-300">
            {/* Caixa de minério/cristal */}
            <div
              className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
            />
            {/* Rodas */}
            <div className="absolute bottom-0 left-1 w-2 h-2 bg-purple-800 rounded-full" />
            <div className="absolute bottom-0 right-1 w-2 h-2 bg-purple-800 rounded-full" />
            {/* Passageira (cabelo rosa) */}
            <div
              className="absolute top-[-14px] left-2 w-3 h-3 bg-pink-300 rounded-full shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Instrução */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-purple-300 text-sm font-mono backdrop-blur-sm px-3 py-1 rounded bg-black/40">
        Clique em uma ilha para viajar com o carrinho mineiro ⛏️
      </p>
    </main>
  );
}
