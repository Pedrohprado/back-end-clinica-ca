export interface Client {
  nome: string;
  telefone: string;
  cpf: string;
  email?: string;
  endereco: string;
}

export interface ClientPrisma {
  id: number;
  nome: string;
  telefone: string;
  cpf: string;
  email: string | null;
  endereco: string;
  createdAt: Date;
  updateAt: Date;
}
