import apiClient from "./apiClient";
import { Funcionario } from "../models/funcionario";

// Criar
export function addFuncionario(funcionario: Funcionario) {
  return apiClient.post("/funcionarios/inserir", funcionario);
}

// Listar todos
export function getFuncionarios() {
  return apiClient.get<Funcionario[]>("/funcionarios/todos");
}

// Buscar por ID
export function getFuncionario(id: number) {
  return apiClient.get<Funcionario>(`/funcionarios/${id}`);
}

// Atualizar
export function updateFuncionario(funcionario: Funcionario) {
  return apiClient.put(
    `/funcionarios/atualizar/${funcionario.idFuncionario}`,
    funcionario
  );
}

// Remover
export function deleteFuncionario(id: number) {
  return apiClient.delete(`/funcionarios/remover/${id}`);
}
