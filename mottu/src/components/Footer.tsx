import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type Props = {
  style?: ViewStyle;
};

export default function Footer({ style }: Props) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.footer,
        { backgroundColor: theme.background, borderTopColor: theme.primary },
        style,
      ]}
    >
      <Text style={[styles.text, { color: theme.text }]}>© 2025 SGF</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  text: {
    fontSize: 12,
  },
});
