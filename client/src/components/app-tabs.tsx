import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import ClientHome from '@/ui/client';
import AdminDashboard from '@/ui/admin';
import DeliveryPortal from '@/ui/delivery';
import LoginScreen from '@/ui/auth/login';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

export default function AppTabs() {
  const theme = useTheme();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'profile'>('home');

  const handleLoginSuccess = (newToken: string, loggedInUser: any) => {
    setToken(newToken);
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setActiveTab('home');
  };

  if (!token || !user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Render dashboard based on role
  const renderDashboard = () => {
    const role = (user.role || '').toLowerCase();
    if (role === 'admin') {
      return <AdminDashboard />;
    } else if (role === 'delivery') {
      return <DeliveryPortal />;
    } else {
      return <ClientHome />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {activeTab === 'home' && renderDashboard()}
        {activeTab === 'explore' && (
          <View style={styles.centerContainer}>
            <SymbolView name="safari" size={48} tintColor={theme.primary} />
            <ThemedText type="subtitle" style={{ marginTop: Spacing.two }}>Explore Services</ThemedText>
            <ThemedText themeColor="textSecondary" style={{ marginTop: Spacing.one }}>Explore the logistics options & features.</ThemedText>
          </View>
        )}
        {activeTab === 'profile' && (
          <View style={styles.centerContainer}>
            <View style={[styles.avatarLarge, { backgroundColor: theme.primary }]}>
              <SymbolView name="person.fill" size={32} tintColor="#FFFFFF" />
            </View>
            <ThemedText type="subtitle" style={{ marginTop: Spacing.two }}>{user.name}</ThemedText>
            <ThemedText themeColor="textSecondary">{user.mail}</ThemedText>
            <ThemedText type="code" style={{ marginTop: Spacing.one, textTransform: 'uppercase', color: theme.primary }}>
              Role: {user.role}
            </ThemedText>

            <Pressable onPress={handleLogout} style={[styles.logoutButton, { backgroundColor: '#FF3B30' }]}>
              <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>Logout</ThemedText>
            </Pressable>
          </View>
        )}
      </View>

      {/* Navigation Tabs */}
      <ThemedView type="backgroundElement" style={[styles.tabBar, { borderTopColor: theme.border }]}>
        <Pressable onPress={() => setActiveTab('home')} style={styles.tabItem}>
          <SymbolView name="house.fill" size={22} tintColor={activeTab === 'home' ? theme.primary : theme.textSecondary} />
          <ThemedText type="code" style={{ fontSize: 10, color: activeTab === 'home' ? theme.primary : theme.textSecondary }}>Home</ThemedText>
        </Pressable>
        <Pressable onPress={() => setActiveTab('explore')} style={styles.tabItem}>
          <SymbolView name="safari.fill" size={22} tintColor={activeTab === 'explore' ? theme.primary : theme.textSecondary} />
          <ThemedText type="code" style={{ fontSize: 10, color: activeTab === 'explore' ? theme.primary : theme.textSecondary }}>Explore</ThemedText>
        </Pressable>
        <Pressable onPress={() => setActiveTab('profile')} style={styles.tabItem}>
          <SymbolView name="person.crop.circle.fill" size={22} tintColor={activeTab === 'profile' ? theme.primary : theme.textSecondary} />
          <ThemedText type="code" style={{ fontSize: 10, color: activeTab === 'profile' ? theme.primary : theme.textSecondary }}>Profile</ThemedText>
        </Pressable>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  logoutButton: {
    marginTop: Spacing.five,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.two,
  },
  tabBar: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: Spacing.one,
  },
  tabItem: {
    alignItems: 'center',
    gap: Spacing.half,
  },
});
