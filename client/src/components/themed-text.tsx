import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'subtitle' | 'default' | 'small' | 'smallBold' | 'code' | 'link' | 'linkPrimary';
  themeColor?: 'text' | 'textSecondary' | 'primary' | 'linkPrimary';
}

export function ThemedText({ type = 'default', themeColor, style, ...props }: ThemedTextProps) {
  const theme = useTheme();

  const textColor = themeColor === 'textSecondary'
    ? theme.textSecondary
    : themeColor === 'primary' || themeColor === 'linkPrimary'
    ? theme.primary
    : theme.text;

  return (
    <Text
      style={[
        { color: textColor },
        styles.default,
        type && styles[type],
        style
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 15,
    fontFamily: 'System',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  small: {
    fontSize: 13,
  },
  smallBold: {
    fontSize: 13,
    fontWeight: '600',
  },
  code: {
    fontFamily: 'System',
    fontSize: 12,
    opacity: 0.9,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3C9FFE',
  },
  linkPrimary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3C9FFE',
  }
});
