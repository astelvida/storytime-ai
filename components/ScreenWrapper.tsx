import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LinearGradientWrapper = ({ children, colors, style = {} }) => {
  return (
    <LinearGradient colors={colors} style={[styles.gradient, style]}>
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default LinearGradientWrapper;
