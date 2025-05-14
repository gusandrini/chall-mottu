import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
};

export default function Moto({ navigation }) {
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

    const validarPlaca = (placa: string) => {
        const regex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i;
        return regex.test(placa);
    };

    const handleAddMoto = async () => {
        if (!modelo || !filial || !departamento || !placa || !status || !kmRodado) {
            Alert.alert('Erro', 'Preencha todos os campos antes de adicionar.');
            return;
        }

        if (!validarPlaca(placa)) {
            Alert.alert('Erro', 'A placa deve estar no formato correto (ex: ABC1234 ou ABC1D23).');
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

    const handleDelete = async (id: string) => {
        const updatedMotos = motos.filter((moto) => moto.id !== id);
        setMotos(updatedMotos);
        await AsyncStorage.setItem('motos', JSON.stringify(updatedMotos));
    };

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.title}>Cadastro de Motos</Text>

            <Text style={styles.label}>Modelo</Text>
            <View style={styles.inputContainer}>
                <Ionicons name="construct" size={20} color="#00FF88" />
                <Picker
                    selectedValue={modelo}
                    onValueChange={(itemValue) => setModelo(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#00FF88"
                >
                    <Picker.Item label="Mottu Pop" value="Mottu Pop" />
                    <Picker.Item label="Mottu Sport" value="Mottu Sport" />
                </Picker>
            </View>

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

            <View style={styles.inputContainer}>
                <Ionicons name="ios-car" size={20} color="#00FF88" />
                <TextInput
                    style={styles.input}
                    placeholder="Placa (ABC1234)"
                    placeholderTextColor="#aaa"
                    autoCapitalize="characters"
                    value={placa}
                    onChangeText={setPlaca}
                />
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="shield-checkmark" size={20} color="#00FF88" />
                <TextInput
                    style={styles.input}
                    placeholder="Status"
                    placeholderTextColor="#aaa"
                    value={status}
                    onChangeText={setStatus}
                />
            </View>

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
                    <View style={styles.item}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>{item.modelo} - {item.placa}</Text>
                            <Text style={styles.itemDetail}><Ionicons name="business" size={16} color="#00FF88" /> {item.filial}</Text>
                            <Text style={styles.itemDetail}><Ionicons name="people" size={16} color="#00FF88" /> {item.departamento}</Text>
                            <Text style={styles.itemDetail}><Ionicons name="shield-checkmark" size={16} color="#00FF88" /> {item.status}</Text>
                            <Text style={styles.itemDetail}><Ionicons name="speedometer" size={16} color="#00FF88" /> {item.kmRodado}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Ionicons name="trash" size={24} color="#FF5C5C" />
                        </TouchableOpacity>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="arrow-back-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.buttonText}>Voltar ao Home</Text>
            </TouchableOpacity>

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1c1c1e',
    },
    title: {
        fontSize: 22,
        color: '#00FF88',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#00FF88',
        borderRadius: 8,
        paddingLeft: 10,
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 8,
        color: '#fff',
        fontSize: 16,
    },
    picker: {
        flex: 1,
        height: 40,
        color: '#fff',
        backgroundColor: 'transparent',
        marginLeft: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00FF88',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        backgroundColor: '#2b2b2e',
        borderRadius: 10,
    },
    itemInfo: {
        flex: 1,
        paddingRight: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00FF88',
        marginBottom: 4,
    },
    itemDetail: {
        color: '#eee',
        fontSize: 14,
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
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
        marginTop: 16,
    },
});
