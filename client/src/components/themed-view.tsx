import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface ThemedViewProps extends ViewProps {
  type?: 'default' | 'backgroundElement';
}

export function ThemedView({ type = 'default', style, ...props }: ThemedViewProps) {
  const theme = useTheme();
  const backgroundColor = type === 'backgroundElement' ? theme.backgroundElement : theme.background;

  return <View style={[{ backgroundColor }, style]} {...props} />;
}
