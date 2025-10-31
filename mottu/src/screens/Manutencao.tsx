import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

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
import { useI18n } from '@/i18n/I18nProvider';

export default function ManutencaoScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { t } = useI18n();

  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [descricao, setDescricao] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [idMoto, setIdMoto] = useState('');

  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getManutencoes();
      setManutencoes(response.data || []);
    } catch (error) {
      Alert.alert(t('maintenance.alerts.errorTitle'), t('maintenance.alerts.loadError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!descricao || !dataEntrada || !idMoto) {
      Alert.alert(t('maintenance.alerts.errorTitle'), t('maintenance.alerts.requiredFields'));
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
        Alert.alert(t('maintenance.alerts.successTitle'), t('maintenance.alerts.updated'));
      } else {
        await addManutencao(payload);
        Alert.alert(t('maintenance.alerts.successTitle'), t('maintenance.alerts.created'));
      }
      fetchData();
      resetForm();
    } catch (error) {
      Alert.alert(t('maintenance.alerts.errorTitle'), t('maintenance.alerts.saveError'));
    }
  };

  const handleDelete = (idManutencao: number) => {
    Alert.alert(t('maintenance.confirm.title'), t('maintenance.confirm.message'), [
      { text: t('maintenance.confirm.cancel'), style: 'cancel' },
      {
        text: t('maintenance.confirm.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteManutencao(idManutencao);
            Alert.alert(t('maintenance.alerts.successTitle'), t('maintenance.alerts.deleted'));
            fetchData();
          } catch {
            Alert.alert(t('maintenance.alerts.errorTitle'), t('maintenance.alerts.deleteError'));
          }
        },
      },
    ]);
  };

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
        <Text style={[styles.title, { color: theme.text }]}>
          {editId ? t('maintenance.titles.edit') : t('maintenance.titles.add')}
        </Text>

        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder={t('maintenance.placeholders.motorId')}
          value={idMoto}
          onChangeText={setIdMoto}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder={t('maintenance.placeholders.description')}
          value={descricao}
          onChangeText={setDescricao}
          placeholderTextColor="#888"
        />
        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder={t('maintenance.placeholders.entryDate')}
          value={dataEntrada}
          onChangeText={setDataEntrada}
          placeholderTextColor="#888"
        />
        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder={t('maintenance.placeholders.exitDate')}
          value={dataSaida}
          onChangeText={setDataSaida}
          placeholderTextColor="#888"
        />

        <TouchableOpacity
          style={[styles.button, { borderColor: theme.primary }]}
          onPress={handleSave}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>
            {editId ? t('maintenance.actions.update') : t('maintenance.actions.add')}
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
                  {t('maintenance.labels.motor')}: {item.moto?.idMoto}
                </Text>
                <Text style={[styles.itemText, { color: theme.text }]}>
                  {t('maintenance.labels.entry')}: {item.dtEntrada}
                </Text>
                <Text style={[styles.itemText, { color: theme.text }]}>
                  {t('maintenance.labels.exit')}: {item.dtSaida ?? t('maintenance.labels.open')}
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

        <TouchableOpacity
          style={[styles.backButton, { borderColor: theme.primary }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back-outline" size={20} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>
            {t('maintenance.actions.backHome')}
          </Text>
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
