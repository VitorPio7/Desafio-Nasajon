export interface InputMunicipio {
  municipio: string;
  populacao: string;
}

export interface ResultadoMunicipio {
  municipio_input: string;
  populacao_input: number;
  municipio_ibge?: string;
  uf?: string;
  regiao?: string;
  id_ibge?: number;
  status: string;
}
