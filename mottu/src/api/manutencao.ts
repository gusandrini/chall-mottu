import { Manutencao } from '../models/manutencao';
import apiClient from "./apiClient";

// Criar
export function addManutencao(manutencao: Manutencao) {
  return apiClient.post("/manutencoes/inserir", manutencao);
}

// Listar todas
export function getManutencoes() {
  return apiClient.get<Manutencao[]>("/manutencoes/todas");
}

// Buscar por ID
export function getManutencao(id: number) {
  return apiClient.get<Manutencao>(`/manutencoes/${id}`);
}

// Atualizar
export function updateManutencao(manutencao: Manutencao) {
  return apiClient.put(
    `/manutencoes/atualizar/${manutencao.idManutencao}`,
    manutencao
  );
}

// Remover
export function deleteManutencao(id: number) {
  return apiClient.delete(`/manutencoes/remover/${id}`);
}
