import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InicioScreen from '../screens/inicio/InicioScreen';
import Stack from './stack/Stack';
import OtroScreen from '../screens/datos/OtroScreen';
import { ThemeContext } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerStyle: { backgroundColor: theme.headerBg }, 
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.headerBg },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subtext
      }}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="PilotosTab" component={Stack} options={{ headerShown: false, title: 'Pilotos' }} />
      <Tab.Screen name="DatosF1" component={OtroScreen} options={{ title: 'Partes & Datos' }} />
    </Tab.Navigator>
  );
}