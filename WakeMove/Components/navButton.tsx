import { View, Pressable, Text, StyleSheet} from "react-native";
import {Link} from 'expo-router'

export default function NavButton({ caminho, label, onPress}){
    return(
        <View style={styles.btnContainer}>
            <Link href={caminho}>
                <Pressable >
                    <Text style={styles.btnLabel}>
                    {label}
                    </Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    btnContainer:{
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b2bff',
        borderRadius: 10,
        
    },
    btnLabel:{
        textAlign: 'center',
        color: '#fff'
    }
});