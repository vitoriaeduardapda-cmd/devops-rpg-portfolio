"use client";

import dynamic from "next/dynamic";

// D20 3D — dado de 20 faces clicável.
// Salvo em: app/components/D20.tsx (carrega a cena só no navegador).
// Uso na main page: <D20 /> ao lado do botão "Clique para Entrar".
const D20Cena = dynamic(
  () => import("./D20Cena").then((m) => m.D20Cena),
  {
    ssr: false,
    loading: () => <div className="h-28 w-28" />,
  }
);

export function D20() {
  return <D20Cena />;
}
