import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../navigation/AppNavigator';

export default function InicioScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <Text style={styles.badge}>TEMPORADA 2026</Text>
        <Text style={styles.title}>Fórmula 1 Hub</Text>
        <Text style={styles.sub}>
          Pasa de pantalla para ver girar la rueda de F1 y despliega el menú lateral para consultar posiciones.
        </Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, justifyContent: 'center', flex: 1 },
  badge: { color: '#FF1801', fontWeight: 'bold', fontSize: 12 },
  title: { fontSize: 32, fontWeight: '900', color: '#FFF', marginVertical: 8 },
  sub: { color: '#AAA', lineHeight: 22 }
});