import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authResponse } from '@/Api/SPtrans/AuthResponse'; // importa a função de autenticação
import { Marker } from 'react-native-maps';

interface BusLine {
  codigo: number;
  letreiro: string;
  denominacaoTPTS: string;
  denominacaoTSTP: string;
}

interface BusStop {
  lat: number;
  lng: number;
  name: string;
  lines: BusLine[];
}

interface BusLinesProps {
  busStops: BusStop[];
}

const BusLinesSPTrans: React.FC<BusLinesProps> = ({ busStops }) => {
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    const fetchBusLines = async () => {
      if (busStops.length > 0) {
        try {
          setAuthenticating(true);
          const isAuth = await authResponse(); // Autentica com a API do OlhoVivo
          setAuthenticating(false);

          if (isAuth) {
            const updatedStops = await Promise.all(busStops.map(async (stop) => {
              const response = await axios.get('https://api.olhovivo.sptrans.com.br/v2.1/Linha/BuscarParada', {
                params: { latitude: stop.lat, longitude: stop.lng }
              });

              const lines = response.data.map((line: any) => ({
                codigo: line.codigo,
                letreiro: line.letreiro,
                denominacaoTPTS: line.denominacaoTPTS,
                denominacaoTSTP: line.denominacaoTSTP
              }));

              return {
                ...stop,
                lines
              };
            }));

            console.log('Updated bus stops with lines:', updatedStops);
          } else {
            console.log('Autenticação falhou');
          }
        } catch (error) {
          console.error('Error fetching bus lines:', error);
          setAuthenticating(false);
        }
      }
    };

    fetchBusLines();
  }, [busStops]);

  return (
    <>
      {busStops.length > 0 && busStops.map((busStop, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: busStop.lat,
            longitude: busStop.lng,
          }}
          title={busStop.name || 'Bus Stop'}
          description={
            busStop.lines?.map(
                line => `Linha: ${line.letreiro}`).join
                (', ') || 'Nenhuma linha encontrada'}
        />
        
      ))}
    </>
  );
};

export default BusLinesSPTrans;
