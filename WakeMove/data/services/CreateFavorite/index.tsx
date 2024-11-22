import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/data/Config'; // Importe sua configuração do Firebase aqui

export const createFavorite = async (email: string, currentAddress: string, finalAddress: string) => {
  try {
    const newFavoriteData = {
      Origin: currentAddress,
      Destination: finalAddress,
      Fate: finalAddress,
      Ponto_A: currentAddress,
      data: new Date().toISOString(), // A data atual
      email: email, // Inclui o email para associar o favorito ao usuário
    };

    const docRef = await addDoc(collection(db, 'Favorite'), newFavoriteData);

    console.log('Favorito criado com sucesso!', docRef.id);
    return true;
  } catch (error) {
    console.error('Erro ao criar o favorito:', error);
    return false;
  }
};
