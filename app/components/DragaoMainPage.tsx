"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// DRAGÃO NA MAINPAGE
// Desenho exato da referência em rosa-escuro (public/dragao-rosa.png, gerado a
// partir de public/dragao.png) que entra pela direita, ondula até a esquerda e
// some da tela, atrás do conteúdo. Como é uma imagem pronta, o bater de asas
// virou um balanço de voo (inclina e ondula enquanto voa).
// Para mudar ele no futuro, é só falar "dragão na mainpage" e editar este arquivo.
export function DragaoMainPage() {
  const dragaoRef = useRef<HTMLDivElement>(null);
  const balancoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dragaoRef.current;
    if (!el) return;

    // Travessia: entra pela direita, ondula até a esquerda e some da tela.
    // Depois recomeça (o desenho olha para a esquerda, que é a direção do voo).
    const voo = { p: 0 };
    const travessia = gsap.to(voo, {
      p: 1,
      duration: 10,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        const x = window.innerWidth * 0.6 - voo.p * window.innerWidth * 1.2;
        const y = Math.sin(voo.p * Math.PI * 3) * window.innerHeight * 0.18;
        gsap.set(el, { x, y });
      },
    });

    // Balanço de voo: inclina e ondula como se estivesse batendo as asas
    const balanco = gsap.to(balancoRef.current, {
      rotation: 5,
      skewY: 3,
      duration: 0.9,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    return () => {
      travessia.kill();
      balanco.kill();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div
        ref={dragaoRef}
        style={{ transformOrigin: "center" }}
        className="w-[min(70vw,520px)] opacity-60"
      >
        <div ref={balancoRef} style={{ transformOrigin: "center" }}>
          <Image
            src="/dragao-rosa.png"
            alt=""
            width={300}
            height={300}
            priority
            className="h-auto w-full [filter:drop-shadow(0_0_28px_rgba(236,72,153,0.55))]"
          />
        </div>
      </div>
    </div>
  );
}
