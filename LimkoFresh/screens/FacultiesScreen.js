// screens/FacultiesScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../theme';
import { FACULTIES } from '../data';

const { width } = Dimensions.get('window');
const TILE = (width - 48) / 2;

export default function FacultiesScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Header title="Faculties" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.pageHead, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Text style={[styles.headSub, { color: colors.accent }]}>Limkokwing University</Text>
          <Text style={[styles.headTitle, { color: colors.text }]}>Our Faculties</Text>
          <View style={[styles.headLine, { backgroundColor: colors.accent }]} />
        </View>

        <View style={styles.grid}>
          {FACULTIES.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[styles.tile, { width: TILE, height: TILE * 1.15 }]}
              activeOpacity={0.88}
              onPress={() => navigation.navigate('Courses', { faculty: f })}
            >
              {/* handle both remote URIs and local static assets */}
              <Image
                source={
                  typeof f.image === 'string'
                    ? { uri: f.image }
                    : f.image
                }
                style={styles.tileImage}
              />
              <View style={styles.tileOverlay} />
              <Text style={styles.tileName}>{f.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  pageHead: { paddingTop: 20, paddingHorizontal: 24, paddingBottom: 20, borderBottomWidth: 1 },
  headSub: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  headTitle: { fontFamily: 'Georgia', fontSize: 32, fontStyle: 'italic' },
  headLine: { height: 2, width: 36, marginTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 16 },
  tile: { overflow: 'hidden', position: 'relative' },
  tileImage: { width: '100%', height: '100%', position: 'absolute' },
  tileOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(0,0,0,0.62)' },
  tileName: { position: 'absolute', bottom: 12, left: 10, right: 10, fontFamily: 'Georgia', fontSize: 12, fontStyle: 'italic', color: '#ffffff', textAlign: 'center', lineHeight: 17 },
});
