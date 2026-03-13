// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions, useColorScheme } from 'react-native';

const { height } = Dimensions.get('window');
const LOGO = 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Limkokwing_University_logo.png/250px-Limkokwing_University_logo.png';

export default function SplashScreen({ onDone }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY = useRef(new Animated.Value(16)).current;
  const shimmerX = useRef(new Animated.Value(-200)).current;
  const scheme = useColorScheme();
  const dark = scheme === 'dark';

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.delay(100),
      Animated.timing(shimmerX, { toValue: 300, duration: 800, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(taglineOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(taglineY, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.delay(800),
    ]).start(() => { if (onDone) onDone(); });
  }, []);

  return (
    <View style={[styles.root, { backgroundColor: dark ? '#0A0A0A' : '#1a237e' }]}>
      {dark && <View style={styles.glow} />}
      <View style={styles.center}>
        <Animated.Image source={{ uri: LOGO }} style={[styles.logo, { opacity: logoOpacity }]} resizeMode="contain" />
        <View style={styles.shimmerTrack}>
          <Animated.View style={[styles.shimmer, { backgroundColor: dark ? '#C9A84C' : 'rgba(255,255,255,0.7)', transform: [{ translateX: shimmerX }] }]} />
        </View>
        <Animated.Text style={[styles.tagline, { color: dark ? '#C9A84C' : '#ffffff', opacity: taglineOpacity, transform: [{ translateY: taglineY }] }]}>
          BE THE BEST
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  glow: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(201,168,76,0.07)', alignSelf: 'center', top: height / 2 - 150 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  logo: { width: 180, height: 90, marginBottom: 24 },
  shimmerTrack: { width: 200, height: 2, overflow: 'hidden', marginBottom: 20 },
  shimmer: { width: 80, height: 2 },
  tagline: { fontFamily: 'Georgia', fontSize: 18, letterSpacing: 8, textTransform: 'uppercase' },
});
