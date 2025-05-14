import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Image
                source={require('../images/mottu.png')} 
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
        width: 150, 
        height: 50,  
        resizeMode: 'contain',  
        marginTop: 50,
    },
});

export default Header;
