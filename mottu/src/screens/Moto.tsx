// src/screens/Moto.tsx
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

type Moto = {
    id: string;
    modelo: string;
    filial: string;
    departamento: string;
    placa: string;
    status: string;
    kmRodado: number;
};

export default function Moto() {
    const [motos, setMotos] = useState<Moto[]>([]);
    const [modelo, setModelo] = useState('Mottu Pop');
    const [filial, setFilial] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [placa, setPlaca] = useState('');
    const [status, setStatus] = useState('');
    const [kmRodado, setKmRodado] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            const storedMotos = await AsyncStorage.getItem('motos');
            if (storedMotos) {
                setMotos(JSON.parse(storedMotos));
            }
        };
        loadData();
    }, []);

    const handleAddMoto = async () => {
        const newMoto: Moto = {
            id: Date.now().toString(),
            modelo,
            filial,
            departamento,
            placa,
            status,
            kmRodado,
        };
        const updatedMotos = [...motos, newMoto];
        setMotos(updatedMotos);
        await AsyncStorage.setItem('motos', JSON.stringify(updatedMotos));
        setModelo('Mottu Pop');
        setFilial('');
        setDepartamento('');
        setPlaca('');
        setStatus('');
        setKmRodado(0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Modelo</Text>
            <Picker
                selectedValue={modelo}
                onValueChange={(itemValue) => setModelo(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Mottu Pop" value="Mottu Pop" />
                <Picker.Item label="Mottu Sport" value="Mottu Sport" />
            </Picker>

            <TextInput
                style={styles.input}
                placeholder="Filial"
                value={filial}
                onChangeText={setFilial}
            />
            <TextInput
                style={styles.input}
                placeholder="Departamento"
                value={departamento}
                onChangeText={setDepartamento}
            />
            <TextInput
                style={styles.input}
                placeholder="Placa"
                value={placa}
                onChangeText={setPlaca}
            />
            <TextInput
                style={styles.input}
                placeholder="Status"
                value={status}
                onChangeText={setStatus}
            />
            <TextInput
                style={styles.input}
                placeholder="Km Rodado"
                keyboardType="numeric"
                value={kmRodado.toString()}
                onChangeText={(text) => setKmRodado(Number(text))}
            />
            <Button title="Adicionar Moto" onPress={handleAddMoto} />
            
            <FlatList
                data={motos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.modelo}</Text>
                        <Text>{item.placa}</Text>
                        <Text>{item.status}</Text>
                        <Text>{item.kmRodado} km</Text>
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
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        justifyContent: 'center',
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});
