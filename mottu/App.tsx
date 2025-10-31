import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { I18nProvider } from "@/i18n/I18nProvider";
import { Platform } from 'react-native';
import Login from './src/screens/Login';
import Home from './src/components/Home';
import Cliente from './src/screens/Cliente';
import Funcionario from './src/screens/Funcionario';
import Manutencao from './src/screens/Manutencao';
import Moto from './src/screens/Moto';
import SobreNos from './src/screens/SobreNos';
import CadastroFuncionario from './src/screens/CadastroFuncionario';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { SessionProvider } from './src/services/SessionProvider'; 

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


function AppNavigator() {
  const { theme } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'Padrão',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
  }, []);

  const baseTheme = theme.background === '#000' ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: theme.primary,
      background: theme.background,
      card: theme.background,
      text: theme.text,
      border: theme.primary,
      notification: theme.primary,
    },
  };

  return (
    <I18nProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CadastroFuncionario" component={CadastroFuncionario} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Cliente" component={Cliente} />
          <Stack.Screen name="Funcionario" component={Funcionario} />
          <Stack.Screen name="Manutencao" component={Manutencao} />
          <Stack.Screen name="Moto" component={Moto} />
          <Stack.Screen name="SobreNos" component={SobreNos} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SessionProvider> 
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
