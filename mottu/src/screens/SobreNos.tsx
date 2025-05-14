// src/screens/SobreNos.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SobreNos() {
    const navigation = useNavigation();

    return (
        <View style={styles.screen}>
            <Header />

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Sobre Nós</Text>

                <View style={styles.section}>
                    <Ionicons name="information-circle-outline" size={24} color="#00FF88" style={styles.icon} />
                    <Text style={styles.text}>
                        Somos uma empresa especializada em soluções de locação de motos para
                        diversos tipos de serviços. Nosso objetivo é oferecer qualidade,
                        segurança e praticidade aos nossos clientes.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Feather name="phone" size={24} color="#00FF88" style={styles.icon} />
                    <Text style={styles.text}>Telefone: +55 11 3181-8188</Text>
                </View>

                <View style={styles.section}>
                    <MaterialIcons name="email" size={24} color="#00FF88" style={styles.icon} />
                    <Text style={styles.text}>Email: mottu@empresa.com.br</Text>
                </View>

                <View style={styles.section}>
                    <Ionicons name="time-outline" size={24} color="#00FF88" style={styles.icon} />
                    <View>
                        <Text style={styles.text}>Funcionamento das bases:</Text>
                        <Text style={styles.text}>Seg. a Sex. das 08:00 às 18:00</Text>
                        <Text style={styles.text}>Sáb. das 09:00 às 12:00</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="arrow-back-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Voltar ao Início</Text>
                </TouchableOpacity>
            </ScrollView>

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1c1c1e',
    },
    container: {
        padding: 20,
        paddingBottom: 100,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#00FF88',
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
        color: '#f2f2f2',
        lineHeight: 22,
    },
    backButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c1e',
        borderRadius: 12,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#00FF88',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
