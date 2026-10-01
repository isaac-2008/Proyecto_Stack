import React, { createContext, useState } from 'react';

import {
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

export const ThemeContext = createContext();

export const themeStyles = {
  dark: {
    bg: '#0F0F12',
    cardBg: '#1C1C24',
    pressedBg: '#2A2A36',
    text: '#FFFFFF',
    subtext: '#9E9EA9',
    primary: '#FF1801',
    accent: '#22D3EE',
    headerBg: '#16161E',
  },

  light: {
    bg: '#F3F4F6',
    cardBg: '#FFFFFF',
    pressedBg: '#E5E7EB',
    text: '#111827',
    subtext: '#6B7280',
    primary: '#E10600',
    accent: '#0284C7',
    headerBg: '#FFFFFF',
  },
};

export const ThemeProvider = ({ children }) => {

  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark
    ? themeStyles.dark
    : themeStyles.light;

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        theme,
      }}
    >

      {children}

      {/* Botón flotante para cambiar el tema */}

      <Pressable
        style={({ pressed }) => [
          styles.floatingThemeBtn,
          {
            backgroundColor: pressed
              ? theme.pressedBg
              : theme.cardBg,

            borderColor: theme.primary,
          },
        ]}
        onPress={toggleTheme}
      >
        <Text style={styles.icono}>
          {isDark ? '☀️' : '🌙'}
        </Text>
      </Pressable>

    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({

  floatingThemeBtn: {
    position: 'absolute',
    top: 50,
    right: 16,

    zIndex: 999,

    width: 42,
    height: 42,

    borderRadius: 21,

    borderWidth: 1.5,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },

  icono: {
    fontSize: 18,
  },

});