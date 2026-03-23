import axios from "axios";

export interface Municipio {
  id: number;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string;
        regiao: {
          nome: string;
        };
      };
    };
  };
}

export class IBGEService {
  async getMunicipios(): Promise<Municipio[]> {
    const res = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/municipios",
    );
    return res.data;
  }
}
