import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a0b1f] text-white flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-2xl">
        <p className="text-5xl animate-pulse">🧚‍♀️</p>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Vitória Eduarda
        </h1>
        <h2 className="text-2xl md:text-3xl text-purple-200 font-mono">
          DevOps Adventurer
        </h2>

        <Link href="/realm" className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xl font-semibold rounded-full shadow-lg shadow-pink-500/30 hover:scale-105 transition-transform">
          ⚔️ ENTER THE REALM
        </Link>
      </div>
    </main>
  );
}