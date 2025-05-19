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

const Home = () => {
  const navigation = useNavigation();

  const buttons = [
  {
    title: 'Cliente',
    screen: 'Cliente',
    icon: <Ionicons name="person-outline" size={22} color="#00FF88" />,
  },
  {
    title: 'Moto',
    screen: 'Moto',
    icon: <MaterialCommunityIcons name="motorbike" size={22} color="#00FF88" />,
  },
  {
    title: 'Manutenção',
    screen: 'Manutencao',
    icon: <MaterialCommunityIcons name="tools" size={22} color="#00FF88" />,
  },
  {
    title: 'Funcionário',
    screen: 'Funcionario',
    icon: <FontAwesome5 name="user-tie" size={22} color="#00FF88" />,
  },
  {
    title: 'Sobre Nós',
    screen: 'SobreNos',
    icon: <Feather name="info" size={22} color="#00FF88" />,
  },
];


  return (
    <View style={styles.screen}>
      <Header />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Controle Inteligente{'\n'}
          <Text style={styles.highlight}>Mottu em Movimento</Text>
        </Text>

        <Text style={styles.description}>
          Bem-vindo ao sistema da Mottu! Aqui, você gerencia com praticidade e agilidade todas as operações essenciais da sua unidade.
        </Text>

        <View style={styles.bulletContainer}>
          <Text style={styles.bulletPoint}>• Consultar e editar dados de clientes e funcionários;</Text>
          <Text style={styles.bulletPoint}>• Gerenciar motos e acompanhar manutenções em tempo real;</Text>
          <Text style={styles.bulletPoint}>• Visualizar informações importantes sobre cada filial;</Text>
          <Text style={styles.bulletPoint}>• Acessar um painel completo com apenas alguns toques.</Text>
        </View>

        <Text style={styles.descriptionBottom}>
          Toque em uma das opções abaixo para começar. Sua jornada de eficiência começa agora!
        </Text>

        <View style={styles.buttonContainer}>
          {buttons.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => navigation.navigate(btn.screen)}
              activeOpacity={0.8}
            >
              <View style={styles.iconLabel}>
                {btn.icon}
                <Text style={styles.buttonText}>{btn.title}</Text>
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
    backgroundColor: '#000',
  },
  container: {
    padding: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  highlight: {
    color: '#00FF88',
  },
  description: {
    fontSize: 15,
    color: '#ccc',
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
    color: '#aaa',
    marginBottom: 6,
    paddingLeft: 10,
  },
  descriptionBottom: {
    fontSize: 15,
    color: '#ccc',
    textAlign: 'left',
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    backgroundColor: '#1c1c1e',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00FF88',
    shadowColor: '#00FF88',
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
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
