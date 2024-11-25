import React, { useState } from 'react';
import { View, ActivityIndicator, Alert } from "react-native";
import { CustomTitle } from '@/Components/Atomo/Title';
import { ImgIndex } from '@/Components/Atomo/imgIndex';
import { StackNavigationProp } from "@react-navigation/stack";
import NavButton from "@/Components/Atomo/navButton";
import { styles } from "@/Components/Atomo/navButton/styles"; 
import { Container } from '@/Components/Atomo/container/index';
import { SearchView } from "@/Components/molecula/SeacrhView/index";
import { Warning } from "@/Components/Atomo/Cadastrar";
import { NewModal } from '@/Components/Atomo/modal';
import { useCurrentAddress } from "@/API/Context/AddressContext";
import { useAuth } from '@/data/userAuth/userCad';
import { BackButton } from '@/Components/Atomo/backButton';
import { Btn } from '@/Components/Atomo/Button/index';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";

const reverseGeocodeLocation = async (latitude: number, longitude: number): Promise<string | null> => {
    const GOOGLE_MAPS_API_KEY = "AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY";
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return data.results[0].formatted_address;
        }
        return null;
    } catch (error) {
        console.error("Erro na geocodificação reversa:", error);
        return null;
    }
};

interface TestScreenProps {
    navigation: StackNavigationProp<any>;
}

const TestScreen: React.FC<TestScreenProps> = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); 
    const { setCurrentAddress, currentAddress } = useCurrentAddress();
    const { user } = useAuth();

    const closeModal = () => {
        setModalVisible(false);
    };

    const confirmModal = () => {
        setModalVisible(false);
        navigation.navigate("Navigation");
  
    };


    const handleUseLocation = async () => {
        setLoading(true);
        try {
            const { granted } = await requestForegroundPermissionsAsync();
            if (!granted) {
                Alert.alert("Erro", "Permissão de localização negada.");
                return;
            }

            const currentPosition = await getCurrentPositionAsync();
            const { latitude, longitude } = currentPosition.coords;

            console.log("Latitude:", latitude, "Longitude:", longitude);

            const address = await reverseGeocodeLocation(latitude, longitude);
            if (address) {
                console.log("Novo endereço:", address);
                setCurrentAddress(address);
                Alert.alert("Localização Atualizada", `Endereço: ${address}`);
            } else {
                Alert.alert("Erro", "Não foi possível obter o endereço.");
            }
        } catch (error) {
            console.error("Erro ao obter localização:", error);
            Alert.alert("Erro", "Não foi possível obter a localização.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            {!loading && (
                <>
                    <NewModal
                        visible={modalVisible}
                        title={`Confirmar seu endereço para: ${currentAddress || "endereço desconhecido"}`}
                        navigation={navigation}
                        wayBack={closeModal}
                        wayOut={confirmModal}
                    />

                    <View style={{ position: "absolute", top: 20, left: 10 }}>
                        <BackButton caminho="Home" navigation={navigation} />
                    </View>

                    <Container>
                        <CustomTitle>Ponto de Partida</CustomTitle>
                        <ImgIndex />
                        <SearchView
                            page="Current"
                            param={() => setModalVisible(true)}
                        />
                        {user ? (
                            <NavButton
                                style={styles.btn}
                                caminho="Favorite"
                                label="Favoritos"
                                navigation={navigation}
                            />
                        ) : (
                            <>
                                <Warning />
                                <NavButton
                                    style={styles.btn}
                                    caminho="Cadastro"
                                    label="Cadastro"
                                    navigation={navigation}
                                />
                            </>
                        )}
                        <View>
                            <Btn
                                title="Usar Localização Atual"
                                onPress={handleUseLocation}
                            />
                        </View>
                    </Container>
                </>
            )}
        </View>
    );
};

export default TestScreen;
