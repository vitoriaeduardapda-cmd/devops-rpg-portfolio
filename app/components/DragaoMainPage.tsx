"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// DRAGÃO NA MAINPAGE
// Silhueta de dragão em SVG rosa-escuro que voa atrás do conteúdo da página inicial.
// Para mudar ele no futuro, é só falar "dragão na mainpage" e editar este arquivo.
export function DragaoMainPage() {
  const vooRef = useRef<HTMLDivElement>(null);
  const asaFrenteRef = useRef<SVGGElement>(null);
  const asaTrasRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Voo: desliza suave para os lados e para cima/baixo, sem parar
    const voo = gsap.to(vooRef.current, {
      x: 36,
      y: -26,
      rotation: 2,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Asas: batem alternadas como um voo de verdade
    const asaFrente = gsap.to(asaFrenteRef.current, {
      rotation: -16,
      svgOrigin: "340 218",
      duration: 0.9,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    const asaTras = gsap.to(asaTrasRef.current, {
      rotation: 12,
      svgOrigin: "360 218",
      duration: 0.9,
      delay: 0.45,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    return () => {
      voo.kill();
      asaFrente.kill();
      asaTras.kill();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div ref={vooRef} className="w-[min(88vw,720px)] opacity-60">
        <svg
          viewBox="0 0 640 420"
          className="h-auto w-full [filter:drop-shadow(0_0_28px_rgba(236,72,153,0.55))]"
        >
          {/* asa de trás (tom mais fechado) */}
          <g ref={asaTrasRef}>
            <path
              d="M360 218 C375 162 405 118 450 88 L440 122 L480 114 L455 147 L495 154 L450 170 C420 187 388 204 360 222 Z"
              fill="#831843"
            />
          </g>

          {/* cauda com ponta de flecha */}
          <path
            d="M405 252 C480 247 545 212 580 152 L592 164 C560 227 495 264 410 267 Z"
            fill="#9D174D"
          />
          <path d="M580 152 L612 134 L600 170 Z" fill="#9D174D" />

          {/* corpo */}
          <ellipse
            cx="325"
            cy="252"
            rx="95"
            ry="44"
            fill="#BE185D"
            transform="rotate(-6 325 252)"
          />

          {/* espinhos dorsais */}
          <path
            d="M270 214 l12 -20 l12 20 Z M300 208 l12 -20 l12 20 Z M330 205 l12 -20 l12 20 Z M360 205 l12 -20 l12 20 Z"
            fill="#9D174D"
          />

          {/* pernas recolhidas em voo */}
          <path d="M295 290 L285 320 L300 324 L308 294 Z" fill="#9D174D" />
          <path d="M360 292 L358 322 L373 324 L378 292 Z" fill="#9D174D" />

          {/* pescoço */}
          <path
            d="M245 237 C210 230 185 217 165 200 L178 184 C200 200 228 210 258 216 Z"
            fill="#BE185D"
          />

          {/* cabeça */}
          <path
            d="M178 184 L138 192 L150 200 L136 210 L172 206 C180 199 182 191 178 184 Z"
            fill="#BE185D"
          />

          {/* chifres */}
          <path d="M168 182 L158 160 L176 178 Z" fill="#BE185D" />
          <path d="M182 184 L180 162 L194 182 Z" fill="#BE185D" />

          {/* olho (ponto de luz para destacar na silhueta) */}
          <circle cx="160" cy="194" r="3.5" fill="#FBCFE8" />

          {/* asa da frente (tom principal, por cima do corpo) */}
          <g ref={asaFrenteRef}>
            <path
              d="M330 222 C345 157 385 102 455 64 L438 110 L488 102 L456 140 L508 150 L452 168 C410 190 362 207 330 227 Z"
              fill="#DB2777"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
