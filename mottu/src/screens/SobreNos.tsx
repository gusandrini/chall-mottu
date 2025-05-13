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
            <Text style={styles.text}>Telefone: +55 11 3181-8188</Text>
            <Text style={styles.text}>Email: mottu@empresa.com.br</Text>
            <Text style={styles.text}>Funcionamento das bases:</Text>
            <Text style={styles.text}>Seg. a Sex. das 08:00 às 18:00</Text>
            <Text style={styles.text}>Sáb. das 09:00 às 12:00</Text>
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
