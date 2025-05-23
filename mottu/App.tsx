import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

import Login from './src/screens/Login';
import Home from './src/components/Home';
import Cliente from './src/screens/Cliente'; // Supondo que você tenha essas telas
import Funcionario from './src/screens/Funcionario'; 
import Manutencao from './src/screens/Manutencao'; 
import Moto from './src/screens/Moto'; 
import SobreNos from './src/screens/SobreNos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cliente" component={Cliente} />
            <Stack.Screen name="Funcionario" component={Funcionario} />
            <Stack.Screen name="Manutencao" component={Manutencao} />
            <Stack.Screen name="Moto" component={Moto} />
            <Stack.Screen name="SobreNos" component={SobreNos} />
          </Stack.Navigator>
        </SafeAreaView>
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
