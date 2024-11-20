import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "@/data/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(app);

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  checkEmailVerification: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>
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

interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const checkUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser({
          uid: parsedUser.uid,
          email: parsedUser.email,
          emailVerified: parsedUser.emailVerified,
        });
      }
    };
    checkUser()
  }, [])

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      await AsyncStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email!,
        emailVerified: user.emailVerified,
      }));

      setUser({
        uid: user.uid,
        email: user.email!,
        emailVerified: user.emailVerified,
      });

      console.log('Usuário criado com sucesso:', user);
    } catch (error) {
      console.error('Erro ao cadastrar usuário', error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await AsyncStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email!,
        emailVerified: user.emailVerified,
      }))
      setUser({
        uid: user.uid,
        email: user.email!,
        emailVerified: user.emailVerified,
      });
      console.log("Login bem-sucedido:", user);
    } catch (error) {
      console.error("Erro ao logar", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("Usuário desconectado");
    } catch (error) {
      console.error("Erro ao realizar logout", error);
      setError((error as Error).message);
    }
  };

  const checkEmailVerification = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();  // Atualiza o estado do usuário atual
      const user = auth.currentUser;
      setUser({
        uid: user.uid,
        email: user.email!,
        emailVerified: user.emailVerified,
      });
      if (user.emailVerified) {
        console.log("Email verificado com sucesso");
      } else {
        console.error("Email não verificado");
      }
    }
  };
  const resetPassword = async (email: string, )=>{
    setLoading(true)
    try{
      await sendPasswordResetEmail(auth, email);
    }
    catch(error){
      console.error("Erro ao enviar email de redefinição de senha ", error)
    }
    finally{
      setLoading(false)
    }
  }


  return (
    <AuthContext.Provider value={{ user, loading, error, signup, logout, login, checkEmailVerification, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
