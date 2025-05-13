import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle Inteligente, Mottu em Movimento</Text>

      <View style={styles.buttonContainer}>
        <Button title="Cliente" onPress={() => navigation.navigate('Cliente')} />
        <Button title="Funcionário" onPress={() => navigation.navigate('Funcionario')} />
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Manutenção" onPress={() => navigation.navigate('Manutencao')} />
        <Button title="Moto" onPress={() => navigation.navigate('Moto')} />
        <Button title="Sobre Nós" onPress={() => navigation.navigate('SobreNos')} />
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 10, // Para espaçamento entre botões (RN 0.71+), ou use marginBottom se necessário
  },
});
