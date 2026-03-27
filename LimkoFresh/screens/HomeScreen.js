// screens/HomeScreen.js
import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image,
  StyleSheet, TextInput, Dimensions, FlatList
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../theme';
import { NEWS, FACULTIES } from '../data';
import logoImg from '../assets/logo.png'; 

const { width } = Dimensions.get('window');
const NEWS_W = width - 48;

const CARDS = [
  { id: 'faculties', label: 'Faculty', subtitle: 'Explore all programmes', screen: 'Faculties' },
  { id: 'application', label: 'Application', subtitle: 'Apply for admission', screen: 'Application' },
  { id: 'assessment', label: 'Career\nAssessment', subtitle: 'Find your direction', screen: 'CareerQuiz' },
  { id: 'contact us', label: 'Contact Us', subtitle: 'Contact Us', screen: 'Contacts' },
];

export default function HomeScreen({ navigation }) {
  const { colors, dark } = useTheme();
  const [search, setSearch] = useState('');
  const sliderRef = useRef(null);
  const sliderIndex = useRef(0);

  const searchResults = search.trim().length >= 1
    ? FACULTIES.flatMap((f) => {
        const out = [];
        if (f.name.toLowerCase().includes(search.trim().toLowerCase())) {
          out.push({ type: 'faculty', label: f.name, sub: f.courses.length + ' programmes', faculty: f });
        }
        f.courses.forEach((c) => {
          if (c.name.toLowerCase().includes(search.trim().toLowerCase())) {
            out.push({ type: 'course', label: c.name, sub: f.name, faculty: f, course: c });
          }
        });
        return out;
      })
    : [];

  useEffect(() => {
    const interval = setInterval(() => {
      sliderIndex.current = (sliderIndex.current + 1) % NEWS.length;
      try { sliderRef.current?.scrollToIndex({ index: sliderIndex.current, animated: true }); } catch {}
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleResultPress = (item) => {
    setSearch('');
    if (item.type === 'faculty') navigation.navigate('Courses', { faculty: item.faculty });
    else navigation.navigate('CourseDetail', { course: item.course });
  };

  const d = {
    root: [styles.root, { backgroundColor: colors.background }],
    welcomeBox: [styles.welcomeBox, { backgroundColor: colors.surface, borderBottomColor: colors.border }],
    welcomeSub: [styles.welcomeSub, { color: colors.accent }],
    welcomeTitle: [styles.welcomeTitle, { color: colors.text }],
    welcomeTagline: [styles.welcomeTagline, { color: colors.textSub }],
    searchWrap: [styles.searchWrap, { backgroundColor: colors.surface, borderBottomColor: colors.border }],
    searchInput: [styles.searchInput, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }],
    clearText: [styles.clearText, { color: colors.textMuted }],
    resultsBox: [styles.resultsBox, { backgroundColor: colors.card, borderColor: colors.border }],
    resultLabel: [styles.resultLabel, { color: colors.text }],
    resultSub: [styles.resultSub, { color: colors.textMuted }],
    resultType: [styles.resultType, { color: colors.accent }],
    noResults: [styles.noResults, { backgroundColor: colors.card, borderColor: colors.border }],
    noResultsText: [styles.noResultsText, { color: colors.textMuted }],
    sectionLabel: [styles.sectionLabel, { color: colors.textMuted }],
    card: [styles.card, { backgroundColor: colors.card, borderColor: colors.border }],
    cardTopLine: [styles.cardTopLine, { backgroundColor: colors.accent }],
    cardLabel: [styles.cardLabel, { color: colors.text }],
    cardSub: [styles.cardSub, { color: colors.textMuted }],
  };

  return (
    <View style={d.root}>
      <Header logo={logoImg} /> // pass local logo to Header 
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        <View style={d.welcomeBox}>
          <Text style={d.welcomeSub}>Welcome to</Text>
          <Text style={d.welcomeTitle}>Limkokwing</Text>
          <Text style={d.welcomeTagline}>Where Innovation Meets Excellence</Text>
        </View>

        <View style={d.searchWrap}>
          <TextInput
            style={d.searchInput}
            placeholder="Search programmes, faculties..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={(text) => setSearch(text)}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} style={styles.clearBtn}>
              <Text style={d.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {search.trim().length >= 1 && searchResults.length > 0 && (
          <View style={d.resultsBox}>
            {searchResults.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.resultRow,
                  { borderBottomColor: colors.border, borderBottomWidth: i < searchResults.length - 1 ? 1 : 0 },
                ]}
                onPress={() => handleResultPress(item)}
              >
                <View style={styles.resultTextWrap}>
                  <Text style={d.resultLabel}>{item.label}</Text>
                  <Text style={d.resultSub}>{item.sub}</Text>
                </View>
                <Text style={d.resultType}>{item.type === 'faculty' ? 'Faculty' : 'Course'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {search.trim().length >= 1 && searchResults.length === 0 && (
          <View style={d.noResults}>
            <Text style={d.noResultsText}>No results found for "{search}"</Text>
          </View>
        )}

        <Text style={d.sectionLabel}>Quick Access</Text>
        <View style={styles.cardsGrid}>
          {CARDS.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={d.card}
              onPress={() => card.screen && navigation.navigate(card.screen)}
              activeOpacity={0.85}
            >
              {dark && <View style={d.cardTopLine} />}
              <Text style={d.cardLabel}>{card.label}</Text>
              <Text style={d.cardSub}>{card.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={d.sectionLabel}>News & Events</Text>
        <FlatList
          ref={sliderRef}
          data={NEWS}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={NEWS_W + 16}
          decelerationRate="fast"
          contentContainerStyle={styles.newsList}
          onScrollToIndexFailed={() => {}}
          renderItem={({ item }) => (
            <View style={[styles.newsCard, { width: NEWS_W }]}>
              <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.newsImage}/>
              <View style={styles.newsOverlay} />
              <View style={styles.newsContent}>
                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsLink}>Read More</Text>
              </View>
            </View>
          )}
        />

        <View style={styles.spacer} />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  welcomeBox: { paddingTop: 20, paddingHorizontal: 24, paddingBottom: 20, borderBottomWidth: 1 },
  welcomeSub: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  welcomeTitle: { fontFamily: 'Georgia', fontSize: 34, fontStyle: 'italic', lineHeight: 40 },
  welcomeTagline: { fontFamily: 'Georgia', fontSize: 13, marginTop: 4 },
  searchWrap: { paddingHorizontal: 24, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 },
  searchInput: { flex: 1, borderRadius: 6, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 11, fontFamily: 'Georgia', fontSize: 14 },
  clearBtn: { paddingLeft: 12 },
  clearText: { fontFamily: 'Georgia', fontSize: 13 },
  resultsBox: { marginHorizontal: 24, borderWidth: 1, borderTopWidth: 0 },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 },
  resultTextWrap: { flex: 1, marginRight: 12 },
  resultLabel: { fontFamily: 'Georgia', fontSize: 14, marginBottom: 2 },
  resultSub: { fontFamily: 'Georgia', fontSize: 11 },
  resultType: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' },
  noResults: { marginHorizontal: 24, borderWidth: 1, borderTopWidth: 0, padding: 16 },
  noResultsText: { fontFamily: 'Georgia', fontSize: 13, fontStyle: 'italic' },
  sectionLabel: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', paddingHorizontal: 24, paddingTop: 24, paddingBottom: 12 },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12, marginBottom: 8 },
  card: { width: (width - 52) / 2, padding: 20, borderWidth: 1, overflow: 'hidden', elevation: 2 },
  cardTopLine: { position: 'absolute', top: 0, left: 0, right: 0, height: 1.5 },
  cardLabel: { fontFamily: 'Georgia', fontSize: 17, fontStyle: 'italic', lineHeight: 24, marginBottom: 6 },
  cardSub: { fontFamily: 'Georgia', fontSize: 11, lineHeight: 16 },
  newsList: { paddingHorizontal: 24, gap: 16 },
  newsCard: { height: 220, overflow: 'hidden' },
  newsImage: { width: '100%', height: '50%', position: 'absolute' },
  newsOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', backgroundColor: 'rgba(0,0,0,0.6)' },
  newsContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16 },
  newsDate: { fontFamily: 'Georgia', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 4 },
  newsTitle: { fontFamily: 'Georgia', fontSize: 16, fontWeight: '700', color: '#ffffff', lineHeight: 22, marginBottom: 8 },
  newsLink: { fontFamily: 'Georgia', fontSize: 12, color: '#C9A84C' },
  spacer: { height: 32 },
});
