import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Lista from '../../screens/pilotos/Lista';
import Detalles from '../../screens/pilotos/Detalles';
import { ThemeContext } from '../../theme/ThemeContext';

const StackNav = createStackNavigator();

export default function Stack() {
  const { theme } = useContext(ThemeContext);

  return (
    <StackNav.Navigator 
      screenOptions={{ 
        headerStyle: { backgroundColor: theme.primary }, 
        headerTintColor: '#FFF' 
      }}
    >
      <StackNav.Screen name="Lista" component={Lista} options={{ title: 'Pilotos F1' }} />
      <StackNav.Screen name="Detalles" component={Detalles} options={{ title: 'Detalles del Piloto' }} />
    </StackNav.Navigator>
  );
}