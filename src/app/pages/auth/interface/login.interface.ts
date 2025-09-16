export interface PostProfessorRequest {
  nome: string;
  email: string;
  senha: string;
  disciplina: string[];
  serie: string[];
}

export interface ResetSenhaRequest {
  senha: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface Materia {
  codigo: number;
  descricao: string;
}
export interface Serie {
  id: number;
  nome: string;
}
