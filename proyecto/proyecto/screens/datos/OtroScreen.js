import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from 'react-native';

const DATOS = [
  {
    id: '1',
    titulo: 'ALERÓN DELANTERO',
    descripcion:
      'Controla el flujo de aire en la parte frontal del monoplaza.',
    imagen:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    titulo: 'ALERÓN TRASERO',
    descripcion:
      'Genera carga aerodinámica y ayuda a mantener estable el coche.',
    imagen:
      'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    titulo: 'EFECTO SUELO',
    descripcion:
      'El fondo del coche utiliza el flujo de aire para generar carga.',
    imagen:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '4',
    titulo: 'DIFUSOR',
    descripcion:
      'Ayuda a controlar el aire que sale de la parte inferior del coche.',
    imagen:
      'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function OtroScreen() {

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => alert(item.titulo + '\n\n' + item.descripcion)}
    >
      <Image
        source={{ uri: item.imagen }}
        style={styles.image}
      />

      <View style={styles.overlay} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {item.titulo}
        </Text>

        <Text style={styles.cardDescription}>
          {item.descripcion}
        </Text>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            VER CÓMO FUNCIONA →
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={DATOS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}

        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.mini}>
                FORMULA 1
              </Text>

              <Text style={styles.title}>
                AERODINÁMICA
              </Text>

              <Text style={styles.subtitle}>
                DESCUBRE CÓMO FUNCIONA UN MONOPLAZA
              </Text>
            </View>

            <View style={styles.intro}>
              <Text style={styles.introTitle}>
                EL AIRE TAMBIÉN CORRE
              </Text>

              <Text style={styles.introText}>
                La aerodinámica es una de las partes más importantes de un
                monoplaza de Fórmula 1. Cada superficie está diseñada para
                controlar el aire.
              </Text>
            </View>
          </View>
        }

        ListFooterComponent={
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>
              FORMULA 1
            </Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#08080b',
  },

  content: {
    paddingBottom: 50,
  },

  header: {
    paddingTop: 30,
    paddingHorizontal: 18,
    paddingBottom: 22,
    backgroundColor: '#111116',
    borderBottomWidth: 2,
    borderBottomColor: '#e10600',
  },

  mini: {
    color: '#e10600',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 4,
  },

  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
    fontStyle: 'italic',
    marginTop: 4,
  },

  subtitle: {
    color: '#77777f',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 6,
  },

  intro: {
    paddingHorizontal: 18,
    paddingVertical: 22,
  },

  introTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },

  introText: {
    color: '#9999a1',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  card: {
    height: 230,
    marginHorizontal: 14,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1b1a20',
    borderWidth: 1,
    borderColor: '#292830',
  },

  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.58)',
  },

  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
  },

  cardTitle: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '900',
    fontStyle: 'italic',
  },

  cardDescription: {
    color: '#d0d0d3',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  button: {
    alignSelf: 'flex-start',
    marginTop: 13,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e10600',
    borderRadius: 6,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  bottom: {
    alignItems: 'center',
    paddingTop: 20,
  },

  bottomText: {
    color: '#e10600',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 4,
  },

});