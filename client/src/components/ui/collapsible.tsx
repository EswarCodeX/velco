import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { ThemedText } from '../themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

export function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.header}>
        <SymbolView
          name="chevron.right"
          size={14}
          tintColor={theme.text}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
        <ThemedText type="smallBold">{title}</ThemedText>
      </Pressable>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.half,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  content: {
    paddingLeft: Spacing.six,
    paddingTop: Spacing.one,
    gap: Spacing.two,
  },
});
