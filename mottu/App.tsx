import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

import backgroundImage from './src/images/fundo.png';
import Header from './src/components/Header'
import Home from './src/components/Home'
import Footer from './src/components/Footer'

const Stack = createStackNavigator();

export default function App() {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Header />
        <Home/>
        <Footer/>
        
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
