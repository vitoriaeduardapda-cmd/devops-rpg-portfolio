// Testes das funções puras do reino.
// Arquivo: app/utils/__tests__/missoes.test.ts
import {
  validarRank,
  corDoStatus,
  percentualProgresso,
} from "../missoes";

describe("validarRank", () => {
  it("deve aceitar rank S", () => {
    expect(validarRank("S")).toBe(true);
  });

  it("deve aceitar rank A", () => {
    expect(validarRank("A")).toBe(true);
  });

  it("deve aceitar rank B", () => {
    expect(validarRank("B")).toBe(true);
  });

  it("deve rejeitar ranks inválidos", () => {
    expect(validarRank("C")).toBe(false);
    expect(validarRank("Z")).toBe(false);
    expect(validarRank("")).toBe(false);
  });
});

describe("corDoStatus", () => {
  it("Concluída deve retornar verde", () => {
    expect(corDoStatus("Concluída")).toBe("text-green-400");
  });

  it("Em andamento deve retornar amarelo", () => {
    expect(corDoStatus("Em andamento")).toBe("text-yellow-400");
  });

  it("Bloqueada deve retornar vermelho", () => {
    expect(corDoStatus("Bloqueada")).toBe("text-red-400");
  });

  it("status desconhecido deve retornar cinza", () => {
    expect(corDoStatus("Desconhecido")).toBe("text-gray-400");
  });
});

describe("percentualProgresso", () => {
  it("metade do progresso deve ser 50%", () => {
    expect(percentualProgresso(1, 2)).toBe(50);
  });

  it("progresso completo deve ser 100%", () => {
    expect(percentualProgresso(10, 10)).toBe(100);
  });

  it("sem progresso deve ser 0%", () => {
    expect(percentualProgresso(0, 5)).toBe(0);
  });

  it("não deve passar de 100%", () => {
    expect(percentualProgresso(15, 10)).toBe(100);
  });

  it("total zero deve retornar 0", () => {
    expect(percentualProgresso(5, 0)).toBe(0);
  });
});
