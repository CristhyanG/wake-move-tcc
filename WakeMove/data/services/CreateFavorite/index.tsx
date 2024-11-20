import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/data/Config'; // Importe sua configuração do Firebase aqui

export const createFavorite = async (userId: string, currentAddress: string, finalAddress: string) => {
  try {
    // Dados do novo favorito sem a função callback
    const newFavoriteData = {
      Origin: currentAddress,
      Destination: finalAddress,
      Fate: finalAddress, // Se precisar de mais campos, adicione aqui
      Ponto_A: currentAddress,
      data: new Date().toISOString(), // A data atual
      userId: userId, // ID do usuário
      // Não incluímos a função callback aqui, já que funções não podem ser armazenadas no Firestore
    };

    // Salva o favorito no Firestore
    const docRef = await addDoc(collection(db, 'Favorite'), newFavoriteData);

    console.log('Favorito criado com sucesso!', docRef.id);
    return true; // Retorna sucesso
  } catch (error) {
    console.error('Erro ao criar o favorito:', error);
    return false; // Retorna falha
  }
};
