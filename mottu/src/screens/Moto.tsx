import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    Modal,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Moto = {
    id: string;
    modelo: string;
    filial: string;
    departamento: string;
    placa: string;
    status: string;
    kmRodado: number;
    cordX: string;
    cordY: string;
};

export default function Moto({ navigation }) {
    const [motos, setMotos] = useState<Moto[]>([]);
    const [modelo, setModelo] = useState('Mottu Pop');
    const [filial, setFilial] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [placa, setPlaca] = useState('');
    const [status, setStatus] = useState('');
    const [kmRodado, setKmRodado] = useState(0);
    const [cordX, setCordX] = useState('');
    const [cordY, setCordY] = useState('');

    // Estados para controlar a exibição dos modais
    const [showModeloModal, setShowModeloModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);

    const modelosDisponiveis = ['Mottu Pop', 'Mottu Sport'];
    const statusDisponiveis = ['Disponível', 'Em Uso', 'Manutenção'];

    useEffect(() => {
        const loadData = async () => {
            const storedMotos = await AsyncStorage.getItem('motos');
            if (storedMotos) {
                setMotos(JSON.parse(storedMotos));
            }
        };
        loadData();
    }, []);

    const validarPlaca = (placa: string) => {
        const regex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i;
        return regex.test(placa);
    };

    const handleAddMoto = async () => {
        if (
            !modelo ||
            !filial ||
            !departamento ||
            !placa ||
            !status ||
            !kmRodado ||
            !cordX ||
            !cordY
        ) {
            Alert.alert('Erro', 'Preencha todos os campos antes de adicionar.');
            return;
        }

        if (!validarPlaca(placa)) {
            Alert.alert(
                'Erro',
                'A placa deve estar no formato correto (ex: ABC1234 ou ABC1D23).'
            );
            return;
        }

        const newMoto: Moto = {
            id: Date.now().toString(),
            modelo,
            filial,
            departamento,
            placa: placa.toUpperCase(),
            status,
            kmRodado,
            cordX,
            cordY,
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
        setCordX('');
        setCordY('');
        Alert.alert('Sucesso', 'Moto adicionada com sucesso!');
    };

    const handleDelete = async (id: string) => {
        const updatedMotos = motos.filter((moto) => moto.id !== id);
        setMotos(updatedMotos);
        await AsyncStorage.setItem('motos', JSON.stringify(updatedMotos));
    };

    return (
        <View style={styles.container}>
            <Header />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Cadastro de Motos</Text>

                {/* Modelo com Modal */}
                <View style={styles.inputContainer}>
                    <Ionicons name="construct" size={20} color="#00FF88" />
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setShowModeloModal(true)}
                    >
                        <Text style={{ color: '#fff', fontSize: 16 }}>
                            {modelo || 'Selecione o modelo'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Modal Modelo */}
                <Modal
                    visible={showModeloModal}
                    animationType="slide"
                    transparent
                    onRequestClose={() => setShowModeloModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {modelosDisponiveis.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setModelo(item);
                                        setShowModeloModal(false);
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 16 }}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity onPress={() => setShowModeloModal(false)}>
                                <Text
                                    style={{ color: '#FF5C5C', textAlign: 'center', marginTop: 10 }}
                                >
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Filial */}
                <View style={styles.inputContainer}>
                    <Ionicons name="business" size={20} color="#00FF88" />
                    <TextInput
                        style={styles.input}
                        placeholder="Filial"
                        placeholderTextColor="#aaa"
                        value={filial}
                        onChangeText={setFilial}
                    />
                </View>

                {/* Departamento */}
                <View style={styles.inputContainer}>
                    <Ionicons name="people" size={20} color="#00FF88" />
                    <TextInput
                        style={styles.input}
                        placeholder="Departamento"
                        placeholderTextColor="#aaa"
                        value={departamento}
                        onChangeText={setDepartamento}
                    />
                </View>

                {/* Placa */}
                <View style={styles.inputContainer}>
                    <Ionicons name="list" size={20} color="#00FF88" />
                    <TextInput
                        style={styles.input}
                        placeholder="Placa (ABC1234)"
                        placeholderTextColor="#aaa"
                        autoCapitalize="characters"
                        value={placa}
                        onChangeText={setPlaca}
                    />
                </View>

                {/* Status com Modal */}
                <View style={styles.inputContainer}>
                    <Ionicons name="shield-checkmark" size={20} color="#00FF88" />
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setShowStatusModal(true)}
                    >
                        <Text style={{ color: '#fff', fontSize: 16 }}>
                            {status || 'Selecione o status'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Modal Status */}
                <Modal
                    visible={showStatusModal}
                    animationType="slide"
                    transparent
                    onRequestClose={() => setShowStatusModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {statusDisponiveis.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setStatus(item);
                                        setShowStatusModal(false);
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 16 }}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity onPress={() => setShowStatusModal(false)}>
                                <Text
                                    style={{ color: '#FF5C5C', textAlign: 'center', marginTop: 10 }}
                                >
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Km Rodado */}
                <View style={styles.inputContainer}>
                    <Ionicons name="speedometer" size={20} color="#00FF88" />
                    <TextInput
                        style={styles.input}
                        placeholder="Km Rodado"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        value={kmRodado.toString()}
                        onChangeText={(text) => setKmRodado(Number(text))}
                    />
                </View>

                {/* Coordenadas X */}
                <View style={styles.inputContainer}>
                    <Ionicons name="location" size={20} color="#00FF88" />
                    <TextInput
                        style={styles.input}
                        placeholder="Coordenadas X"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        value={cordX.toString()}
                        onChangeText={setCordX}
                    />
                </View>

                {/* Coordenadas Y */}
                <View style={styles.inputContainer}>
                    <Ionicons name="location" size={20} color="#00FF88" />
                    <TextInput
                        style={styles.input}
                        placeholder="Coordenadas Y"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        value={cordY.toString()}
                        onChangeText={setCordY}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleAddMoto}>
                    <Text style={styles.buttonText}>Adicionar Moto</Text>
                </TouchableOpacity>



                {motos.length > 0 && (
                    <Text style={styles.sectionTitle}>Motos Cadastradas:</Text>
                )}

                <FlatList
                    data={motos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.motoItem}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.motoText}>
                                    <Ionicons name="construct" size={16} color="#00FF88" /> Modelo: {item.modelo}
                                </Text>
                                <Text style={styles.motoText}>
                                    <Ionicons name="list" size={16} color="#00FF88" /> Placa: {item.placa}
                                </Text>
                                <Text style={styles.motoText}>
                                    <Ionicons name="shield-checkmark" size={16} color="#00FF88" /> Status: {item.status}
                                </Text>
                                <Text style={styles.motoText}>
                                    <Ionicons name="speedometer" size={16} color="#00FF88" /> Km Rodado: {item.kmRodado}
                                </Text>
                                <Text style={styles.motoText}>
                                    <Ionicons name="location" size={16} color="#00FF88" /> Coordenadas: ({item.cordX}, {item.cordY})
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Ionicons name="trash-bin-outline" size={24} color="#FF4D4D" />
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="arrow-back-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Voltar ao Home</Text>
                </TouchableOpacity>
            </ScrollView>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00FF88',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    label: {
        color: '#00FF88',
        fontWeight: '600',
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#00FF88',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginVertical: 7,
        height: 40,
    },
    input: {
        flex: 1,
        color: '#fff',

        fontSize: 16,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#222',
        paddingVertical: 15,
        borderColor: '#00FF88',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    sectionTitle: {
        color: '#00FF88',
        fontSize: 22,
        fontWeight: '600',
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    motoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#111',
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 6,
        borderRadius: 8,
    },
    motoText: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
    },
    deleteButton: {
        backgroundColor: '#FF5C5C',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#1c1c1e',
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: '#00FF88',
    },
    modalItem: {
        paddingVertical: 12,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
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
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 15,
    },
});