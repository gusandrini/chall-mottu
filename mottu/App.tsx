import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

import backgroundImage from './src/images/fundo.png';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Cliente from './src/screens/Cliente';
import Funcionario from './src/screens/Funcionario'; 
import Manutencao from './src/screens/Manutencao'; 
import Moto from './src/screens/Moto'; 
import SobreNos from './src/screens/SobreNos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <Header />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Cliente" component={Cliente} />
            <Stack.Screen name="Funcionario" component={Funcionario} />
            <Stack.Screen name="Manutencao" component={Manutencao} />
            <Stack.Screen name="Moto" component={Moto} />
            <Stack.Screen name="SobreNos" component={SobreNos} />
          </Stack.Navigator>
          <Footer />
        </SafeAreaView>
      </ImageBackground>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
