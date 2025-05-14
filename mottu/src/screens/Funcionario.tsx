import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Header from '../components/Header';
import Footer from '../components/Footer';

type User = {
  email: string;
};

export default function Funcionario() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };
    loadUserData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Dados do Funcionário</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#00FF88" style={{ marginTop: 20 }} />
        ) : user ? (
          <View style={styles.item}>
            <Item icon="mail" label="Email" value={user.email} />
            <Item icon="user" label="Nome" value="Jonas" />
            <Item icon="credit-card" label="CPF" value="123.456.789-10" />
            <Item icon="briefcase" label="Cargo" value="Técnico" />
            <Item icon="map-pin" label="Filial" value="Filial 1" />
          </View>
        ) : (
          <Text style={styles.empty}>Nenhum dado encontrado.</Text>
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={18} color="#00FF88" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer style={{ marginTop: 20 }} />
    </SafeAreaView>
  );
}

// Componente de item com ícone
function Item({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.itemRow}>
      <Icon name={icon} size={18} color="#00FF88" style={styles.itemIcon} />
      <Text style={styles.itemText}>
        <Text style={styles.itemLabel}>{label}:</Text> {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    color: '#00FF88',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#00FF88',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    color: '#fff',
    fontSize: 15,
    flexShrink: 1,
  },
  itemLabel: {
    fontWeight: '600',
    color: '#00FF88',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  empty: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
