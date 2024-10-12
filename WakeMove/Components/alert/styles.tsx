import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }, 
    alertContainer: {
        width: 300,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white', 
        elevation: 5,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4, 
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10, 
    },
    message: {
        fontSize: 16,
        marginBottom: 20, 
    },
    button: {
        alignSelf: 'flex-end', 
        backgroundColor: '#007bff', 
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white', 
        fontWeight: 'bold', 
    },
});