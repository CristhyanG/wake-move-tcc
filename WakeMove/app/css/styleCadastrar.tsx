import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentContainer:{
        backgroundColor: "#a4a4a4",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentTitle:{
        marginBottom: 50
    },
    title:{
        fontSize: 30,
        fontWeight: 700,
        marginBottom: 10,
    },
    iconAvatar:{
        width: 150,
        height: 150,
        marginBottom: 50,
    },
    topic:{
        margin: 10,
        fontSize: 20
    },
    textInput:{
        padding: 13,
        backgroundColor: "#ededed",
        borderRadius: 10,
    }
})

export default styles;