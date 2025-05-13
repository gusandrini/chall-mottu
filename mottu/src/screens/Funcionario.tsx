// src/screens/Funcionario.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Funcionario() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loadUserData = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };
        loadUserData();
    }, []);

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.text}>Email: {user.email}</Text>
                    <Text style={styles.text}>Nome: Jonas</Text>
                    <Text style={styles.text}>CPF: 123.456.789-10</Text>
                    <Text style={styles.text}>Cargo: Técnico</Text>  
                    <Text style={styles.text}>Filial: Filial 1</Text> 
                </>
            ) : (
                <Text style={styles.text}>Carregando dados...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 12,
    },
});
