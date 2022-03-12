import React from 'react';
import { useTailwind } from 'tailwind-rn';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';

export default function App() {
  const tw = useTailwind();
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
