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
import Ionicons from 'react-native-vector-icons/Ionicons';

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

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const limparCpf = (cpf: string) => {
    return cpf.replace(/\D/g, '');
  };

  const handleAddClient = async () => {
    if (!nome || !email || !cpf || !logradouro) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Digite um e-mail válido!');
      return;
    }

    const cpfLimpo = limparCpf(cpf);
    if (cpfLimpo.length !== 11) {
      Alert.alert('Erro', 'O CPF deve conter 11 dígitos!');
      return;
    }

    const newCliente = {
      id: Date.now().toString(),
      nome,
      email,
      cpf: cpfLimpo,
      logradouro,
    };
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
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#00FF88" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#ccc"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#00FF88" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="card-outline" size={20} color="#00FF88" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              placeholderTextColor="#ccc"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#00FF88" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Logradouro"
              placeholderTextColor="#ccc"
              value={logradouro}
              onChangeText={setLogradouro}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleAddClient}>
            <Ionicons name="person-add-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Adicionar Cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={handleClearFields}>
            <Ionicons name="refresh-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Limpar Campos</Text>
          </TouchableOpacity>

          <View style={{ height: 20 }} />

          <View style={styles.listContainer}>
            <FlatList
              data={clientes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemText}><Ionicons name="person-outline" size={20} color="#00FF88" style={styles.icon} /> {item.nome}</Text>
                    <Text style={styles.itemText}><Ionicons name="mail-outline" size={20} color="#00FF88" style={styles.icon} /> {item.email}</Text>
                    <Text style={styles.itemText}><Ionicons name="card-outline" size={20} color="#00FF88" style={styles.icon} /> {item.cpf}</Text>
                    <Text style={styles.itemText}><Ionicons name="location-outline" size={20} color="#00FF88" style={styles.icon} /> {item.logradouro}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDeleteClient(item.id)}>
                    <Ionicons name="trash-bin-outline" size={24} color="#FF4D4D" />
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
              ListEmptyComponent={<Text style={styles.empty}>Nenhum cliente cadastrado.</Text>}
            />
          </View>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back-outline" size={20} color="#fff" />
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#00FF88',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#00FF88',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
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
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
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
