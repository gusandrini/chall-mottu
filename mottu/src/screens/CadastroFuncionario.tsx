import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { FuncionarioCad } from "../models/funcionarioCad";
import { addFuncionario } from "../api/funcionario";
import { useTheme } from "../context/ThemeContext";

export default function CadastroFuncionario({ navigation }: any) {
  const { theme } = useTheme();

  const [nome, setNome] = useState("");
  const [emailCorporativo, setEmailCorporativo] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [idFilial, setIdFilial] = useState("");
  const [loading, setLoading] = useState(false);

  const validarEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSave = async () => {
    if (!nome || !emailCorporativo || !senha || !cargo) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }
    if (!validarEmail(emailCorporativo)) {
      Alert.alert("Erro", "Digite um e-mail corporativo válido!");
      return;
    }

    const payload: FuncionarioCad = {
      idFuncionario: 0,
      idFilial: idFilial ? Number(idFilial) : 0,
      nome,
      emailCorporativo,
      senhaHash: senha,
      cargo,
    };

    try {
      setLoading(true); 
      await addFuncionario(payload);
      Alert.alert("Sucesso", "Funcionário cadastrado!", [
        {
          text: "OK",
          onPress: () => navigation.replace("Login"),
        },
      ]);
      setNome("");
      setEmailCorporativo("");
      setSenha("");
      setCargo("");
      setIdFilial("");
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert(
            "Não autorizado",
            "Seu token é inválido ou expirou. Faça login novamente."
          );
        } else if (error.response.status === 403) {
          Alert.alert(
            "Acesso negado",
            "Você não tem permissão para cadastrar funcionários."
          );
        } else {
          const msg =
            error.response.data?.message ||
            error.response.data?.error ||
            "Erro desconhecido no servidor.";
          Alert.alert(`Erro ${error.response.status}`, msg);
        }
      } else {
        Alert.alert("Erro", "Não foi possível conectar ao servidor.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Overlay de carregamento */}
      <Modal transparent visible={loading}>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Criando funcionário...
          </Text>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={theme.text} />
        <Text style={[styles.backText, { color: theme.text }]}>Voltar</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={[styles.label, { color: theme.text }]}>Nome</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.primary }]}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={[styles.label, { color: theme.text }]}>
          Email Corporativo
        </Text>
        <TextInput
          style={[styles.input, { borderColor: theme.primary }]}
          value={emailCorporativo}
          onChangeText={setEmailCorporativo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: theme.text }]}>Senha</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.primary }]}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={[styles.label, { color: theme.text }]}>Cargo</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.primary }]}
          value={cargo}
          onChangeText={setCargo}
        />

        <Text style={[styles.label, { color: theme.text }]}>
          ID Filial (opcional)
        </Text>
        <TextInput
          style={[styles.input, { borderColor: theme.primary }]}
          value={idFilial}
          onChangeText={setIdFilial}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleSave}
          disabled={loading}
        >
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.buttonText}>Salvar Funcionário</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  inner: { flex: 1, justifyContent: "center" },
  label: { marginTop: 12, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },
});
