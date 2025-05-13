import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Image
                source={require('../images/mottu.png')}  // Caminho corrigido
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150, // Ajuste conforme necessário
        height: 50,  // Ajuste conforme necessário
        resizeMode: 'contain',  // Isso evita que a imagem seja distorcida
    },
});

export default Header;
