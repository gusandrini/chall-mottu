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
import { useI18n } from '@/i18n/I18nProvider';

export default function ClienteScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { t } = useI18n();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nm_cliente, setNmCliente] = useState('');        
  const [nm_email, setNmEmail] = useState('');            
  const [nr_cpf, setNrCpf] = useState('');               
  const [id_logradouro, setIdLogradouro] = useState('');  
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | number | null>(null); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const rows = await getClientes();
      const data = Array.isArray(rows) ? rows : (rows?.data ?? []);
      setClientes(data);
    } catch (error) {
      Alert.alert(t('clients.alerts.errorTitle'), t('clients.alerts.loadError'));
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
      Alert.alert(t('clients.alerts.errorTitle'), t('clients.alerts.requiredFields'));
      return;
    }
    if (!validarEmail(nm_email)) {
      Alert.alert(t('clients.alerts.errorTitle'), t('clients.alerts.invalidEmail'));
      return;
    }
    const cpfDigits = nr_cpf.replace(/\D/g, '');
    if (!validarCPF(cpfDigits)) {
      Alert.alert(t('clients.alerts.errorTitle'), t('clients.alerts.invalidCpf'));
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
        await updateCliente(payload); 
        Alert.alert(t('clients.alerts.successTitle'), t('clients.alerts.updated'));
      } else {
        await addCliente(payload);
        Alert.alert(t('clients.alerts.successTitle'), t('clients.alerts.created'));
      }
      fetchData();
      handleClearFields();
    } catch {
      Alert.alert(t('clients.alerts.errorTitle'), t('clients.alerts.saveError'));
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
    Alert.alert(t('clients.confirm.title'), t('clients.confirm.message'), [
      { text: t('clients.confirm.cancel'), style: 'cancel' },
      {
        text: t('clients.confirm.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteCliente(String(id_cliente));
            Alert.alert(t('clients.alerts.successTitle'), t('clients.alerts.deleted'));
            fetchData();
          } catch (error) {
            console.error('deleteCliente', error);
            Alert.alert(t('clients.alerts.errorTitle'), t('clients.alerts.deleteError'));
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
        <Text style={[styles.itemText, { color: theme.text }]}>{item.nm_cliente}</Text>
        <Text style={[styles.itemText, { color: theme.text }]}>{item.nm_email}</Text>
        <Text style={[styles.itemText, { color: theme.text }]}>
          {t('clients.labels.cpf')}: {item.nr_cpf}
        </Text>
        {item.id_logradouro ? (
          <Text style={[styles.itemText, { color: theme.text }]}>
            {t('clients.labels.addressId')}: {item.id_logradouro}
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
                style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
                placeholder={t('clients.placeholders.name')}
                placeholderTextColor="#888"
                value={nm_cliente}
                onChangeText={setNmCliente}
              />

              <TextInput
                style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
                placeholder={t('clients.placeholders.email')}
                placeholderTextColor="#888"
                value={nm_email}
                onChangeText={setNmEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
                placeholder={t('clients.placeholders.cpf')}
                placeholderTextColor="#888"
                value={nr_cpf}
                onChangeText={setNrCpf}
                keyboardType="number-pad"
                maxLength={14}
              />

              <TextInput
                style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
                placeholder={t('clients.placeholders.addressIdOptional')}
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
                  {editId ? t('clients.actions.update') : t('clients.actions.add')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.clearButton, { borderColor: '#888' }]}
                onPress={handleClearFields}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>
                  {t('clients.actions.clear')}
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
                {t('clients.empty')}
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
                {t('clients.actions.backHome')}
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
