import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const checkWelcome = async () => {
      const seen = await AsyncStorage.getItem('hasSeenWelcome');
      if (!seen) setShowWelcome(true);
    };
    checkWelcome();
  }, []);

  const closeWelcome = async () => {
    setShowWelcome(false);
    await AsyncStorage.setItem('hasSeenWelcome', 'true');
  };

  const buttons = [
    { title: 'Cliente', screen: 'Cliente', icon: <Ionicons name="person-outline" size={22} color={theme.primary} /> },
    { title: 'Moto', screen: 'Moto', icon: <MaterialCommunityIcons name="motorbike" size={22} color={theme.primary} /> },
    { title: 'Manutenção', screen: 'Manutencao', icon: <MaterialCommunityIcons name="tools" size={22} color={theme.primary} /> },
    { title: 'Funcionário', screen: 'Funcionario', icon: <FontAwesome5 name="user-tie" size={22} color={theme.primary} /> },
    { title: 'Sobre Nós', screen: 'SobreNos', icon: <Feather name="info" size={22} color={theme.primary} /> },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <Header />

      

      {/* boas-vindas */}
      <Modal visible={showWelcome} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: theme.background }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              🎉 Bem-vindo ao sistema da Mottu!
            </Text>
            <Text style={[styles.modalText, { color: theme.text }]}>
              Aqui você gerencia com praticidade e agilidade todas as operações
              essenciais da sua unidade.
            </Text>

            <View style={styles.modalBullets}>
              <Text style={[styles.bullet, { color: theme.text }]}>✔ Clientes e Funcionários</Text>
              <Text style={[styles.bullet, { color: theme.text }]}>✔ Motos e Manutenções</Text>
              <Text style={[styles.bullet, { color: theme.text }]}>✔ Informações da Filial</Text>
              <Text style={[styles.bullet, { color: theme.text }]}>✔ Painel completo e prático</Text>
            </View>

            <TouchableOpacity
              style={[styles.closeBtn, { backgroundColor: theme.primary }]}
              onPress={closeWelcome}
            >
              <Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 16 }}>
                Começar 🚀
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.text }]}>
          Controle Inteligente
        </Text>
        <Text style={[styles.subtitle, { color: theme.primary }]}>
          Mottu em Movimento
        </Text>

        <Text style={[styles.description, { color: theme.text }]}>
          Gerencie todas as operações essenciais da sua unidade com agilidade e segurança.
        </Text>

        <View style={styles.buttonContainer}>
          {buttons.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                { borderColor: theme.primary, backgroundColor: theme.background },
              ]}
              onPress={() => navigation.navigate(btn.screen as never)}
              activeOpacity={0.85}
            >
              <View style={styles.iconLabel}>
                {btn.icon}
                <Text style={[styles.buttonText, { color: theme.text }]}>{btn.title}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* tema */}
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Ionicons
          name={theme.background === '#000' ? 'sunny-outline' : 'moon-outline'}
          size={18}
          color={theme.text}
        />
        <Text style={[styles.themeText, { color: theme.text }]}>
          {theme.background === '#000' ? 'Modo Claro' : 'Modo Escuro'}
        </Text>
      </TouchableOpacity>
      
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default Home;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    padding: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  themeButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', 
  alignSelf: 'center',      
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  marginTop: 20,
  backgroundColor: 'rgba(0,0,0,0.05)',
},
  themeText: {
    marginLeft: 6,
    fontSize: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    width: '100%',
    gap: 18,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    width: width * 0.9,
    alignSelf: 'center',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    borderRadius: 16,
    padding: 24,
    width: '90%',
    elevation: 6,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  modalBullets: {
    marginBottom: 20,
  },
  bullet: {
    fontSize: 15,
    marginBottom: 8,
  },
  closeBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
});
