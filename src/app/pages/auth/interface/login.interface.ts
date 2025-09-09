export interface PostProfessorRequest {
  nome: string;
  email: string;
  senha: string;
  disciplina: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface Materia {
  codigo: string;
  descricao: string;
}
