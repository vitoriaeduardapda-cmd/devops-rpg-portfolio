"use client";

import Link from "next/link";
import { Cinzel } from "next/font/google";
import type { MouseEvent, ReactNode } from "react";

// Fonte épica estilo RPG para o botão (combina com fantasia, mantém profissional)
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
});

// Botão com moldura ornamental em teste — cantos em voluta rosa/lilás.
// Arquivo: app/components/BotaoOrnamental.tsx
function Canto({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={`pointer-events-none absolute h-10 w-10 ${className}`}
    >
      {/* voluta externa rosa */}
      <path
        d="M5 43 C5 27 11 13 27 9 C33 7.5 39 8 45 10"
        stroke="#f9a8d4"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* voluta interna lilás */}
      <path
        d="M13 43 C13 31 17 23 27 20 C32 18.5 36 19 38.5 22"
        stroke="#c4b5fd"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* espiralzinha */}
      <path
        d="M27 34 c-4.5 0 -7.5 -3 -7.5 -7 c0 -5 4.5 -8.5 9.5 -8.5"
        stroke="#f0abfc"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* gema do canto */}
      <circle cx="7" cy="7" r="2.5" fill="#f0abfc" />
    </svg>
  );
}

export function BotaoOrnamental({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}) {
  return (
    <span className="relative inline-block p-3">
      <Canto className="-left-1 -top-1" />
      <Canto className="-right-1 -top-1 rotate-90" />
      <Canto className="-bottom-1 -right-1 rotate-180" />
      <Canto className="-bottom-1 -left-1 -rotate-90" />
      <Link
        href={href}
        onClick={onClick}
        className={`${cinzel.className} relative inline-flex items-center gap-3 rounded-2xl border-2 border-pink-200/70 bg-gradient-to-r from-pink-400 to-purple-400 px-8 py-4 text-xl font-semibold tracking-[0.12em] text-white shadow-[0_0_25px_rgba(236,72,153,0.45)] outline outline-2 outline-offset-[6px] outline-purple-300/40 transition-transform hover:scale-105`}
      >
        {children}
      </Link>
    </span>
  );
}
