import apiClient from "./apiClient";
import { Cliente } from "../models/cliente";

// Criar cliente
export function addCliente(cliente: Cliente) {
  return apiClient.post("/clientes/inserir", cliente);
}

// Listar clientes
export function getClientes() {
  return apiClient.get<Cliente[]>("/clientes/todos");
}

// Buscar cliente por ID
export function getCliente(id: string) {
  return apiClient.get<Cliente>(`/clientes/${id}`);
}

// Atualizar cliente
export function updateCliente(cliente: Cliente) {
  if (!cliente.id_cliente) {
    throw new Error("id_cliente é obrigatório para atualizar");
  }
  // 🔹 corrigido para bater com @PutMapping("/atualizar/{id_cliente}")
  return apiClient.put(`/clientes/atualizar/${cliente.id_cliente}`, cliente);
}

// Excluir cliente
export function deleteCliente(id: string) {
  // 🔹 corrigido para injetar o id de verdade
  return apiClient.delete(`/clientes/remover/${id}`);
}
