import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  style?: ViewStyle;
};

export default function Footer({ style }: Props) {
  return (
    <View style={[styles.footer, style]}>
      <Text style={styles.text}>© 2025 SGF</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1c1c1e',
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#00FF88',
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});
