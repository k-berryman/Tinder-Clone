import React from 'react';
import { useTailwind } from 'tailwind-rn';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { AuthProvider } from './hooks/useAuth'

export default function App() {
  const tw = useTailwind();
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
