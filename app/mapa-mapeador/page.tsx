"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

const locais = [
  { id: "castelo", nome: "Castelo", href: "/realm/experiencia", emoji: "🏰", cor: "from-pink-400 to-purple-500" },
  { id: "floresta", nome: "Floresta", href: "/realm/habilidades", emoji: "🌲", cor: "from-emerald-400 to-teal-500" },
  { id: "caverna", nome: "Caverna", href: "/realm/projetos", emoji: "🐉", cor: "from-rose-500 to-fuchsia-600" },
  { id: "cristal", nome: "Cristal", href: "/realm/cristal", emoji: "💎", cor: "from-fuchsia-400 to-purple-600" },
  { id: "vila", nome: "Vila", href: "/realm/sobre", emoji: "🏘️", cor: "from-amber-400 to-orange-500" },
  { id: "torre", nome: "Torre", href: "/realm/torre", emoji: "🔭", cor: "from-indigo-400 to-blue-500" },
];

type PontoMapeado = {
  id: string;
  x: number;
  y: number;
  asset: string;
};

export default function MapaMapeador() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carrinhoRef = useRef<HTMLDivElement>(null);

  const [mapeamentoAtivo, setMapeamentoAtivo] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pontoTemporario, setPontoTemporario] = useState<{ x: number; y: number } | null>(null);
  const [pontos, setPontos] = useState<PontoMapeado[]>([]);
  const [assetInput, setAssetInput] = useState("");

  function obterPosicaoPercentual(e: MouseEvent) {
    const container = containerRef.current;
    if (!container) return null;
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
  }

  function clicarNoMapa(e: React.MouseEvent<HTMLDivElement>) {
    if (!mapeamentoAtivo) return;
    const pos = obterPosicaoPercentual(e.nativeEvent);
    if (!pos) return;
    setPontoTemporario(pos);
    setMostrarModal(true);
  }

  function salvarPonto() {
    if (!pontoTemporario || !assetInput.trim()) return;
    const novo: PontoMapeado = {
      id: `ponto-${Date.now()}`,
      x: pontoTemporario.x,
      y: pontoTemporario.y,
      asset: assetInput.trim(),
    };
    setPontos((prev) => [...prev, novo]);
    setPontoTemporario(null);
    setAssetInput("");
    setMostrarModal(false);
  }

  function cancelarPonto() {
    setPontoTemporario(null);
    setAssetInput("");
    setMostrarModal(false);
  }

  function exportarJSON() {
    const dados = pontos.map((p) => ({
      x: p.x,
      y: p.y,
      asset: p.asset,
    }));
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mapa-coordenadas.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function limparTodos() {
    setPontos([]);
  }

  function viajarPara(id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const ponto = pontos.find((p) => p.asset.includes(id));
    if (!ponto) return;
    gsap.to(carrinhoRef.current, {
      x: ponto.x,
      y: ponto.y,
      duration: 1.6,
      ease: "power2.inOut",
      rotation: -90,
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0b2a] via-[#2d1b3d] to-[#1a0b1f] text-white">
      {/* Barra de controle superior */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3 items-center backdrop-blur-md bg-black/30 p-4 rounded-2xl border border-white/10">
        <button
          onClick={() => setMapeamentoAtivo(!mapeamentoAtivo)}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
            mapeamentoAtivo
              ? "bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)]"
              : "bg-purple-600/50 text-purple-200 border border-purple-400/50"
          }`}
        >
          {mapeamentoAtivo ? "Desativar mapeamento" : "Ativar mapeamento"}
        </button>
        {pontos.length > 0 && (
          <button
            onClick={exportarJSON}
            className="px-6 py-2 rounded-full bg-emerald-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-105 transition-transform"
          >
            📥 Exportar JSON
          </button>
        )}
        {pontos.length > 0 && (
          <button
            onClick={limparTodos}
            className="px-6 py-2 rounded-full bg-red-500/20 text-red-300 border border-red-500/50 font-bold text-sm hover:bg-red-500/40 transition-all"
          >
            Limpar pontos
          </button>
        )}
        <span className="text-xs text-purple-400">Pontos mapeados: {pontos.length}</span>
      </div>

      {/* Modal para digitar o nome do asset */}
      {mostrarModal && pontoTemporario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-purple-900 border border-purple-500/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h2 className="text-xl font-bold text-pink-200 mb-4">Qual é o nome do arquivo da imagem?</h2>
            <p className="text-purple-300 text-sm mb-4">Exemplo: castelo.png</p>
            <input
              type="text"
              value={assetInput}
              onChange={(e) => setAssetInput(e.target.value)}
              autoFocus
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/50 text-white focus:outline-none focus:border-pink-400 mb-4"
              placeholder="castelo.png"
            />
            <div className="flex gap-3">
              <button onClick={salvarPonto} className="flex-1 py-3 rounded-lg bg-pink-500 text-white font-bold hover:bg-pink-400 transition-all">
                Salvar ponto
              </button>
              <button onClick={cancelarPonto} className="flex-1 py-3 rounded-lg bg-red-500/20 text-red-300 border border-red-500/50 hover:bg-red-500/40 transition-all">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mapa */}
      <div ref={containerRef} onClick={clicarNoMapa} className="relative w-full h-[80vh] max-w-[1200px] mx-auto pt-32 cursor-pointer">
        {/* Céu */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ddd, rgba(0,0,0,0)), radial-gradient(2px 2px at 160px 120px, #eee, rgba(0,0,0,0))", backgroundRepeat: "repeat", backgroundSize: "200px 200px" }} />

        {/* Título */}
        <h1 className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent backdrop-blur-sm">
          🗺️ Mapeador do Reino
        </h1>

        {/* Instrução quando mapeamento ativo */}
        {mapeamentoAtivo && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-pink-400/50 text-pink-200 text-sm font-mono">
            Clique em qualquer lugar do mapa para marcar uma posição
          </div>
        )}

        {/* Marcadores dos pontos mapeados */}
        {pontos.map((ponto) => (
          <div key={ponto.id} className="absolute z-40" style={{ left: `${ponto.x}%`, top: `${ponto.y}%`, transform: "translate(-50%, -50%)" }}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-600 border-2 border-white shadow-lg shadow-pink-600/50 animate-pulse">
              <span className="text-[10px] font-bold text-white">{ponto.asset.replace(".png", "").toUpperCase()[0]}</span>
            </div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-pink-200 bg-black/70 px-2 py-1 rounded border border-pink-500/50 backdrop-blur-sm">{ponto.asset}</span>
          </div>
        ))}

        {/* Ilhas do reino (para referência visual) */}
        {locais.map((local) => {
          const ponto = pontos.find((p) => p.asset.includes(local.id));
          return (
            <div key={local.id} className="absolute flex flex-col items-center justify-center cursor-pointer group transition-transform duration-300" style={{ left: ponto ? ponto.x : 22, top: ponto ? ponto.y : 18, transform: ponto ? "translate(-50%, -50%)" : "translate(-50%, -50%)", width: "120px", height: "120px" }} onClick={(e) => viajarPara(local.id, e)}>
              {ponto && <div className="absolute -top-2 -right-2 z-10 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_10px_rgba(16,185,129,0.8)]" />}
              <div className="relative z-10 w-28 h-28 rounded-[60%_40%_70%_40%/50%_60%_40%_50%] bg-gradient-to-tr from-pink-500 via-purple-500 to-purple-700 shadow-[0_0_30px_rgba(236,72,153,0.5)] border border-pink-400/30 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">{local.emoji}</div>
              <span className="mt-1 text-[10px] font-bold text-pink-200 backdrop-blur-sm px-2 py-0.5 rounded bg-black/40">{local.nome}</span>
            </div>
          );
        })}

        {/* Carrinho mineiro (apenas visual, opcional) */}
        {pontos.length > 0 && (
          <div ref={carrinhoRef} className="absolute z-30 w-16 h-16 flex items-center justify-center pointer-events-none" style={{ transform: `translate(-50%, -50%) rotate(-90deg)`, left: pontos[0].x, top: pontos[0].y }}>
            <div className="relative w-12 h-8 bg-pink-500 rounded-t-lg shadow-lg border-2 border-pink-300">
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              <div className="absolute bottom-0 left-1 w-2 h-2 bg-purple-800 rounded-full" />
              <div className="absolute bottom-0 right-1 w-2 h-2 bg-purple-800 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Rodapé com instruções */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-purple-300 text-xs font-mono backdrop-blur-sm px-3 py-1 rounded bg-black/60 border border-purple-500/30">
        {mapeamentoAtivo ? "Modo mapeamento ATIVO — clique no mapa para marcar posição" : "Clique em 'Ativar mapeamento' para começar"}
      </div>
    </main>
  );
}
