import axios from "axios";

const urlBaseAPI = "https://api.olhovivo.sptrans.com.br/v2.1";//site da api
const chave = "8ffad9d9e6994384594d36b2c56c1a68bac7f5a4381a73694a4ff4ddd8dd4f70";//chave necessária para fazer requisições

const api = axios.create({//axios para facilitar as requisições
    baseURL: urlBaseAPI,
    headers: { 'Content-Type': 'application/json',

    },
});

let isAuthenticated = false;
//função que autentica o contato com a API através de uma requisção POST
//esta função é necessária para as requsições
export const authResponse =  async () => {


    if(isAuthenticated) return true;//booleano para não fazer autenticação infiniata

    try{
        const response = await api.post('Login/autenticar', null, {params :{token: chave}}); //params para atribuir valores dentro das querys como "?token="

        if(response.data === true){
            console.log("Preparado para requisição")
            isAuthenticated = true;
            return true;

        }else if(response.data == false){
            console.log("Erro na chave")
            return false;
        }

    }catch(error){
        console.error('Erro na autenticação:', error);
        
    }
};

//função que busca a linha
//exemplo que segue pega informações da linha
export const linhaBusca =  async () => {
    const linha = 8000;
    try{
        const response = await api.get('/Linha/Buscar', {params :{termosBusca: linha}});
        console.log("Sucesso");
        return (response.data);
    }catch(error){
        console.error('Erro na autenticação:', error);
        throw error;
    }

};
export const buscaGeral = async (buscaTermo='') =>{
    const busca = buscaTermo || '';
    try{ 
        const response = await api.get('/Parada/Buscar', {params: {termosBusca: busca }})
        console.log("OK")
        console.log(JSON.stringify(response.data, null, 2))
        return(response.data);
    }
    catch(error){
        console.error("erro ao buscar", error)
    }
};