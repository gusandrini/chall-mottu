import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { getFuncionario } from '../api/funcionario';
import { Funcionario } from '../models/funcionario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

export default function FuncionarioScreen() {
  const { theme } = useTheme();
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchFuncionario = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não autenticado!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' as never }],
        });
        return;
      }

      const response = await getFuncionario(userId);
      setFuncionario(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do funcionário.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuncionario();
  }, []);

  const handleLogout = async () => {
    try {
      
      await AsyncStorage.multiRemove(['userId', 'token']);
      setFuncionario(null);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' as never }],
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.primary }]}>
          Dados do Funcionário
        </Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={theme.primary}
            style={{ marginTop: 20 }}
          />
        ) : funcionario ? (
          <View
            style={[
              styles.item,
              { backgroundColor: theme.background, borderColor: theme.primary },
            ]}
          >
            <Item
              icon="person-outline"
              label="Nome"
              value={funcionario.nome}
              theme={theme}
            />
            <Item
              icon="mail-outline"
              label="Email"
              value={funcionario.emailCorporativo}
              theme={theme}
            />
            <Item
              icon="briefcase-outline"
              label="Cargo"
              value={funcionario.cargo}
              theme={theme}
            />
          </View>
        ) : (
          <Text style={[styles.empty, { color: theme.text }]}>
            Nenhum dado encontrado.
          </Text>
        )}

        <TouchableOpacity
          style={[styles.backButton, { borderColor: theme.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color={theme.text}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.buttonText, { color: theme.text }]}>
            Voltar
          </Text>
        </TouchableOpacity>

        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons
              name="log-out-outline"
              size={18}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer style={{ marginTop: 20 }} />
    </SafeAreaView>
  );
}

function Item({
  icon,
  label,
  value,
  theme,
}: {
  icon: any;
  label: string;
  value: string;
  theme: any;
}) {
  return (
    <View style={styles.itemRow}>
      <Ionicons
        name={icon}
        size={18}
        color={theme.primary}
        style={styles.itemIcon}
      />
      <Text style={[styles.itemText, { color: theme.text }]}>
        <Text style={[styles.itemLabel, { color: theme.primary }]}>{label}:</Text>{' '}
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  logoutContainer: { alignItems: 'center', marginBottom: 20 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3b30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 30,
  },
  logoutText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  itemIcon: { marginRight: 12 },
  itemText: { fontSize: 15, flexShrink: 1 },
  itemLabel: { fontWeight: '600' },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
  },
  buttonText: { fontSize: 16, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 20 },
});
