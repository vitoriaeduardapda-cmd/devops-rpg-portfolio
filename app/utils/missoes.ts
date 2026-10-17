// Funções puras de validação do reino — fáceis de testar.
// Arquivo: app/utils/missoes.ts

// Verifica se o rank é válido no reino (S, A ou B)
export function validarRank(rank: string): boolean {
  const ranksValidos = ["S", "A", "B"];
  return ranksValidos.includes(rank);
}

// Retorna a cor da missão com base no status
export function corDoStatus(status: string): string {
  switch (status) {
    case "Concluída":
      return "text-green-400";
    case "Em andamento":
      return "text-yellow-400";
    case "Bloqueada":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

// Calcula o percentual de progresso (0 a 100)
export function percentualProgresso(atual: number, total: number): number {
  if (total <= 0) return 0;
  const p = (atual / total) * 100;
  return Math.min(100, Math.max(0, Math.round(p)));
}
