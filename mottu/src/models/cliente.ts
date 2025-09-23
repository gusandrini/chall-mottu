// src/models/cliente.ts
export interface Cliente {
  id_cliente?: string | number;     
  id_logradouro?: string | number; 
  nm_cliente: string;               
  nm_email: string;                 
  nr_cpf: string;                   
}
