export interface PostSerieRequest {
  nome: string;
}
export interface ProvaRequest {
  totalQuestoes: number;
  facil: number;
  medio: number;
  dificil: number;
  serie: number;
  assunto: number[];
}

export interface AssuntoResponse {
  id: number;
  nome: string;
}

export interface DisciplinaResponse {
  codigo: number;
  descricao: string;
  assuntos: AssuntoResponse[];
}
