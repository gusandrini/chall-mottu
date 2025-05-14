import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const navigation = useNavigation();

  const buttons = [
    { title: 'Cliente', screen: 'Cliente', icon: <Ionicons name="person-outline" size={22} color="#00FF88" /> },
    { title: 'Funcionário', screen: 'Funcionario', icon: <FontAwesome5 name="user-tie" size={22} color="#00FF88" /> },
    { title: 'Manutenção', screen: 'Manutencao', icon: <MaterialCommunityIcons name="tools" size={22} color="#00FF88" /> },
    { title: 'Moto', screen: 'Moto', icon: <MaterialCommunityIcons name="motorbike" size={22} color="#00FF88" /> },
    { title: 'Sobre Nós', screen: 'SobreNos', icon: <Feather name="info" size={22} color="#00FF88" /> },
  ];

  return (
    <View style={styles.screen}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Controle Inteligente{'\n'}<Text style={styles.highlight}>Mottu em Movimento</Text></Text>
        
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
    marginBottom: 32,
    textAlign: 'center',
  },
  highlight: {
    color: '#00FF88',
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
