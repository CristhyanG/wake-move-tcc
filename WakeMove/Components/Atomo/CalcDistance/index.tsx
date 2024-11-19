export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = lat1 * (Math.PI / 180); // Converter latitude de grau para radiano
    const φ2 = lat2 * (Math.PI / 180); // Converter latitude de grau para radiano
    const Δφ = (lat2 - lat1) * (Math.PI / 180); // Diferença de latitude em radianos
    const Δλ = (lon2 - lon1) * (Math.PI / 180); // Diferença de longitude em radianos
  
    // Fórmula de Haversine
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distância em metros
  
    // Para depuração, podemos ver a distância calculada
    // console.log(`Distância calculada: ${distance} metros`);
  
    return distance; // Retorna a distância em metros
  };
  