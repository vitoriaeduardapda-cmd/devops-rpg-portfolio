"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// DRAGÃO NA MAINPAGE
// Silhueta de dragão em SVG rosa-escuro (baseada na referência: voo lateral,
// asas de morcego erguidas, cauda longa com ponta de flecha) que percorre um
// caminho em formato de INFINITO (∞) por toda a tela, atrás do conteúdo.
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

    // Asas: batem alternadas como um voo de verdade
    const asaFrente = gsap.to(asaFrenteRef.current, {
      rotation: -14,
      svgOrigin: "300 220",
      duration: 0.9,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    const asaTras = gsap.to(asaTrasRef.current, {
      rotation: 10,
      svgOrigin: "292 222",
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
          viewBox="0 0 600 400"
          className="h-auto w-full [filter:drop-shadow(0_0_28px_rgba(236,72,153,0.55))]"
        >
          {/* asa de trás (estendida para a esquerda) */}
          <g ref={asaTrasRef}>
            <path
              d="M292 218 C250 195 195 178 135 172 L162 190 L128 202 L168 212 L145 232 L190 230 C228 230 262 226 292 228 Z"
              fill="#BE185D"
            />
          </g>

          {/* cauda longa com ponta de flecha */}
          <path
            d="M392 250 C460 252 520 280 562 326 L572 316 C534 266 468 238 396 236 Z"
            fill="#BE185D"
          />
          <path d="M562 326 L596 336 L568 350 Z" fill="#BE185D" />

          {/* corpo */}
          <ellipse
            cx="310"
            cy="258"
            rx="92"
            ry="38"
            fill="#BE185D"
            transform="rotate(-8 310 258)"
          />

          {/* espinhos dorsais */}
          <path
            d="M255 224 l10 -16 l10 16 Z M285 220 l10 -16 l10 16 Z M315 217 l10 -16 l10 16 Z M345 217 l10 -16 l10 16 Z"
            fill="#BE185D"
          />

          {/* pernas recolhidas em voo */}
          <path d="M280 292 L272 320 L287 323 L295 294 Z" fill="#BE185D" />
          <path d="M345 294 L343 322 L358 323 L362 294 Z" fill="#BE185D" />

          {/* pescoço */}
          <path
            d="M248 240 C210 232 175 220 145 205 L158 190 C188 203 222 214 258 222 Z"
            fill="#BE185D"
          />

          {/* cabeça */}
          <path
            d="M158 190 L118 196 L130 204 L116 212 L152 212 C162 206 164 197 158 190 Z"
            fill="#BE185D"
          />

          {/* chifres */}
          <path d="M150 190 L138 168 L160 186 Z" fill="#BE185D" />
          <path d="M162 191 L156 168 L172 188 Z" fill="#BE185D" />

          {/* olho (ponto de luz para destacar na silhueta) */}
          <circle cx="140" cy="201" r="3" fill="#FBCFE8" />

          {/* asa da frente (erguida, por cima do corpo) */}
          <g ref={asaFrenteRef}>
            <path
              d="M296 222 C292 160 305 95 340 35 L352 72 L372 52 L380 92 L402 80 L400 120 L424 114 L410 152 C388 186 340 212 296 226 Z"
              fill="#BE185D"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
