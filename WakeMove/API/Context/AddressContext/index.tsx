import React, { 
  createContext, 
  useState, 
  ReactNode, 
  useContext 
} from 'react';

interface AddressContextProps {
  finalAddress: string;
  setFinalAddress: React.Dispatch<React.SetStateAction<string>>;
  currentAddress: string;
  setCurrentAddress: React.Dispatch<React.SetStateAction<string>>;
}

const AddressContext = createContext<AddressContextProps | undefined>(undefined);

export const useFinalAddress = (): Omit<AddressContextProps, 'currentAddress' | 'setCurrentAddress'> => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useFinalAddress must be used within an AddressProvider");
  }
  const { finalAddress, setFinalAddress } = context;
  return { finalAddress, setFinalAddress };
};

export const useCurrentAddress = (): Omit<AddressContextProps, 'finalAddress' | 'setFinalAddress'> => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useCurrentAddress must be used within an AddressProvider");
  }
  const { currentAddress, setCurrentAddress } = context;
  return { currentAddress, setCurrentAddress };
};

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [finalAddress, setFinalAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');

  return (
    <AddressContext.Provider value={{ 
      finalAddress, setFinalAddress, 
      currentAddress, setCurrentAddress
    }}>
      {children}
    </AddressContext.Provider>
  );
};
