// src/screens/CadastroFuncionario.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addFuncionario } from "../api/funcionario"; 
import { useTheme } from "../context/ThemeContext";

export default function CadastroFuncionario({ navigation }: any) {
  const { theme } = useTheme();

  const [nome, setNome] = useState("");
  const [emailCorporativo, setEmailCorporativo] = useState("");
  const [cargo, setCargo] = useState("");
  const [senha, setSenha] = useState("");
  const [filial, setFilial] = useState(""); // se precisar vincular filial

  async function handleCadastro() {
    if (!nome || !emailCorporativo || !cargo || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      await addFuncionario({
        nome,
        emailCorporativo,
        cargo,
        senhaHash: senha, // backend criptografa
        filial: filial ? { id: Number(filial) } : undefined, // só manda se tiver
      });

      Alert.alert("Sucesso", "Funcionário cadastrado! Faça login.");
      navigation.replace("Login");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível cadastrar funcionário.");
    }
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.form}>
        <Text style={[styles.title, { color: theme.text }]}>
          Cadastro de Funcionário
        </Text>

        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder="Nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder="Email corporativo"
          placeholderTextColor="#999"
          value={emailCorporativo}
          onChangeText={setEmailCorporativo}
        />

        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder="Cargo"
          placeholderTextColor="#999"
          value={cargo}
          onChangeText={setCargo}
        />

        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder="ID da Filial (opcional)"
          placeholderTextColor="#999"
          value={filial}
          onChangeText={setFilial}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleCadastro}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={{ color: theme.primary, marginTop: 20 }}>
            Já tem conta? Faça login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  form: { width: "100%", maxWidth: 400 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: { padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
