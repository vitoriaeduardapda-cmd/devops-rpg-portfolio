"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// DRAGÃO NA MAINPAGE
// Silhueta de dragão em SVG rosa-escuro fiel à referência: voo lateral para a
// esquerda, cabeça pequena com chifres, asa grande de morcego erguida, segunda
// asa estendida para trás, cauda longa com ponta de flecha. As asas batem
// (grupos separados com origem no ombro) e o corpo percorre um INFINITO (∞)
// por toda a tela, atrás do conteúdo.
// Para mudar ele no futuro, é só falar "dragão na mainpage" e editar este arquivo.
export function DragaoMainPage() {
  const dragaoRef = useRef<HTMLDivElement>(null);
  const asaFrenteRef = useRef<SVGGElement>(null);
  const asaTrasRef = useRef<SVGGElement>(null);
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

    // Asas: batem alternadas a partir do ombro, como um voo de verdade
    const asaFrente = gsap.to(asaFrenteRef.current, {
      rotation: -14,
      svgOrigin: "306 232",
      duration: 0.9,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    const asaTras = gsap.to(asaTrasRef.current, {
      rotation: 10,
      svgOrigin: "285 238",
      duration: 0.9,
      delay: 0.45,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    return () => {
      travessia.kill();
      asaFrente.kill();
      asaTras.kill();
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
        <svg
          viewBox="0 0 640 400"
          className="h-auto w-full [filter:drop-shadow(0_0_28px_rgba(236,72,153,0.55))]"
        >
          {/* asa de trás (estendida para a esquerda, ponta fina) */}
          <g ref={asaTrasRef}>
            <path
              d="M285 235 C230 215 160 200 70 195 L105 208 L75 220 L115 228 L95 244 L140 244 C190 246 240 244 285 242 Z"
              fill="#BE185D"
            />
          </g>

          {/* cauda longa afinando com ponta de flecha */}
          <path
            d="M394 258 C460 260 525 285 575 330 L585 320 C540 272 472 246 398 244 Z"
            fill="#BE185D"
          />
          <path d="M575 330 L608 340 L580 354 Z" fill="#BE185D" />

          {/* corpo compacto */}
          <ellipse
            cx="310"
            cy="262"
            rx="88"
            ry="36"
            fill="#BE185D"
            transform="rotate(-6 310 262)"
          />

          {/* espinhos no pescoço/dorso */}
          <path
            d="M200 214 l9 -14 l9 14 Z M228 210 l9 -14 l9 14 Z M258 222 l9 -14 l9 14 Z M340 222 l9 -14 l9 14 Z"
            fill="#BE185D"
          />

          {/* pernas recolhidas em voo */}
          <path d="M250 292 L244 318 L258 320 L264 294 Z" fill="#BE185D" />
          <path d="M350 294 L348 320 L362 321 L366 294 Z" fill="#BE185D" />

          {/* pescoço grosso em curva */}
          <path
            d="M250 248 C210 242 170 232 138 220 L150 206 C182 216 220 226 260 232 Z"
            fill="#BE185D"
          />

          {/* cabeça pequena */}
          <path
            d="M120 208 L82 212 L92 220 L80 228 L116 228 C126 222 128 214 120 208 Z"
            fill="#BE185D"
          />

          {/* chifres varrendo para trás */}
          <path d="M112 208 L140 182 L124 210 Z" fill="#BE185D" />
          <path d="M122 210 L152 190 L134 214 Z" fill="#BE185D" />

          {/* olho (ponto de luz para destacar na silhueta) */}
          <circle cx="104" cy="216" r="2.8" fill="#FBCFE8" />

          {/* asa da frente (grande, erguida, por cima do corpo) */}
          <g ref={asaFrenteRef}>
            <path
              d="M306 232 C300 165 315 90 355 25 L365 65 L388 45 L392 88 L416 76 L412 118 L438 110 L424 150 C400 190 350 218 306 234 Z"
              fill="#BE185D"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
