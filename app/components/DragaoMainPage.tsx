"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// DRAGÃO NA MAINPAGE
// Flip-book com 2 quadros (public/dragao-voo-1.png = asas em cima,
// public/dragao-voo-2.png = asas embaixo) que se alternam para parecer que as
// asas estão batendo, enquanto ele cruza a tela ondulando e some, atrás do conteúdo.
// Para mudar ele no futuro, é só falar "dragão na mainpage" e editar este arquivo.
const QUADROS = ["/dragao-voo-1.png", "/dragao-voo-2.png"];

export function DragaoMainPage() {
  const dragaoRef = useRef<HTMLDivElement>(null);
  const balancoRef = useRef<HTMLDivElement>(null);
  // Quadro atual do bater de asas (0 = asas em cima, 1 = asas embaixo)
  const [quadro, setQuadro] = useState(0);

  useEffect(() => {
    // Alterna os quadros para animar o bater de asas
    const asas = setInterval(() => {
      setQuadro((q) => (q + 1) % QUADROS.length);
    }, 350);
    return () => clearInterval(asas);
  }, []);

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

    // Balanço de voo: inclina e ondula junto do bater de asas
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
        <div
          ref={balancoRef}
          style={{ transformOrigin: "center" }}
          className="relative [filter:drop-shadow(0_0_28px_rgba(236,72,153,0.55))]"
        >
          {QUADROS.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={300}
              height={300}
              priority
              className={
                "h-auto w-full " + (i === quadro ? "block" : "hidden")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
