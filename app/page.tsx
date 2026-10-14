"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DragaoMainPage } from "./components/DragaoMainPage";
import { D20 } from "./components/D20";
import { BotaoOrnamental } from "./components/BotaoOrnamental";

// Nome: serifa elegante e refinada (fantasia sem caricatura)
// Subtítulo: sans moderna espaçada (o lado DevOps/profissional)
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Home() {
  const router = useRouter();
  // Evita dois cliques no texto empilharem navegações
  const navegando = useRef(false);

  // Entra no reino assim que o dado parar de girar
  useEffect(() => {
    const entrar = () => {
      if (navegando.current) router.push("/realm");
    };
    window.addEventListener("d20-parou", entrar);
    return () => window.removeEventListener("d20-parou", entrar);
  }, [router]);
  // Referência para a moldura da fada — o GSAP anima esse elemento
  const fadaRef = useRef<HTMLDivElement>(null);

  // Quando o mouse entra, cresce um pouco
  function pulsar() {
    if (!fadaRef.current) return;
    gsap.to(fadaRef.current, { scale: 1.06, duration: 0.4, ease: "power2.out" });
  }

  // Quando o mouse sai, volta ao normal
  function parar() {
    if (!fadaRef.current) return;
    gsap.to(fadaRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1a0b1f] text-white flex flex-col items-center justify-center p-6">
      {/* Dragão na mainpage: voa atrás de tudo */}
      <DragaoMainPage />
      <div className="relative z-10 text-center space-y-6 max-w-2xl">
        <div
          ref={fadaRef}
          onMouseEnter={pulsar}
          onMouseLeave={parar}
          className="relative mx-auto w-fit cursor-pointer"
        >
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-300 to-pink-500 opacity-60 blur-sm" />
          <div className="relative rounded-full p-2 bg-gradient-to-br from-pink-300 via-purple-400 to-pink-600 shadow-lg shadow-pink-500/40">
            <Image
              src="/fada.png"
              alt="Fada guardiã do reino"
              width={293}
              height={293}
              priority
              className="rounded-full border-4 border-[#1a0b1f] object-cover"
            />
          </div>
        </div>
        <h1 className={`${cormorant.className} text-5xl md:text-6xl font-semibold tracking-wide bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent`}>
          Vitória Eduarda
        </h1>
        <h2 className={`${montserrat.className} text-lg md:text-xl uppercase tracking-[0.35em] text-purple-200`}>
          Devops Adventurer
        </h2>

        <div className="mt-8">
          <BotaoOrnamental
            href="/realm"
            onClick={(e) => {
              // Clique no dado só rola o dado — não entra no reino
              if (e.target instanceof HTMLElement && e.target.closest("canvas")) {
                e.preventDefault();
                return;
              }
              // Clique no texto: rola o dado e entra no reino quando ele parar
              e.preventDefault();
              if (navegando.current) return;
              navegando.current = true;
              window.dispatchEvent(new Event("d20-rolar"));
            }}
          >
            <D20 tamanho={44} />
            Clique para Entrar
          </BotaoOrnamental>
        </div>
      </div>
    </main>
  );
}
