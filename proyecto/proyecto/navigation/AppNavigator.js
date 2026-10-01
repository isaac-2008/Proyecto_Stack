import React, { useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MainTab from './MainTab';
import { ThemeContext } from '../theme/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const Drawer = createDrawerNavigator();

// --- AUTO DE F1 DIBUJADO CON VIEWS (sin imagenes externas) ---
function F1Car({ size = 70, color = '#FF1801' }) {
  const w = size;
  const h = size * 0.42;

  return (
    <View style={{ width: w + h * 0.5, height: h + 12 }}>
      {/* aleron trasero */}
      <View style={{ position: 'absolute', top: h * 0.02, left: 0, width: w * 0.12, height: h * 0.6, backgroundColor: '#17181C', borderRadius: 2 }} />
      {/* carroceria */}
      <View style={{ position: 'absolute', top: h * 0.2, left: w * 0.08, width: w * 0.86, height: h * 0.48, backgroundColor: color, borderRadius: h * 0.24 }} />
      {/* cabina / cockpit */}
      <View style={{ position: 'absolute', top: 0, left: w * 0.4, width: w * 0.26, height: h * 0.42, backgroundColor: '#101013', borderTopLeftRadius: h * 0.3, borderTopRightRadius: h * 0.3 }} />
      {/* aleron delantero */}
      <View style={{ position: 'absolute', top: h * 0.56, right: 0, width: w * 0.18, height: h * 0.18, backgroundColor: '#17181C', borderRadius: 2 }} />
      {/* ruedas */}
      <View style={{ position: 'absolute', bottom: 0, left: w * 0.1, width: h * 0.42, height: h * 0.42, borderRadius: h * 0.21, backgroundColor: '#101013' }} />
      <View style={{ position: 'absolute', bottom: 0, right: w * 0.14, width: h * 0.42, height: h * 0.42, borderRadius: h * 0.21, backgroundColor: '#101013' }} />
    </View>
  );
}

const CARS = [
  { color: '#FF1801', size: 80, top: '34%', duration: 900, delay: 0 },
  { color: '#3671C6', size: 64, top: '48%', duration: 1050, delay: 130 },
  { color: '#F58020', size: 52, top: '60%', duration: 1200, delay: 260 },
];

// --- 3 AUTOS DE F1 CRUZANDO LA PANTALLA + BOTON DE VOLVER ---
export function ScreenWrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const carAnims = useRef(CARS.map(() => new Animated.Value(0))).current;

  const playCross = useCallback(() => {
    const animations = CARS.map((car, i) => {
      carAnims[i].setValue(0);
      return Animated.timing(carAnims[i], {
        toValue: 1,
        duration: car.duration,
        delay: car.delay,
        useNativeDriver: true,
      });
    });
    Animated.parallel(animations).start();
  }, [carAnims]);

  // Los autos vuelven a cruzar cada vez que la pantalla/pestaña toma foco
  useFocusEffect(
    useCallback(() => {
      playCross();
    }, [playCross])
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {children}

      {canGoBack && (
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.cardBg, borderColor: theme.primary }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={20} color={theme.primary} />
        </TouchableOpacity>
      )}

      <FlatList
        data={CARS}
        keyExtractor={(_, index) => `car-${index}`}
        pointerEvents="none"
        scrollEnabled={false}
        style={styles.carsLayer}
        renderItem={({ item: car, index: i }) => {
          const translateX = carAnims[i].interpolate({
            inputRange: [0, 1],
            outputRange: [-(car.size + 60), SCREEN_WIDTH + (car.size + 60)],
          });
          const opacity = carAnims[i].interpolate({
            inputRange: [0, 0.05, 0.92, 1],
            outputRange: [0, 1, 1, 0],
          });

          return (
            <Animated.View
              style={[styles.carLane, { top: car.top, opacity, transform: [{ translateX }] }]}
            >
              <View style={[styles.carGhost, { backgroundColor: car.color, width: car.size * 0.65, height: car.size * 0.16 }]} />
              <F1Car size={car.size} color={car.color} />
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

// --- MENÚ LATERAL ---
function CustomDrawerContent(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.cardBg }}>
      <View style={[styles.drawerHeader, { borderBottomColor: theme.primary }]}>
        <Text style={styles.f1Logo}>🏎️ F1 HUB</Text>
        <Text style={[styles.drawerSub, { color: theme.subtext }]}>Campeonato Mundial 2026</Text>
      </View>

      <DrawerItemList {...props} />

      <View style={styles.infoSection}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>📊 MUNDIAL DE PILOTOS</Text>
        <View style={styles.rankRow}>
          <Text style={[styles.rankText, { color: theme.text }]}>1. M. Verstappen</Text>
          <Text style={[styles.ptsText, { color: theme.subtext }]}>301 pts</Text>
        </View>
        <View style={styles.rankRow}>
          <Text style={[styles.rankText, { color: theme.text }]}>2. L. Norris</Text>
          <Text style={[styles.ptsText, { color: theme.subtext }]}>249 pts</Text>
        </View>
        <View style={styles.rankRow}>
          <Text style={[styles.rankText, { color: theme.text }]}>3. C. Leclerc</Text>
          <Text style={[styles.ptsText, { color: theme.subtext }]}>217 pts</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.primary, marginTop: 20 }]}>🏁 PRÓXIMA CARRERA</Text>
        <View style={[styles.gpCard, { backgroundColor: theme.bg }]}>
          <Text style={[styles.gpName, { color: theme.text }]}>GP de Singapur 🇸🇬</Text>
          <Text style={{ color: theme.subtext, fontSize: 12 }}>Circuito Marina Bay</Text>
          <Text style={{ color: '#22C55E', fontSize: 12, marginTop: 4, fontWeight: 'bold' }}>☀️ 29°C - Pista Seca</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function AppNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: theme.headerBg },
        headerTintColor: theme.text,
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.text,
      }}
    >
      <Drawer.Screen
        name="MenuPrincipal"
        component={MainTab}
        options={{ title: 'Inicio & Navegación' }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },

  carsLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  carLane: {
    position: 'absolute',
    left: 0,
  },
  carGhost: {
    position: 'absolute',
    top: '30%',
    left: -22,
    borderRadius: 8,
    opacity: 0.22,
  },

  backBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 1000,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  drawerHeader: { padding: 20, borderBottomWidth: 2, marginBottom: 10 },
  f1Logo: { fontSize: 24, fontWeight: '900', color: '#FF1801' },
  drawerSub: { fontSize: 12, marginTop: 2 },
  infoSection: { padding: 20, marginTop: 10 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 10 },
  rankRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  rankText: { fontSize: 14, fontWeight: '600' },
  ptsText: { fontSize: 13 },
  gpCard: { padding: 12, borderRadius: 10, marginTop: 5 },
});