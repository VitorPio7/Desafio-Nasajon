import { Municipio } from "../services/IBGEService";
import { normalize } from "../utils/normalize";
import { InputMunicipio, ResultadoMunicipio } from "./types";

function findBestMatch(nomeInput: string, municipios: Municipio[]) {
  const nomeNormalizado = normalize(nomeInput);
  const matches = municipios.filter(
    (m) => normalize(m.nome) === nomeNormalizado,
  );

  if (matches.length === 1) return matches[0];

  if (matches.length > 1) {
    return (
      matches.find((m) => m.microrregiao.mesorregiao.UF.sigla === "SP") ||
      matches[0]
    );
  }
  return null;
}

export function processMunicipios(
  data: InputMunicipio[],
  municipios: Municipio[],
): ResultadoMunicipio[] {
  return data.map((item) => {
    const match = findBestMatch(item.municipio, municipios);

    if (!match) {
      return {
        municipio_input: item.municipio,
        populacao_input: Number(item.populacao),
        status: "NAO_ENCONTRADO",
      };
    }

    return {
      municipio_input: item.municipio,
      populacao_input: Number(item.populacao),
      municipio_ibge: match.nome,
      uf: match.microrregiao.mesorregiao.UF.sigla,
      regiao: match.microrregiao.mesorregiao.UF.regiao.nome,
      id_ibge: match.id,
      status: "OK",
    };
  });
}
