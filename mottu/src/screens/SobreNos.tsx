import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

export default function SobreNos() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.primary }]}>Sobre Nós</Text>

        <View style={styles.section}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={theme.primary}
            style={styles.icon}
          />
          <Text style={[styles.text, { color: theme.text }]}>
            Somos uma empresa especializada em soluções de locação de motos para
            diversos tipos de serviços. Nosso objetivo é oferecer qualidade,
            segurança e praticidade aos nossos clientes.
          </Text>
        </View>

        <View style={styles.section}>
          <Feather
            name="phone"
            size={24}
            color={theme.primary}
            style={styles.icon}
          />
          <Text style={[styles.text, { color: theme.text }]}>
            Telefone: +55 11 3181-8188
          </Text>
        </View>

        <View style={styles.section}>
          <MaterialIcons
            name="email"
            size={24}
            color={theme.primary}
            style={styles.icon}
          />
          <Text style={[styles.text, { color: theme.text }]}>
            Email: mottu@empresa.com.br
          </Text>
        </View>

        <View style={styles.section}>
          <Ionicons
            name="time-outline"
            size={24}
            color={theme.primary}
            style={styles.icon}
          />
          <View>
            <Text style={[styles.text, { color: theme.text }]}>
              Funcionamento das bases:
            </Text>
            <Text style={[styles.text, { color: theme.text }]}>
              Seg. a Sex. das 08:00 às 18:00
            </Text>
            <Text style={[styles.text, { color: theme.text }]}>
              Sáb. das 09:00 às 12:00
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.backButton, { borderColor: theme.primary, backgroundColor: theme.background }]}
          onPress={() => navigation.navigate('Home' as never)}
        >
          <Ionicons name="arrow-back-outline" size={20} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>
            Voltar ao Início
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  icon: {
    marginRight: 12,
    marginTop: 4,
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});
