import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "@/data/Config";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: string | null;  // Variável para mensagens de sucesso
  signup: (email: string, password: string) => Promise<void>;
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
  success: null,  // Inicializando a variável de sucesso como null
  signup: async () => {},
  login: async () => {},
  checkEmailVerification: async () => {},
  resetPassword: async () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);  // Estado de sucesso

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

  // Cadastro de novo usuário
  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(null); // Limpar erro anterior
    setSuccess(null); // Limpar mensagem de sucesso anterior
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

      setSuccess("Usuário cadastrado com sucesso. Verifique seu email para ativação.");
    } catch (error) {
      setError(`Erro ao cadastrar usuário: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  // Login do usuário
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null); // Limpar erro anterior
    setSuccess(null); // Limpar mensagem de sucesso anterior
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

      setSuccess("Login bem-sucedido.");
    } catch (error) {
      setError(`Erro ao realizar login: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  // Verificação de email
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
          setSuccess("Email verificado com sucesso.");
        } else {
          setError("Email ainda não foi verificado.");
        }
      }
    }
  };

  // Redefinição de senha
  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null); // Limpar erro anterior
    setSuccess(null); // Limpar mensagem de sucesso anterior
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Email de redefinição de senha enviado com sucesso.");
    } catch (error) {
      setError(`Erro ao enviar email: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, success, signup, login, checkEmailVerification, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
