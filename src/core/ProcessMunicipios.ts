import { Municipio } from "../services/IBGEService";
import { normalize } from "../utils/normalize";
import { InputMunicipio, ResultadoMunicipio } from "./types";

export function processMunicipios(
  data: InputMunicipio[],
  municipios: Municipio[],
): ResultadoMunicipio[] {
  return data.map((item) => {
    const nome = normalize(item.municipio);

    const match = municipios.find((m) => normalize(m.nome).includes(nome));

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
