import { StyleSheet } from "react-native"; 

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 10, // Margin para o border shadow
        marginTop: 30,
        backgroundColor: '#f8f8f8', // Fundo dentro da border shadow 
        borderRadius: 10,   
        shadowColor: '#000',    // Cor da borda shadow
        shadowOpacity: 0.1, 
        shadowRadius: 5,    
        elevation: 3, // Efeito de impressão da borda
      },
})
