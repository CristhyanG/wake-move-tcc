import { RmButton } from "@/data/userAuth/DeleteDb";

export const deleteFavorite = async (routeId: string) => {
  if (!routeId) throw new Error("ID da rota inválido para exclusão");
  return await RmButton(routeId);
};
