// src/services/saveEditFavorite.ts
import { EditButton } from "@/data/userAuth/EditDb";

// Define a interface para os dados da rota
export interface RouteData {
  Origin: string;
  Destination: string;
}

/**
 * Salva a edição de uma rota no banco de dados.
 * 
 * @param routeId - O ID da rota a ser editada.
 * @param updatedData - Os novos dados da rota.
 * @returns Uma Promise que resolve quando a operação for concluída.
 */
export const saveEditFavorite = async (routeId: string, updatedData: RouteData): Promise<void> => {
  if (!routeId || !updatedData) {
    throw new Error("Dados inválidos para salvar a edição.");
  }
  await EditButton(routeId, updatedData);
};
