import { Controller } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';

interface FieldProps {
    control: any; // O controle do formulário
    errors: any; // Erros de validação
    name: string; // Nome do campo
    Title: string; // Rótulo do campo
    placeholder: string; // Placeholder do campo
    tipo: string; // Tipo do campo (email, senha, etc.)
}

const Field: React.FC<FieldProps> = ({ control, errors, name, Title, placeholder, tipo }) => {
    return (
        <View>
            <Text>{Title}</Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder={placeholder}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value || ""}
                        keyboardType={tipo === 'email' ? 'email-address' : 'default'}
                        secureTextEntry={tipo === 'senha'}
                    />
                )}
            />
            {errors[name] && (
                <Text style={{ color: 'red' }}>
                    {errors[name]?.message}
                </Text>
            )}
        </View>
    );
};

export default Field;
