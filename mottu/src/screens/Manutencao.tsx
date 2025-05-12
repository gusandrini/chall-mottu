// src/screens/Manutencao.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

type Manutencao = {
    id: string;
    motoId: string;
    status: string;
    dataEntrada: string;
    dataSaida: string | null;
};

export default function Manutencao() {
    const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
    const [motoId, setMotoId] = useState('');
    const [status, setStatus] = useState('');
    const [dataEntrada, setDataEntrada] = useState('');
    const [dataSaida, setDataSaida] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const storedManutencoes = await AsyncStorage.getItem('manutencoes');
            if (storedManutencoes) {
                setManutencoes(JSON.parse(storedManutencoes));
            }
        };
        loadData();
    }, []);

    const handleAddManutencao = async () => {
        const newManutencao = {
            id: Date.now().toString(),
            motoId,
            status,
            dataEntrada,
            dataSaida,
        };
        const updatedManutencoes = [...manutencoes, newManutencao];
        setManutencoes(updatedManutencoes);
        await AsyncStorage.setItem('manutencoes', JSON.stringify(updatedManutencoes));
        setMotoId('');
        setStatus('');
        setDataEntrada('');
        setDataSaida('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="ID da Moto"
                value={motoId}
                onChangeText={setMotoId}
            />
            <TextInput
                style={styles.input}
                placeholder="Status"
                value={status}
                onChangeText={setStatus}
            />
            <TextInput
                style={styles.input}
                placeholder="Data de Entrada"
                value={dataEntrada}
                onChangeText={setDataEntrada}
            />
            <TextInput
                style={styles.input}
                placeholder="Data de Saída (opcional)"
                value={dataSaida}
                onChangeText={setDataSaida}
            />
            <Button title="Adicionar Manutenção" onPress={handleAddManutencao} />
            <FlatList
                data={manutencoes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{`ID Moto: ${item.motoId}`}</Text>
                        <Text>{`Status: ${item.status}`}</Text>
                        <Text>{`Entrada: ${item.dataEntrada}`}</Text>
                        <Text>{`Saída: ${item.dataSaida || 'N/A'}`}</Text>
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
