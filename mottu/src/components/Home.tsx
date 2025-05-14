import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const buttons = [
    { title: 'Cliente', screen: 'Cliente' },
    { title: 'Funcionário', screen: 'Funcionario' },
    { title: 'Manutenção', screen: 'Manutencao' },
    { title: 'Moto', screen: 'Moto' },
    { title: 'Sobre Nós', screen: 'SobreNos' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle Inteligente, Mottu em Movimento</Text>
      <View style={styles.buttonContainer}>
        {buttons.map((btn, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate(btn.screen)}
          >
            <Text style={styles.buttonText}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#000', // Fundo preto
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#00FF88', // Verde vibrante
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    backgroundColor: '#1c1c1e', // Cinza escuro
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00FF88', // Verde nos detalhes
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
