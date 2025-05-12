import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Image
                source={require('./path/to/logo.png')}  // Substitua pelo caminho correto da sua logo
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 80, // Você pode ajustar o tamanho conforme necessário
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Escolha a cor de fundo que preferir
    },
    logo: {
        width: 150, // Tamanho da logo (ajuste conforme necessário)
        height: 50,  // Tamanho da logo (ajuste conforme necessário)
        resizeMode: 'contain', // Isso evita que a imagem seja distorcida
    },
});

export default Header;
