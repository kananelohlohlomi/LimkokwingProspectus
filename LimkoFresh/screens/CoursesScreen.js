// screens/CoursesScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../theme';

const MAX = 6;

export default function CoursesScreen({ route, navigation }) {
  const { faculty } = route.params;
  const { colors, dark } = useTheme();
  const [ratings, setRatings] = useState(Object.fromEntries(faculty.courses.map((c) => [c.id, 0])));

  const rate = (id) => setRatings((prev) => ({ ...prev, [id]: Math.min(prev[id] + 1, MAX) }));

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Header title={faculty.name} />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.banner}>
          <Image source={
            typeof faculty.image === 'string'
              ? { uri: faculty.image }
              : faculty.image
          } style={styles.bannerImg} />
          <View style={styles.bannerOverlay} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.bannerContent}>
            <View style={[styles.bannerLine, { backgroundColor: colors.accent }]} />
            <Text style={styles.bannerTitle}>{faculty.name}</Text>
          </View>
        </View>

        <View style={[styles.listHead, { borderBottomColor: colors.border }]}>
          <Text style={[styles.listTitle, { color: colors.text }]}>Programmes Offered</Text>
          <Text style={[styles.listCount, { color: colors.textMuted }]}>{faculty.courses.length} programmes</Text>
        </View>

        <View style={styles.list}>
          {faculty.courses.map((course) => (
            <View key={course.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <TouchableOpacity onPress={() => navigation.navigate('CourseDetail', { course })}>
                <Image source={{ uri: course.image }} style={styles.courseImg} />
                <View style={styles.courseOverlay} />
                <Text style={styles.watchPreview}>Watch Preview</Text>
                <Text style={[styles.duration, { backgroundColor: 'rgba(0,0,0,0.6)', color: colors.accent }]}>{course.duration}</Text>
              </TouchableOpacity>

              <View style={styles.cardBody}>
                <TouchableOpacity onPress={() => navigation.navigate('CourseDetail', { course })}>
                  <Text style={[styles.courseName, { color: colors.text }]}>{course.name}</Text>
                </TouchableOpacity>
                <Text style={[styles.courseDesc, { color: colors.textSub }]} numberOfLines={3}>{course.description}</Text>

                <View style={styles.ratingRow}>
                  <View style={styles.dots}>
                    {[1,2,3,4,5,6].map((n) => (
                      <View key={n} style={[styles.dot, { borderColor: colors.accent, backgroundColor: n <= ratings[course.id] ? colors.accent : 'transparent' }]} />
                    ))}
                  </View>
                  <Text style={[styles.ratingNum, { color: colors.textMuted }]}>{ratings[course.id]}/{MAX}</Text>
                  <TouchableOpacity style={[styles.rateBtn, { borderColor: ratings[course.id] >= MAX ? colors.border : colors.accent }]} onPress={() => rate(course.id)} disabled={ratings[course.id] >= MAX}>
                    <Text style={[styles.rateBtnText, { color: ratings[course.id] >= MAX ? colors.textMuted : colors.accent }]}>{ratings[course.id] >= MAX ? 'Rated' : 'Rate'}</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.viewBtn, { borderTopColor: colors.border }]} onPress={() => navigation.navigate('CourseDetail', { course })}>
                  <Text style={[styles.viewBtnText, { color: colors.primary }]}>View Full Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  banner: { height: 220, position: 'relative', overflow: 'hidden' },
  bannerImg: { width: '100%', height: '100%', position: 'absolute' },
  bannerOverlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.65)' },
  backBtn: { position: 'absolute', top: 48, left: 20 },
  backText: { color: 'rgba(255,255,255,0.8)', fontFamily: 'Georgia', fontSize: 14 },
  bannerContent: { position: 'absolute', bottom: 28, left: 24, right: 24 },
  bannerLine: { height: 2, width: 28, marginBottom: 10 },
  bannerTitle: { color: '#ffffff', fontFamily: 'Georgia', fontSize: 20, fontStyle: 'italic', lineHeight: 28 },
  listHead: { padding: 24, paddingBottom: 12, borderBottomWidth: 1 },
  listTitle: { fontFamily: 'Georgia', fontSize: 20, fontStyle: 'italic', marginBottom: 2 },
  listCount: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase' },
  list: { padding: 24, gap: 24 },
  card: { borderWidth: 1, overflow: 'hidden' },
  courseImg: { width: '100%', height: 180 },
  courseOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.2)' },
  watchPreview: { position: 'absolute', top: 14, right: 14, color: 'rgba(255,255,255,0.85)', fontFamily: 'Georgia', fontSize: 11, letterSpacing: 1 },
  duration: { position: 'absolute', bottom: 12, right: 12, fontFamily: 'Georgia', fontSize: 11, paddingHorizontal: 8, paddingVertical: 2 },
  cardBody: { padding: 18 },
  courseName: { fontFamily: 'Georgia', fontSize: 17, fontStyle: 'italic', lineHeight: 24, marginBottom: 8 },
  courseDesc: { fontFamily: 'Georgia', fontSize: 13, lineHeight: 20, marginBottom: 16 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  dots: { flexDirection: 'row', gap: 5, flex: 1 },
  dot: { width: 10, height: 10, borderRadius: 5, borderWidth: 1 },
  ratingNum: { fontFamily: 'Georgia', fontSize: 11 },
  rateBtn: { borderWidth: 1, paddingVertical: 4, paddingHorizontal: 10 },
  rateBtnText: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 1 },
  viewBtn: { borderTopWidth: 1, paddingTop: 12 },
  viewBtnText: { fontFamily: 'Georgia', fontSize: 13 },
});
