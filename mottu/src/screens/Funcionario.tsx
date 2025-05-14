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
            <Text style={styles.itemText}>Email: {user.email}</Text>
            <Text style={styles.itemText}>Nome: Jonas</Text>
            <Text style={styles.itemText}>CPF: 123.456.789-10</Text>
            <Text style={styles.itemText}>Cargo: Técnico</Text>
            <Text style={styles.itemText}>Filial: Filial 1</Text>
          </View>
        ) : (
          <Text style={styles.empty}>Nenhum dado encontrado.</Text>
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer style={{ marginTop: 20 }} />
    </SafeAreaView>
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
    paddingBottom: 40, // Espaço pro Footer
  },
  title: {
    fontSize: 20,
    color: '#00FF88',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#00FF88',
  },
  itemText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 4,
  },
  backButton: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
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
