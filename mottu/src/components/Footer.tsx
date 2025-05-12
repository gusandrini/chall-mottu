import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.text}>© 2025 Sua Empresa - Todos os direitos reservados</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 60, // Tamanho do footer
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333', // Cor de fundo do footer
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    text: {
        color: '#fff', // Cor do texto
        fontSize: 14,
    },
});

export default Footer;
