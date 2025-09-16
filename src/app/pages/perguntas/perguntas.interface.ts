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
  id: number
  nome: string;
}

export interface AssuntoResponse {
  nome: string;
  id: number
}

export interface AssuntoResponse {
  nome: string;
  id: number
}

export interface ProfessorResponse {
  nome: string;
  email: string;
  disciplina: DisciplinaAssuntoResponse;
  roles: string[];
}

export interface AlternativaErradaResponse {
  texto: string;
  id: number
  idPergunta: number
}
export interface PostAlternativaErradaResponse {
  texto: string;
}

export interface AlternativaErradaRequest {
  texto: string;
  idPergunta: number
}

export interface DisciplinaAssuntoResponse {
  texto: string;
  idPergunta: number
}

export interface PerguntaResponse {
  id: number;
  enunciado: string;
  tipo: string;
  nivel: string;
  respostaCorreta: string;
  serie: SerieResponse;
  assunto: AssuntoResponse;
  disciplina: DisciplinaResponse;
  professor: ProfessorResponse;
  dataCriacao: Date;
  alternativasErradas: AlternativaErradaResponse[];
}

export interface DisciplinaResponse {
  codigo: number;
  descricao: string;
  assuntos: AssuntoResponse[];
}

export interface PerguntasResponse {
  id: number;
  enunciado: string;
  tipo: string;
  nivel: string;
  respostaCorreta: string;
  serie: number;
  assunto: number;
}

export interface PostPerguntaRequest {
  enunciado: string;
  tipo: number;
  dificuldade: string;
  respostaCorreta: string;
  serie: number;
  assunto: number;
  professor: number;
  alternativasErradas: PostAlternativaErradaResponse[];
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

export interface ArquivoRequest {
  dataDocumento:Date;
  nomeArquivo: string;
  arquivo: File;
}

export interface DetalheArquivo {
  arquivo: File;
  dataDocumento: Date;
}
