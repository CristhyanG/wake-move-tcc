import {Controller} from 'react-hook-form';
import {View,Text,TextInput } from 'react-native';
// import {yupResolver} from '@hookform/resolvers/yup';

interface FieldProps {
    control: any,
    errors: any,
    Title:string,
    Name: string,
    PlaceHolder: string,
    tipo: any;
} 

const Field: React.FC<FieldProps> = ({ control, errors, Name, Title, PlaceHolder, tipo }) => {

    return (
        <View>
            <Text >{Title}</Text>      
            <Controller 
            control={control} //user form => linha 9
            name={Name} 
            render={({ field: {onChange, onBlur, value} }) => (
                <TextInput
                // style={styles.input}
                placeholder={PlaceHolder}
                onChangeText={onChange} //troca os use state por prop da renderização
                onBlur={onBlur} //chamado quando o text input é trocado
                value={value || ""} //troca valor de estado por valor de propriedade
                keyboardType={tipo}
                
                />
            )}
            />
            {errors.email && <Text /*style={styles.labelErrors}*/ > {errors.email?.message} </Text>}
        </View>
    )
}

export default Field;