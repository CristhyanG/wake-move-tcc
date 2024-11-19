import RNFS from 'react-native-fs';
import { XMLParser } from 'fast-xml-parser';

const loadGPX = async (): Promise<{ latitude: number; longitude: number }[]> => {
  const filePath = `${RNFS.DocumentDirectoryPath}/route.gpx`;

  try {
    const doesFileExist = await RNFS.exists(filePath);
    if (!doesFileExist) {
      const assetFilePath = RNFS.MainBundlePath + '/assets/Simulate/route.gpx';
      await RNFS.copyFile(assetFilePath, filePath);
    }

    const fileContent = await RNFS.readFile(filePath, 'utf8');
    const parser = new XMLParser({
      ignoreAttributes: false, // Para acessar atributos como `lat` e `lon`
    });
    const result = parser.parse(fileContent);

    const points = result.gpx.trk.trkseg.trkpt;
    const routeCoordinates = points.map((pt: any) => {
      const latitude = parseFloat(pt['@_lat']); // Acessa o atributo "lat" com o prefixo "@_"
      const longitude = parseFloat(pt['@_lon']); // Acessa o atributo "lon" com o prefixo "@_"
      return { latitude, longitude };
    });

    console.log('Rota carregada do GPX:', routeCoordinates);
    return routeCoordinates;
  } catch (error) {
    console.error('Erro ao carregar GPX:', error);
    return [];
  }
};

export default loadGPX;
