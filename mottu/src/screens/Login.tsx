// src/screens/Login.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';

export default function Login({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email === 'teste@teste.com' && password === '000000') {
            // Salvar os dados do login no AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify({ email }));
            navigation.navigate('Home');
        } else {
            alert('Credenciais inválidas');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />
                
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1c1c1e', // Fundo escuro para a página
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#00FF88', // Cor verde para destaque
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 16,
        color: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00FF88', // Cor de destaque para o botão
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
