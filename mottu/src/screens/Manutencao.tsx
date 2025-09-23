import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  getManutencoes,
  addManutencao,
  updateManutencao,
  deleteManutencao,
} from '../api/manutencao';

import { Manutencao } from '../models/manutencao';
import { useTheme } from '../context/ThemeContext';

export default function ManutencaoScreen({ navigation }: any) {
  const { theme } = useTheme();

  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [descricao, setDescricao] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [idMoto, setIdMoto] = useState('');

  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // 🔹 Buscar dados
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getManutencoes();
      setManutencoes(response.data || []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as manutenções.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Salvar ou atualizar
  const handleSave = async () => {
    if (!descricao || !dataEntrada || !idMoto) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios.');
      return;
    }

    const payload: Manutencao = {
      idManutencao: editId ?? 0,
      moto: { idMoto: parseInt(idMoto, 10) },
      dsManutencao: descricao,
      dtEntrada: dataEntrada,
      dtSaida: dataSaida || undefined,
    };

    try {
      if (editId) {
        await updateManutencao(payload);
        Alert.alert('Sucesso', 'Manutenção atualizada!');
      } else {
        await addManutencao(payload);
        Alert.alert('Sucesso', 'Manutenção criada!');
      }
      fetchData();
      resetForm();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  };

  // 🔹 Excluir
  const handleDelete = (idManutencao: number) => {
    Alert.alert('Confirmação', 'Deseja realmente excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteManutencao(idManutencao);
            Alert.alert('Sucesso', 'Manutenção excluída!');
            fetchData();
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir.');
          }
        },
      },
    ]);
  };

  // 🔹 Editar
  const handleEdit = (item: Manutencao) => {
    setEditId(item.idManutencao);
    setDescricao(item.dsManutencao);
    setDataEntrada(item.dtEntrada);
    setDataSaida(item.dtSaida ?? '');
    setIdMoto(item.moto?.idMoto?.toString() ?? '');
  };

  const resetForm = () => {
    setDescricao('');
    setDataEntrada('');
    setDataSaida('');
    setIdMoto('');
    setEditId(null);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Formulário */}
        <Text style={[styles.title, { color: theme.text }]}>
          {editId ? 'Editar Manutenção' : 'Adicionar Manutenção'}
        </Text>

        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder="ID da Moto"
          value={idMoto}
          onChangeText={setIdMoto}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          placeholderTextColor="#888"
        />
        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder="Data Entrada (YYYY-MM-DD)"
          value={dataEntrada}
          onChangeText={setDataEntrada}
          placeholderTextColor="#888"
        />
        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder="Data Saída (YYYY-MM-DD)"
          value={dataSaida}
          onChangeText={setDataSaida}
          placeholderTextColor="#888"
        />

        <TouchableOpacity
          style={[styles.button, { borderColor: theme.primary }]}
          onPress={handleSave}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>
            {editId ? 'Atualizar' : 'Adicionar'}
          </Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />
        ) : (
          manutencoes.map((item) => (
            <View
              key={item.idManutencao}
              style={[styles.item, { backgroundColor: theme.background, borderColor: theme.primary }]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.itemValue, { color: theme.primary }]}>
                  {item.dsManutencao}
                </Text>
                <Text style={[styles.itemText, { color: theme.text }]}>
                  Moto: {item.moto?.idMoto}
                </Text>
                <Text style={[styles.itemText, { color: theme.text }]}>
                  Entrada: {item.dtEntrada}
                </Text>
                <Text style={[styles.itemText, { color: theme.text }]}>
                  Saída: {item.dtSaida ?? 'Em aberto'}
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Ionicons name="create-outline" size={22} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.idManutencao)}>
                  <Ionicons name="trash-bin" size={22} color="#FF4D4D" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Botão voltar */}
        <TouchableOpacity
          style={[styles.backButton, { borderColor: theme.primary }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back-outline" size={20} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>Voltar ao Home</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  button: {
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { fontSize: 16, fontWeight: '600' },
  item: {
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemText: { fontSize: 14, marginBottom: 2, flexShrink: 1 },
  itemValue: { fontWeight: 'bold', fontSize: 15, marginBottom: 4 },
  actions: { flexDirection: 'row', gap: 12, marginLeft: 10 },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    marginTop: 20,
  },
});
