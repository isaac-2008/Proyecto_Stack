import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../../theme/ThemeContext';

export default function Detalles({ route }) {
  const { piloto } = route.params;
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Image source={{ uri: piloto.imagen }} style={styles.image} />
      <Text style={[styles.title, { color: theme.primary }]}>{piloto.nombre}</Text>
      <View style={[styles.detailsCard, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.detailText, { color: theme.text }]}>Escudería: {piloto.escuderia}</Text>
        <Text style={[styles.detailText, { color: theme.text }]}>Número: #{piloto.numero}</Text>
        <Text style={[styles.detailText, { color: theme.text }]}>Victorias: {piloto.victorias}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  image: { width: 160, height: 160, borderRadius: 80, marginBottom: 20, backgroundColor: '#444' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  detailsCard: { width: '100%', padding: 20, borderRadius: 12 },
  detailText: { fontSize: 18, marginBottom: 8 }
});