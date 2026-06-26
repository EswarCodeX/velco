import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { Spacing } from '@/constants/theme';

export function HintRow({ title, hint }: { title: string; hint: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <ThemedText type="smallBold">{title}</ThemedText>
      <View style={styles.hintContainer}>{hint}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.one,
  },
  hintContainer: {
    alignItems: 'flex-end',
  },
});
