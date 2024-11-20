// // Exemplo de como mapear RouteData para AddNewFavorite
// import { EditButton } from "@/data/userAuth/EditDb";

// // Defina a interface para os dados da rota
// export interface RouteData {
//   Origin: string;
//   Destination: string;
//   [key: string]: any; // Caso outras propriedades possam ser adicionadas
// }

// /**
//  * Edita uma rota no banco de dados.
//  * @param routeId - O ID da rota a ser editada.
//  * @param updatedData - Os novos dados para a rota.
//  * @returns Uma Promise que resolve quando a edição for concluída.
//  */
// export const editFavorite = async (routeId: string, updatedData: Partial<RouteData>): Promise<void> => {
//   if (!routeId || !updatedData) {
//     throw new Error("Dados inválidos para edição");
//   }

//   // Mapeamento de RouteData para AddNewFavorite
//   const updatedFavorite: Partial<AddNewFavorite> = {
//     Ponto_A: updatedData.Origin, // Mapeando Origin para Ponto_A
//     Fate: updatedData.Destination, // Mapeando Destination para Fate
//     data: updatedData, // Adicionando outras propriedades, caso existam
//     callback: (id: string) => console.log(`Rota editada com ID: ${id}`), // Exemplo de callback
//   };

//   return await EditButton(routeId, updatedFavorite);
// };
