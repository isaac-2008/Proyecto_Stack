import React, { useCallback, useRef } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  Animated,
  Easing,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { PILOTOS } from '../../data';

export default function Lista({ navigation }) {

  // ============================================================
  // ANIMACIONES
  // ============================================================

  const pantalla = useRef(new Animated.Value(0)).current;

  const luz1 = useRef(new Animated.Value(0)).current;
  const luz2 = useRef(new Animated.Value(0)).current;
  const luz3 = useRef(new Animated.Value(0)).current;
  const luz4 = useRef(new Animated.Value(0)).current;
  const luz5 = useRef(new Animated.Value(0)).current;

  const numero = useRef(new Animated.Value(0)).current;

  const flash = useRef(new Animated.Value(0)).current;

  const velocidad = useRef(new Animated.Value(0)).current;

  const contenido = useRef(new Animated.Value(0)).current;

  const logo = useRef(new Animated.Value(0)).current;

  // ============================================================
  // ANIMACIÓN CADA VEZ QUE ENTRAMOS A PILOTOS
  // ============================================================

  useFocusEffect(
    useCallback(() => {

      pantalla.setValue(0);

      luz1.setValue(0);
      luz2.setValue(0);
      luz3.setValue(0);
      luz4.setValue(0);
      luz5.setValue(0);

      numero.setValue(0);
      flash.setValue(0);
      velocidad.setValue(0);

      contenido.setValue(0);
      logo.setValue(0);

      Animated.sequence([

        Animated.timing(pantalla, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),

        Animated.timing(luz1, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),

        Animated.timing(luz2, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),

        Animated.timing(luz3, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),

        Animated.timing(luz4, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),

        Animated.timing(luz5, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),

        Animated.delay(450),

        Animated.parallel([

          Animated.timing(luz1, {
            toValue: 0,
            duration: 80,
            useNativeDriver: true,
          }),

          Animated.timing(luz2, {
            toValue: 0,
            duration: 80,
            useNativeDriver: true,
          }),

          Animated.timing(luz3, {
            toValue: 0,
            duration: 80,
            useNativeDriver: true,
          }),

          Animated.timing(luz4, {
            toValue: 0,
            duration: 80,
            useNativeDriver: true,
          }),

          Animated.timing(luz5, {
            toValue: 0,
            duration: 80,
            useNativeDriver: true,
          }),

          Animated.sequence([
            Animated.timing(flash, {
              toValue: 1,
              duration: 50,
              useNativeDriver: true,
            }),

            Animated.timing(flash, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),

          Animated.timing(velocidad, {
            toValue: 1,
            duration: 650,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),

          Animated.timing(numero, {
            toValue: 1,
            duration: 450,
            easing: Easing.out(Easing.back(1.5)),
            useNativeDriver: true,
          }),

        ]),

        Animated.parallel([

          Animated.timing(contenido, {
            toValue: 1,
            duration: 550,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),

          Animated.timing(logo, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.back(1.2)),
            useNativeDriver: true,
          }),

        ]),

      ]).start();

    }, [])
  );

  // ============================================================
  // RENDER DE CADA PILOTO
  // ============================================================

  const renderPiloto = ({ item }) => {

    return (
      <Animated.View
        style={[
          styles.cardWrapper,
          {
            opacity: contenido,

            transform: [
              {
                translateX: contenido.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },

              {
                scale: contenido.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.96, 1],
                }),
              },
            ],
          },
        ]}
      >

        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate('Detalles', {
              piloto: item,
            })
          }
        >

          {/* FOTO */}

          <View style={styles.fotoContainer}>

            {item.imagen ? (
              <Image
                source={{ uri: item.imagen }}
                style={styles.foto}
              />
            ) : (
              <View style={styles.fotoVacia}>
                <Text style={styles.fotoInicial}>
                  {item.nombre?.charAt(0)}
                </Text>
              </View>
            )}

          </View>

          {/* INFORMACIÓN */}

          <View style={styles.info}>

            <Text style={styles.nombre}>
              {item.nombre}
            </Text>

            <Text style={styles.escuderia}>
              {item.escuderia}
            </Text>

          </View>

          {/* NÚMERO */}

          <View style={styles.numeroPiloto}>
            <Text style={styles.numeroTexto}>
              {item.numero}
            </Text>
          </View>

        </Pressable>

      </Animated.View>
    );
  };

  // ============================================================
  // PANTALLA
  // ============================================================

  return (
    <View style={styles.container}>

      {/* INTRO F1 */}

      <Animated.View
        style={[
          styles.intro,

          {
            opacity: pantalla,

            transform: [
              {
                scale: pantalla.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1.08, 1],
                }),
              },
            ],
          },
        ]}
      >

        <View style={styles.fondoRojo} />

        {/* LÍNEAS DE VELOCIDAD */}

        <Animated.View
          style={[
            styles.velocidad,

            {
              opacity: velocidad,

              transform: [
                {
                  translateX: velocidad.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-500, 500],
                  }),
                },
              ],
            },
          ]}
        >

          <View style={styles.linea1} />
          <View style={styles.linea2} />
          <View style={styles.linea3} />
          <View style={styles.linea4} />

        </Animated.View>

        {/* SEMÁFORO */}

        <View style={styles.semaforo}>

          <View style={styles.cajaLuces}>

            <Animated.View
              style={[
                styles.luz,
                styles.roja,
                {
                  opacity: luz1,
                  transform: [
                    {
                      scale: luz1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.65, 1],
                      }),
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.luz,
                styles.roja,
                {
                  opacity: luz2,
                  transform: [
                    {
                      scale: luz2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.65, 1],
                      }),
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.luz,
                styles.roja,
                {
                  opacity: luz3,
                  transform: [
                    {
                      scale: luz3.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.65, 1],
                      }),
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.luz,
                styles.roja,
                {
                  opacity: luz4,
                  transform: [
                    {
                      scale: luz4.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.65, 1],
                      }),
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.luz,
                styles.roja,
                {
                  opacity: luz5,
                  transform: [
                    {
                      scale: luz5.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.65, 1],
                      }),
                    },
                  ],
                },
              ]}
            />

          </View>

        </View>

        {/* TEXTO CENTRAL */}

        <Animated.View
          style={[
            styles.tituloIntro,

            {
              opacity: numero,

              transform: [
                {
                  scale: numero.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },

                {
                  translateY: numero.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >

          <Text style={styles.formula}>
            FORMULA 1
          </Text>

          <Text style={styles.pilotosTitulo}>
            PILOTOS
          </Text>

          <Text style={styles.ready}>
            THE GRID IS READY
          </Text>

        </Animated.View>

        {/* FLASH DE LA SALIDA */}

        <Animated.View
          pointerEvents="none"
          style={[
            styles.flash,

            {
              opacity: flash,
            },
          ]}
        />

      </Animated.View>

      {/* LISTA */}

      <Animated.View
        style={[
          styles.lista,

          {
            opacity: contenido,

            transform: [
              {
                translateY: contenido.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                }),
              },
            ],
          },
        ]}
      >

        <FlatList
          data={PILOTOS}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderPiloto}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listaContenido}
        />

      </Animated.View>

    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0b0b0f',
  },

  // INTRO

  intro: {
    height: 225,
    backgroundColor: '#08080b',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ff1801',
  },

  fondoRojo: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: '#ff1801',
    opacity: 0.07,
    transform: [
      {
        rotate: '20deg',
      },
    ],
  },

  // VELOCIDAD

  velocidad: {
    position: 'absolute',
    left: -100,
    top: 40,
    width: 700,
    gap: 12,
    transform: [
      {
        rotate: '-7deg',
      },
    ],
  },

  linea1: {
    height: 2,
    width: 350,
    backgroundColor: '#ff1801',
    opacity: 0.35,
  },

  linea2: {
    height: 1,
    width: 230,
    backgroundColor: '#ffffff',
    opacity: 0.25,
    marginLeft: 130,
  },

  linea3: {
    height: 3,
    width: 450,
    backgroundColor: '#ff1801',
    opacity: 0.25,
  },

  linea4: {
    height: 1,
    width: 180,
    backgroundColor: '#ffffff',
    opacity: 0.2,
    marginLeft: 200,
  },

  // SEMÁFORO

  semaforo: {
    position: 'absolute',
    top: 18,
    backgroundColor: '#141419',
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#303038',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },

  cajaLuces: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  luz: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#2b1010',
  },

  roja: {
    backgroundColor: '#ff1801',
    shadowColor: '#ff1801',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 12,
  },

  // TÍTULO

  tituloIntro: {
    alignItems: 'center',
    marginTop: 35,
  },

  formula: {
    color: '#ff1801',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 5,
    marginBottom: 2,
  },

  pilotosTitulo: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 2,
  },

  ready: {
    color: '#888',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 4,
    marginTop: 5,
  },

  // FLASH

  flash: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
  },

  // LISTA

  lista: {
    flex: 1,
    backgroundColor: '#0b0b0f',
  },

  listaContenido: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 100,
  },

  // TARJETAS

  cardWrapper: {
    marginBottom: 10,
  },

  card: {
    height: 78,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b1a21',
    borderRadius: 13,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#26252d',
    overflow: 'hidden',
  },

  // FOTO

  fotoContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#3b3b3f',
    marginRight: 13,
    borderWidth: 2,
    borderColor: '#292830',
  },

  foto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  fotoVacia: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },

  fotoInicial: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },

  // INFORMACIÓN

  info: {
    flex: 1,
  },

  nombre: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },

  escuderia: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },

  // NÚMERO

  numeroPiloto: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#303039',
  },

  numeroTexto: {
    color: '#777',
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
  },

});