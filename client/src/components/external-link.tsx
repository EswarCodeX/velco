import React from 'react';
import { Pressable, Linking, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  asChild?: boolean;
}

export function ExternalLink({ href, children, asChild }: ExternalLinkProps) {
  const handlePress = async () => {
    if (Platform.OS === 'web') {
      window.open(href, '_blank');
    } else {
      await WebBrowser.openBrowserAsync(href);
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: handlePress,
    });
  }

  return (
    <Pressable onPress={handlePress}>
      {children}
    </Pressable>
  );
}
