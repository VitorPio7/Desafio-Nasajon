import { ResultadoMunicipio } from "./types";

export function calculateStats(results: ResultadoMunicipio[]) {
  const stats = {
    total_municipios: results.length,
    total_ok: 0,
    total_nao_encontrado: 0,
    total_erro_api: 0,
    pop_total_ok: 0,
    medias_por_regiao: {} as Record<string, number>,
  };

  const soma: Record<string, number> = {};
  const count: Record<string, number> = {};

  results.forEach((r) => {
    if (r.status === "OK") {
      stats.total_ok++;
      stats.pop_total_ok += r.populacao_input;

      soma[r.regiao!] = (soma[r.regiao!] || 0) + r.populacao_input;
      count[r.regiao!] = (count[r.regiao!] || 0) + 1;
    } else {
      stats.total_nao_encontrado++;
    }
  });

  for (const regiao in soma) {
    stats.medias_por_regiao[regiao] = soma[regiao] / count[regiao];
  }

  return stats;
}
