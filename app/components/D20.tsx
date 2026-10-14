"use client";

import dynamic from "next/dynamic";

// D20 3D — dado de 20 faces clicável.
// Salvo em: app/components/D20.tsx (carrega a cena só no navegador).
// Uso: <D20 tamanho={44} /> dentro do botão "Clique para Entrar".
function Carregando({ tamanho }: { tamanho: number }) {
  return <span className="inline-block" style={{ width: tamanho, height: tamanho }} />;
}

const D20Cena = dynamic(
  () => import("./D20Cena").then((m) => m.D20Cena),
  {
    ssr: false,
    loading: () => <Carregando tamanho={44} />,
  }
);

export function D20({ tamanho = 44 }: { tamanho?: number }) {
  return <D20Cena tamanho={tamanho} />;
}
