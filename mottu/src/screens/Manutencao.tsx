import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // Importando ícones

import Header from '../components/Header';
import Footer from '../components/Footer';

type Manutencao = {
    id: string;
    motoId: string;
    status: string;
    dataEntrada: string;
    dataSaida: string | null;
};

export default function Manutencao({ navigation }: any) {
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

    const isValidId = (id: string) => {
        const regex = /^[0-9]+$/; // Verifica se o ID contém apenas números
        return regex.test(id);
    };

    const isValidDate = (date: string) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate); // Verifica se a data é válida
    };

    const handleAddManutencao = async () => {
        if (!isValidId(motoId)) {
            Alert.alert("Erro", "ID da moto deve ser um número válido.");
            return;
        }
        if (!isValidDate(dataEntrada)) {
            Alert.alert("Erro", "Data de entrada deve ser uma data válida.");
            return;
        }
        if (dataSaida && !isValidDate(dataSaida)) {
            Alert.alert("Erro", "Data de saída deve ser uma data válida.");
            return;
        }

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

    const handleDeleteManutencao = async (id: string) => {
        const updatedManutencoes = manutencoes.filter((item) => item.id !== id);
        setManutencoes(updatedManutencoes);
        await AsyncStorage.setItem('manutencoes', JSON.stringify(updatedManutencoes));
    };

    const renderItem = ({ item }: { item: Manutencao }) => (
        <View style={styles.item}>
            <View style={styles.itemDetails}>
                <Text style={styles.itemText}>ID da Moto:</Text>
                <Text style={styles.itemValue}>{item.motoId}</Text>
            </View>

            <View style={styles.itemDetails}>
                <Text style={styles.itemText}>Status:</Text>
                <Text style={styles.itemValue}>{item.status}</Text>
            </View>

            <View style={styles.itemDetails}>
                <Text style={styles.itemText}>Data de Entrada:</Text>
                <Text style={styles.itemValue}>{item.dataEntrada}</Text>
            </View>

            <View style={styles.itemDetails}>
                <Text style={styles.itemText}>Data de Saída:</Text>
                <Text style={styles.itemValue}>{item.dataSaida || 'N/A'}</Text>
            </View>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteManutencao(item.id)}
            >
                <Ionicons name="trash-bin" size={24} color="#FF4D4D" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header />
            <View style={styles.container}>
                <Text style={styles.title}>Adicionar Manutenção</Text>

                <TextInput
                    style={styles.input}
                    placeholder="ID da Moto"
                    value={motoId}
                    onChangeText={setMotoId}
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Status"
                    value={status}
                    onChangeText={setStatus}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Data de Entrada"
                    value={dataEntrada}
                    onChangeText={setDataEntrada}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Data de Saída (opcional)"
                    value={dataSaida}
                    onChangeText={setDataSaida}
                    placeholderTextColor="#888"
                />

                <TouchableOpacity style={styles.button} onPress={handleAddManutencao}>
                    <Text style={styles.buttonText}>Adicionar Manutenção</Text>
                </TouchableOpacity>

                <FlatList
                    data={manutencoes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="arrow-back-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Voltar ao Home</Text>
                </TouchableOpacity>
            </View>
            <Footer />
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
        padding: 32,
        flexGrow: 1, // Garantir que o conteúdo ocupe o espaço disponível
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
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#888',
        marginBottom: 12,
        backgroundColor: '#222',
        borderRadius: 8,
        position: 'relative', // Permite posicionar o botão de delete de forma centralizada
    },
    itemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    itemValue: {
        fontWeight: 'bold',
        color: '#00FF88',
    },
    deleteButton: {
        alignItems: 'center'
    },
    backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#00FF88',
  },
});
