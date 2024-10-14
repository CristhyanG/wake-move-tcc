import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AddressContextProps {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const AddressContext = createContext<AddressContextProps | undefined>(undefined);

export const useAddress = (): AddressContextProps => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState('');

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
