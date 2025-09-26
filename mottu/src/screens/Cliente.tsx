import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { Cliente } from '../models/cliente';
import {
  getClientes,
  addCliente,
  updateCliente,
  deleteCliente,
} from '../api/cliente';
import { useTheme } from '../context/ThemeContext';

export default function ClienteScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nm_cliente, setNmCliente] = useState('');        // NM_CLIENTE
  const [nm_email, setNmEmail] = useState('');            // NM_EMAIL
  const [nr_cpf, setNrCpf] = useState('');                // NR_CPF
  const [id_logradouro, setIdLogradouro] = useState('');  // ID_LOGRADOURO (opcional)
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | number | null>(null); // ID_CLIENTE

  // Buscar clientes da API
  const fetchData = async () => {
    setLoading(true);
    try {
      const rows = await getClientes();
      const data = Array.isArray(rows) ? rows : (rows?.data ?? []);
      setClientes(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os clientes.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validarEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validarCPF = (value: string) => /^\d{11}$/.test(value.replace(/\D/g, ''));

  const handleSave = async () => {
    if (!nm_cliente || !nm_email || !nr_cpf) {
      Alert.alert('Erro', 'Preencha Nome, Email e CPF!');
      return;
    }
    if (!validarEmail(nm_email)) {
      Alert.alert('Erro', 'Digite um e-mail válido!');
      return;
    }
    const cpfDigits = nr_cpf.replace(/\D/g, '');
    if (!validarCPF(cpfDigits)) {
      Alert.alert('Erro', 'CPF deve ter 11 dígitos.');
      return;
    }

    const payload: Cliente = {
      id_cliente: editId ?? undefined,
      id_logradouro: id_logradouro ? Number(id_logradouro) : undefined,
      nm_cliente,
      nm_email,
      nr_cpf: cpfDigits,
    };

    try {
      if (editId !== null && editId !== undefined) {
        await updateCliente(payload); // sua função deve aceitar snake_case
        Alert.alert('Sucesso', 'Cliente atualizado!');
      } else {
        await addCliente(payload);
        Alert.alert('Sucesso', 'Cliente criado!');
      }
      fetchData();
      handleClearFields();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  };

  const handleClearFields = () => {
    setNmCliente('');
    setNmEmail('');
    setNrCpf('');
    setIdLogradouro('');
    setEditId(null);
  };

  const handleDeleteClient = (id_cliente: string | number) => {
    Alert.alert('Confirmação', 'Deseja realmente excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            // ajuste sua função para receber o id direto
            await deleteCliente(String(id_cliente));
            Alert.alert('Sucesso', 'Cliente excluído!');
            fetchData();
          } catch (error) {
            console.error("deleteCliente", error)
            Alert.alert('Erro', 'Não foi possível excluir.');
          }
        },
      },
    ]);
  };

  const handleEdit = (item: Cliente) => {
    setEditId(item.id_cliente ?? null);
    setNmCliente(item.nm_cliente);
    setNmEmail(item.nm_email);
    setNrCpf(item.nr_cpf);
    setIdLogradouro(item.id_logradouro ? String(item.id_logradouro) : '');
  };

  const renderItem = ({ item }: { item: Cliente }) => (
    <View
      style={[
        styles.item,
        { backgroundColor: theme.background, borderColor: theme.primary },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.itemText, { color: theme.text }]}>
          {item.nm_cliente}
        </Text>
        <Text style={[styles.itemText, { color: theme.text }]}>{item.nm_email}</Text>
        <Text style={[styles.itemText, { color: theme.text }]}>
          CPF: {item.nr_cpf}
        </Text>
        {item.id_logradouro ? (
          <Text style={[styles.itemText, { color: theme.text }]}>
            Logradouro ID: {item.id_logradouro}
          </Text>
        ) : null}
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Ionicons name="create-outline" size={24} color={theme.primary} />
        </TouchableOpacity>
        {item.id_cliente !== undefined && item.id_cliente !== null && (
          <TouchableOpacity onPress={() => handleDeleteClient(item.id_cliente!)}>
            <Ionicons name="trash-bin-outline" size={24} color="#FF4D4D" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flexContainer}
      >
        <Header />

        <FlatList
          data={clientes}
          keyExtractor={(item) => String(item.id_cliente ?? Math.random())}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 24 }}
          ListHeaderComponent={
            <>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.primary, color: theme.text },
                ]}
                placeholder="Nome (NM_CLIENTE)"
                placeholderTextColor="#888"
                value={nm_cliente}
                onChangeText={setNmCliente}
              />

              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.primary, color: theme.text },
                ]}
                placeholder="Email (NM_EMAIL)"
                placeholderTextColor="#888"
                value={nm_email}
                onChangeText={setNmEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.primary, color: theme.text },
                ]}
                placeholder="CPF - NR_CPF (somente números)"
                placeholderTextColor="#888"
                value={nr_cpf}
                onChangeText={setNrCpf}
                keyboardType="number-pad"
                maxLength={14}
              />

              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.primary, color: theme.text },
                ]}
                placeholder="ID_LOGRADOURO (opcional)"
                placeholderTextColor="#888"
                value={id_logradouro}
                onChangeText={setIdLogradouro}
                keyboardType="number-pad"
              />

              <TouchableOpacity
                style={[styles.button, { borderColor: theme.primary }]}
                onPress={handleSave}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>
                  {editId ? 'Atualizar Cliente' : 'Adicionar Cliente'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.clearButton, { borderColor: '#888' }]}
                onPress={handleClearFields}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>
                  Limpar Campos
                </Text>
              </TouchableOpacity>

              {loading && (
                <ActivityIndicator
                  size="large"
                  color={theme.primary}
                  style={{ marginVertical: 20 }}
                />
              )}
            </>
          }
          ListEmptyComponent={
            clientes.length === 0 && !loading ? (
              <Text style={[styles.empty, { color: theme.text }]}>
                Nenhum cliente cadastrado.
              </Text>
            ) : null
          }
          ListFooterComponent={
            <TouchableOpacity
              style={[styles.backButton, { borderColor: theme.primary }]}
              onPress={() => navigation.navigate('Home')}
            >
              <Ionicons name="arrow-back-outline" size={20} color={theme.text} />
              <Text style={[styles.buttonText, { color: theme.text }]}>
                Voltar ao Home
              </Text>
            </TouchableOpacity>
          }
        />

        <Footer />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flexContainer: { flex: 1 },
  input: {
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 10,
  },
  clearButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 20,
  },
  backButton: {
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: { fontSize: 16, fontWeight: '600' },
  item: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: { fontSize: 14 },
  empty: { textAlign: 'center', marginTop: 20 },
});
