import apiClient from "./apiClient";
import { FuncionarioCad } from "../models/funcionarioCad";

// Criar
export function addFuncionario(funcionario: FuncionarioCad) {
  return apiClient.post("/funcionarios/inserir", funcionario);
}

// Listar todos
export function getFuncionarios() {
  return apiClient.get<FuncionarioCad[]>("/funcionarios/todos");
}

// Buscar por ID
export function getFuncionario(id: number) {
  return apiClient.get<FuncionarioCad>(`/funcionarios/${id}`);
}

// Atualizar
export function updateFuncionario(funcionario: FuncionarioCad) {
  return apiClient.put(
    `/funcionarios/atualizar/${funcionario.idFuncionario}`,
    funcionario
  );
}

// Remover
export function deleteFuncionario(id: number) {
  return apiClient.delete(`/funcionarios/remover/${id}`);
}
