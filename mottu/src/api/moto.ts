import { Moto } from '../models/moto';
import apiClient from "./apiClient";

// Criar
export function addMoto(moto: Moto) {
  return apiClient.post("/motos/inserir", moto);
}

// Listar todas
export function getMotos() {
  return apiClient.get<Moto[]>("/motos/todas");
}

// Buscar por ID
export function getMoto(idMoto: number) {
  return apiClient.get<Moto>(`/motos/${idMoto}`);
}

// Atualizar
export function updateMoto(moto: Moto) {
  return apiClient.put(`/motos/atualizar/${moto.idMoto}`, moto);
}

// Remover
export function deleteMoto(idMoto: number) {
  return apiClient.delete(`/motos/remover/${idMoto}`);
}
