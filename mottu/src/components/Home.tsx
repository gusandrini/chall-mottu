import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const buttons = [
    {
      title: 'Cliente',
      screen: 'Cliente',
      icon: <Ionicons name="person-outline" size={22} color={theme.primary} />,
    },
    {
      title: 'Moto',
      screen: 'Moto',
      icon: <MaterialCommunityIcons name="motorbike" size={22} color={theme.primary} />,
    },
    {
      title: 'Manutenção',
      screen: 'Manutencao',
      icon: <MaterialCommunityIcons name="tools" size={22} color={theme.primary} />,
    },
    {
      title: 'Funcionário',
      screen: 'Funcionario',
      icon: <FontAwesome5 name="user-tie" size={22} color={theme.primary} />,
    },
    {
      title: 'Sobre Nós',
      screen: 'SobreNos',
      icon: <Feather name="info" size={22} color={theme.primary} />,
    },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <Header />

      {/* Botão para alternar tema */}
      <TouchableOpacity style={[styles.themeButton, { backgroundColor: theme.primary }]} onPress={toggleTheme}>
        <Text style={{ color: theme.text }}>
          {theme.background === '#000' ? '🌞 Modo Claro' : '🌙 Modo Escuro'}
        </Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.text }]}>
          Controle Inteligente{'\n'}
          <Text style={{ color: theme.primary }}>Mottu em Movimento</Text>
        </Text>

        <Text style={[styles.description, { color: theme.text }]}>
          Bem-vindo ao sistema da Mottu! Aqui, você gerencia com praticidade e agilidade todas as operações essenciais da sua unidade.
        </Text>

        <View style={styles.bulletContainer}>
          <Text style={[styles.bulletPoint, { color: theme.text }]}>• Consultar e editar dados de clientes e funcionários;</Text>
          <Text style={[styles.bulletPoint, { color: theme.text }]}>• Gerenciar motos e acompanhar manutenções em tempo real;</Text>
          <Text style={[styles.bulletPoint, { color: theme.text }]}>• Visualizar informações importantes sobre cada filial;</Text>
          <Text style={[styles.bulletPoint, { color: theme.text }]}>• Acessar um painel completo com apenas alguns toques.</Text>
        </View>

        <Text style={[styles.descriptionBottom, { color: theme.text }]}>
          Toque em uma das opções abaixo para começar. Sua jornada de eficiência começa agora!
        </Text>

        <View style={styles.buttonContainer}>
          {buttons.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, { borderColor: theme.primary, backgroundColor: theme.background }]}
              onPress={() => navigation.navigate(btn.screen as never)}
              activeOpacity={0.8}
            >
              <View style={styles.iconLabel}>
                {btn.icon}
                <Text style={[styles.buttonText, { color: theme.text }]}>{btn.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default Home;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  themeButton: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    margin: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 12,
    lineHeight: 22,
    marginTop: 40,
  },
  bulletContainer: {
    width: '100%',
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 10,
  },
  descriptionBottom: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    width: width * 0.9,
    alignSelf: 'center',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
