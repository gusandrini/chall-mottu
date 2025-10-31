import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

import Header from '../components/Header';
import Footer from '../components/Footer';

import { useTheme } from '../context/ThemeContext';
import { Moto } from '../models/moto';
import { getMotos, addMoto, updateMoto } from '../api/moto';
import { useI18n } from '@/i18n/I18nProvider';

export default function MotoScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { t } = useI18n();

  const [motos, setMotos] = useState<Moto[]>([]);
  const [idCliente, setIdCliente] = useState('');
  const [idFilialDepartamento, setIdFilialDepartamento] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [kmRodado, setKmRodado] = useState('');
  const [status, setStatus] = useState('');

  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getMotos();
      setMotos(response.data || []);
    } catch (err) {
      console.error("Erro ao buscar motos:", err);
      Alert.alert(t('bikes.alerts.errorTitle'), t('bikes.alerts.loadError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!idCliente || !idFilialDepartamento || !modelo || !placa || !kmRodado || !status) {
      Alert.alert(t('bikes.alerts.errorTitle'), t('bikes.alerts.requiredFields'));
      return;
    }

    const payload: Moto = {
      idMoto: editId,
      cliente: { idCliente: parseInt(idCliente, 10) },
      filialDepartamento: { idFilialDepartamento: parseInt(idFilialDepartamento, 10) },
      nmModelo: modelo,
      nmPlaca: placa.toUpperCase(),
      kmRodado: parseFloat(kmRodado),
      stMoto: status,
    };

    try {
      if (editId !== undefined) {
        await updateMoto(payload);
        Alert.alert(t('bikes.alerts.successTitle'), t('bikes.alerts.updated'));
      } else {
        await addMoto(payload);
        Alert.alert(t('bikes.alerts.successTitle'), t('bikes.alerts.created'));
      }
      fetchData();
      resetForm();
    } catch (err) {
      console.error("Erro ao salvar moto:", err);
      Alert.alert(t('bikes.alerts.errorTitle'), t('bikes.alerts.saveError'));
    }
  };

  const handleEdit = (item: Moto) => {
    setEditId(item.idMoto);
    setIdCliente(item.cliente?.idCliente?.toString() || '');
    setIdFilialDepartamento(item.filialDepartamento?.idFilialDepartamento?.toString() || '');
    setModelo(item.nmModelo);
    setPlaca(item.nmPlaca);
    setKmRodado(item.kmRodado?.toString() || '');
    setStatus(item.stMoto);
  };

  const resetForm = () => {
    setIdCliente('');
    setIdFilialDepartamento('');
    setModelo('');
    setPlaca('');
    setKmRodado('');
    setStatus('');
    setEditId(undefined);
  };

  const renderItem = ({ item }: { item: Moto }) => (
    <View
      style={[
        styles.motoItem,
        { backgroundColor: theme.background, borderColor: theme.primary },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.motoText, { color: theme.text }]}>
          {t('bikes.labels.model')}: {item.nmModelo}
        </Text>
        <Text style={[styles.motoText, { color: theme.text }]}>
          {t('bikes.labels.plate')}: {item.nmPlaca}
        </Text>
        <Text style={[styles.motoText, { color: theme.text }]}>
          {t('bikes.labels.status')}: {item.stMoto}
        </Text>
        <Text style={[styles.motoText, { color: theme.text }]}>
          {t('bikes.labels.kmDriven')}: {item.kmRodado}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Ionicons name="create-outline" size={22} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header />

      <FlatList
        data={motos}
        keyExtractor={(item) => String(item.idMoto ?? Math.random())}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <Text style={[styles.title, { color: theme.primary }]}>
              {editId !== undefined ? t('bikes.titles.edit') : t('bikes.titles.add')}
            </Text>

            <TextInput
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              placeholder={t('bikes.placeholders.clientId')}
              placeholderTextColor="#888"
              value={idCliente}
              onChangeText={setIdCliente}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              placeholder={t('bikes.placeholders.branchDeptId')}
              placeholderTextColor="#888"
              value={idFilialDepartamento}
              onChangeText={setIdFilialDepartamento}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              placeholder={t('bikes.placeholders.model')}
              placeholderTextColor="#888"
              value={modelo}
              onChangeText={setModelo}
            />
            <TextInput
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              placeholder={t('bikes.placeholders.plate')}
              placeholderTextColor="#888"
              value={placa}
              onChangeText={setPlaca}
              autoCapitalize="characters"
            />
            <TextInput
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              placeholder={t('bikes.placeholders.kmDriven')}
              placeholderTextColor="#888"
              value={kmRodado}
              onChangeText={setKmRodado}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              placeholder={t('bikes.placeholders.status')}
              placeholderTextColor="#888"
              value={status}
              onChangeText={setStatus}
            />

            <TouchableOpacity
              style={[styles.button, { borderColor: theme.primary }]}
              onPress={handleSave}
            >
              <Text style={{ color: theme.text }}>
                {editId !== undefined ? t('bikes.actions.update') : t('bikes.actions.add')}
              </Text>
            </TouchableOpacity>

            {loading && (
              <ActivityIndicator
                size="large"
                color={theme.primary}
                style={{ marginTop: 20 }}
              />
            )}
          </>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={[styles.backButton, { borderColor: theme.primary }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="arrow-back-outline" size={20} color={theme.text} />
            <Text style={{ color: theme.text, marginLeft: 6 }}>
              {t('bikes.actions.backHome')}
            </Text>
          </TouchableOpacity>
        }
      />

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingLeft: 12,
    marginHorizontal: 15,
  },
  button: {
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 15,
  },
  motoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 8,
  },
  motoText: {
    fontSize: 15,
    marginBottom: 4,
    flexShrink: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 10,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 15,
  },
});
