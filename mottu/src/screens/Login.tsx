// src/screens/Login.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from '../services/SessionProvider';
import { useTheme } from '../context/ThemeContext';

export default function Login({ navigation }: any) {
  const { login } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }
    const ok = await login(email, password);
    if (!ok) {
      Alert.alert('Dados inválidos', 'E-mail ou senha incorretos.');
      return;
    }
    navigation.replace('Home');
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.primary }]}>Bem-vindo</Text>

        <View style={[styles.inputContainer, { borderColor: theme.primary, backgroundColor: theme.background }]}>
          <Ionicons name="mail-outline" size={20} color={theme.primary} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={[styles.inputContainer, { borderColor: theme.primary, backgroundColor: theme.background }]}>
          <Ionicons name="lock-closed-outline" size={20} color={theme.primary} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Senha"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleLogin}
        >
          <Ionicons name="log-in-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* 🔹 Botão para alternar tema */}
        <TouchableOpacity
          style={[styles.themeButton, { backgroundColor: theme.primary }]}
          onPress={toggleTheme}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>
            {theme.background === '#000' ? '🌞 Modo Claro' : '🌙 Modo Escuro'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', padding: 32 },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 50, fontSize: 16 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600', marginLeft: 8 },
  themeButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
