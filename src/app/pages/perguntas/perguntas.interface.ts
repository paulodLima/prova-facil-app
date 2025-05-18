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

export interface SerieResponse {
  nome: string;
}

export interface AssuntoResponse {
  nome: string;
}

export interface ProfessorResponse {
  nome: string;
  email: string;
  senha: string;
  roles: string[];
}

export interface AlternativaErradaResponse {
  texto: string;
}

export interface PerguntaResponse {
  id: number;
  enunciado: string;
  tipo: string;
  respostaCorreta: string;
  serie: SerieResponse;
  assunto: AssuntoResponse;
  professor: ProfessorResponse;
  dataCriacao: Date;
  alternativasErradas: AlternativaErradaResponse[];
}

export interface Page<T> {
  content: T[];
  pageable: any;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: any;
  empty: boolean;
}
