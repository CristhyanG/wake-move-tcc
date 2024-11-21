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

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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
  logout: async () => {},
  login: async () => {},
  checkEmailVerification: async () => {},
  resetPassword: async () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      console.log("Usuário cadastrado com sucesso:", newUser);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setError((error as Error).message);
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

      console.log("Login bem-sucedido:", loggedUser);
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      setUser(null);
      console.log("Logout realizado com sucesso");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      setError((error as Error).message);
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
          console.log("Email verificado com sucesso");
        } else {
          console.warn("Email ainda não foi verificado");
        }
      }
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Email de redefinição de senha enviado com sucesso");
    } catch (error) {
      console.error("Erro ao enviar email de redefinição de senha:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, logout, login, checkEmailVerification, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
