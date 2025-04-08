import React, { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const segments = useSegments(); // pour vérifier sur quelle route on est

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Erreur AsyncStorage', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const currentSegment = segments[0];
      if (!isAuthenticated && currentSegment !== 'login' && currentSegment !== 'register') {
        router.replace('/login');
      }

      if (isAuthenticated && (currentSegment === 'login' || currentSegment === 'register')) {
        router.replace('/');
      }
    }
  }, [isLoading, isAuthenticated, segments]);

  if (isLoading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
    );
  }

  return <Slot />;
}
