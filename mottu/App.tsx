// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Cliente from './src/screens/Cliente';
import Funcionario from './src/screens/Funcionario';
import Login from './src/screens/Login';
import Manutencao from './src/screens/Manutencao';
import Moto from './src/screens/Moto';
import SobreNos from './src/screens/SobreNos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cliente" component={Cliente} />
        <Stack.Screen name="Moto" component={Moto} />
        <Stack.Screen name="Funcionário" component={Funcionario} />
        <Stack.Screen name="Manutencao" component={Manutencao} />
        <Stack.Screen name="SobreNos" component={SobreNos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
