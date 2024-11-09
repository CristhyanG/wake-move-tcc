import React, { 
  createContext, 
  useState, 
  ReactNode, 
  useContext 
} from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

interface GeocodeContextProps {
  origin: Location | null;
  destination: Location | null;
  locationsHistory: Location[];
  geocodeAddress: (address: string, type: 'origin' | 'destination') => Promise<{ success: boolean, message?: string }>;
}

const GeocodeContext = createContext<GeocodeContextProps | undefined>(undefined);

export const useGeocode = (): GeocodeContextProps => {
  const context = useContext(GeocodeContext);
  if (!context) {
    throw new Error("useGeocode must be used within a GeocodeProvider");
  }
  return context;
};

export const GeocodeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [locationsHistory, setLocationHistory] = useState<Location[]>([]);

  const geocodeAddress = async (address: string, type: 'origin' | 'destination'): Promise<{ success: boolean, message?: string }> => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const locs = data.results.map((result: any) => ({
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng
        }));

        const newLocation = locs[0];
        if (type === 'origin') {
          setOrigin(newLocation);
        } else {
          setDestination(newLocation);
        }
        setLocationHistory([...locationsHistory, newLocation]);

        return { success: true };
      } else if (data.error_message) {
        return { success: false, message: data.error_message };
      } else {
        return { success: false, message: 'Unknown error' };
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      return { success: false, message: errorMessage };
    }
  };

  return (
    <GeocodeContext.Provider value={{ origin, destination, locationsHistory, geocodeAddress }}>
      {children}
    </GeocodeContext.Provider>
  );
};
