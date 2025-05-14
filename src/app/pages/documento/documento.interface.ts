export interface TipoEventoDetailsDTO {
  tpEv: number;
  noTipoEv: string;
  sqPlano: number;
  sgPlano: string;
  noTipoDoc: string;
}

export interface ValidacaoInclusaoResponse {
  cdLocal: number;
  noLocal: string;
  tipoEventos: TipoEventoDetailsDTO[];
}

export interface PlanosDTO {
  sqPlano: number;
  sgPlano: string;
}
