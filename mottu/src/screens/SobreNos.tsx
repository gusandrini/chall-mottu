// src/screens/SobreNos.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SobreNos() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sobre Nós</Text>
            <Text style={styles.text}>
                Somos uma empresa especializada em soluções de locação de motos para
                diversos tipos de serviços. Nosso objetivo é oferecer qualidade, segurança
                e praticidade aos nossos clientes.
            </Text>
            <Text style={styles.text}>Endereço: Rua Exemplo, 123</Text>
            <Text style={styles.text}>Telefone: (11) 12345-6789</Text>
            <Text style={styles.text}>Email: contato@empresa.com.br</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 18,
        marginBottom: 12,
    },
});
