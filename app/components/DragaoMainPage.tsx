"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// DRAGÃO NA MAINPAGE
// Desenho exato da referência em rosa-escuro (public/dragao-rosa.png, gerado a
// partir de public/dragao.png) que percorre um caminho em formato de INFINITO
// (∞) por toda a tela, atrás do conteúdo. Como é uma imagem pronta, o bater de
// asas virou um balanço de voo (inclina e ondula enquanto voa).
// Para mudar ele no futuro, é só falar "dragão na mainpage" e editar este arquivo.
export function DragaoMainPage() {
  const dragaoRef = useRef<HTMLDivElement>(null);
  const balancoRef = useRef<HTMLDivElement>(null);
  // Direção do olhar: 1 = olhando para a esquerda, -1 = para a direita
  const direcaoRef = useRef(1);
  const xAnteriorRef = useRef(0);

  useEffect(() => {
    const el = dragaoRef.current;
    if (!el) return;

    // Tamanho do infinito proporcional à tela
    const largura = () => window.innerWidth * 0.36;
    const altura = () => window.innerHeight * 0.3;

    // Infinito: x segue seno(t) e y segue seno(2t) — juntos desenham o símbolo ∞
    const voo = { t: 0 };
    const travessia = gsap.to(voo, {
      t: Math.PI * 2,
      duration: 18,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        const x = Math.sin(voo.t) * largura();
        const y = Math.sin(voo.t * 2) * altura();
        gsap.set(el, { x, y });

        // Vira o dragão para o lado para onde ele está indo
        if (x > xAnteriorRef.current + 2 && direcaoRef.current !== -1) {
          direcaoRef.current = -1;
          gsap.to(el, { scaleX: -1, duration: 0.4 });
        } else if (x < xAnteriorRef.current - 2 && direcaoRef.current !== 1) {
          direcaoRef.current = 1;
          gsap.to(el, { scaleX: 1, duration: 0.4 });
        }
        xAnteriorRef.current = x;
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
