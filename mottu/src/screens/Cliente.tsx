import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';

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
  const navigation = useNavigation();

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
    if (!nome || !email || !cpf || !logradouro) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (!/^\d+$/.test(cpf)) {
      Alert.alert('Erro', 'O CPF deve conter apenas números!');
      return;
    }

    const newCliente = { id: Date.now().toString(), nome, email, cpf, logradouro };
    const updatedClientes = [...clientes, newCliente];
    setClientes(updatedClientes);
    await AsyncStorage.setItem('clientes', JSON.stringify(updatedClientes));

    handleClearFields();
  };

  const handleClearFields = () => {
    setNome('');
    setEmail('');
    setCpf('');
    setLogradouro('');
  };

  const handleDeleteClient = async (id: string) => {
    const updatedClientes = clientes.filter(client => client.id !== id);
    setClientes(updatedClientes);
    await AsyncStorage.setItem('clientes', JSON.stringify(updatedClientes));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flexContainer}
      >
        <Header />
        
        <ScrollView style={styles.formContainer} keyboardShouldPersistTaps="handled">
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#ccc"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF (somente números)"
            placeholderTextColor="#ccc"
            value={cpf}
            onChangeText={text => setCpf(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Logradouro"
            placeholderTextColor="#ccc"
            value={logradouro}
            onChangeText={setLogradouro}
          />

          <TouchableOpacity style={styles.button} onPress={handleAddClient}>
            <Text style={styles.buttonText}>Adicionar Cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={handleClearFields}>
            <Text style={styles.buttonText}>Limpar Campos</Text>
          </TouchableOpacity>

          {/* Quebra de linha visível */}
          <View style={{ height: 20 }} />
        

        {/* FlatList fica separada e ocupa espaço restante */}
        <View style={styles.listContainer}>
          <FlatList
            data={clientes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemText}>Nome: {item.nome}</Text>
                  <Text style={styles.itemText}>Email: {item.email}</Text>
                  <Text style={styles.itemText}>CPF: {item.cpf}</Text>
                  <Text style={styles.itemText}>Logradouro: {item.logradouro}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteClient(item.id)}>
                  <Ionicons name="trash-bin" size={24} color="#FF4D4D" />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={<Text style={styles.empty}>Nenhum cliente cadastrado.</Text>}
          />
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Voltar à Home</Text>
        </TouchableOpacity>
            </ScrollView>
        <Footer />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  flexContainer: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  input: {
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#00FF88',
  },
  button: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00FF88',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00FF88',
    marginHorizontal: 24,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  item: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#00FF88',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  empty: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
