import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "@/data/Config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustonModal } from "@/Components/Organismo/alert";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: ( email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  checkEmailVerification: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  signup: async () => {},
  login: async () => {},
  checkEmailVerification: async () => {},
  resetPassword: async () => {}
});

export const AuthProvider = ({ children, navigation }: { children: React.ReactNode, navigation: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [closeModalMessage, setCloseModalMessage] = useState("")

  const handleShowModal = (message: string, closeMessage: string) => {
    setModalMessage(message);
    setCloseModalMessage(closeMessage);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalMessage("");
  };

  // Carregar usuário do AsyncStorage ao inicializar
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          uid: parsedUser.uid,
          email: parsedUser.email,
          emailVerified: parsedUser.emailVerified,
        });
      }
    };
    loadUser();

    // Listener para mudanças de estado no Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email!,
          emailVerified: currentUser.emailVerified,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      await sendEmailVerification(newUser);
      await AsyncStorage.setItem('user', JSON.stringify({
        uid: newUser.uid,
        email: newUser.email!,
        emailVerified: newUser.emailVerified,
      }));

      setUser({
        uid: newUser.uid,
        email: newUser.email!,
        emailVerified: newUser.emailVerified,
      });

      handleShowModal("Usuário cadastrado com sucesso. Verifique seu email para ativação.", "OK");
      navigation.navigate('Home')
    } catch (error) {
      handleShowModal(`Erro ao cadastrar usuário: ${(error as Error).message}`, "Tente Novamente");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedUser = userCredential.user;
      await AsyncStorage.setItem('user', JSON.stringify({
        uid: loggedUser.uid,
        email: loggedUser.email!,
        emailVerified: loggedUser.emailVerified,
      }));

      setUser({
        uid: loggedUser.uid,
        email: loggedUser.email!,
        emailVerified: loggedUser.emailVerified,
      });

      handleShowModal("Login bem-sucedido.", "OK");
      navigation.navigate('Home')
    } catch (error) {
      handleShowModal(`Erro ao realizar login: ${(error as Error).message}`, "Tente Novamente");
    } finally {
      setLoading(false);
    }
  };

  const checkEmailVerification = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email!,
          emailVerified: currentUser.emailVerified,
        });
        if (currentUser.emailVerified) {
          handleShowModal("Email verificado com sucesso.", "OK");
        } else {
          handleShowModal("Email ainda não foi verificado.", "Tente Novamente");
        }
      }
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      handleShowModal("Email de redefinição de senha enviado com sucesso.", "OK");
    } catch (error) {
      handleShowModal(`Erro ao enviar email: ${(error as Error).message}`,"Tente Novamante");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, login, checkEmailVerification, resetPassword }}>
      {children}
      <CustonModal
        modalText={modalMessage}
        closeText={closeModalMessage}
        onClose={handleCloseModal}
        visible={modalVisible}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
