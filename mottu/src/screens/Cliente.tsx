// src/screens/Cliente.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

type Cliente = {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    logradouro: string;
};

export default function Cliente() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [logradouro, setLogradouro] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const storedClientes = await AsyncStorage.getItem('clientes');
            if (storedClientes) {
                setClientes(JSON.parse(storedClientes));
            }
        };
        loadData();
    }, []);

    const handleAddClient = async () => {
        const newCliente = { id: Date.now().toString(), nome, email, cpf, logradouro };
        const updatedClientes = [...clientes, newCliente];
        setClientes(updatedClientes);
        await AsyncStorage.setItem('clientes', JSON.stringify(updatedClientes));
        setNome('');
        setEmail('');
        setCpf('');
        setLogradouro('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
            />
            <TextInput
                style={styles.input}
                placeholder="Logradouro"
                value={logradouro}
                onChangeText={setLogradouro}
            />
            <Button title="Adicionar Cliente" onPress={handleAddClient} />
            <FlatList
                data={clientes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.nome}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.cpf}</Text>
                        <Text>{item.logradouro}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});
