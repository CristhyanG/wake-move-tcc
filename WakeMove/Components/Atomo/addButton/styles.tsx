import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerAdd: {
        marginBottom: 20,
    },
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    btn: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        borderRadius: 20,
        marginRight: 10,
        minWidth: 250,
        maxWidth: 300,
        width: 250
    },
    textAdd: {
        fontSize: 18,
        color: '#333',
        margin: 5
    },
    btnDel: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DB4921',
        padding: 8,
        borderRadius: 50,
        marginBottom: 20


    },
    textDel: {
        color: "#f00",
    },

    btnEdit:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
        padding: 7,
        borderRadius: 50,
    }
});

