// screens/CourseDetailScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Linking, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../theme';

const MAX = 6;

const getVideoId = (url) => {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

export default function CourseDetailScreen({ route, navigation }) {
  const { course } = route.params;
  const { colors } = useTheme();
  const [rating, setRating] = useState(0);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const videoId = getVideoId(course.video);
  const thumbnailUrl = videoId
    ? 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg'
    : null;

  const openVideo = () => Linking.openURL(course.video);

  const download = async () => {
    setSaving(true);
    try {
      const text = [
        'LIMKOKWING UNIVERSITY OF CREATIVE TECHNOLOGY',
        '',
        'Programme: ' + course.name,
        'Duration: ' + course.duration,
        '',
        'About:', course.description,
        '',
        'Entry Requirements:', course.requirements,
        '',
        'Career Outcomes:', course.outcomes,
        '',
        'Contact: +266 22315767 | www.limkokwing.net',
      ].join('\n');
      const path = FileSystem.documentDirectory + course.id + '.txt';
      await FileSystem.writeAsStringAsync(path, text, { encoding: FileSystem.EncodingType.UTF8 });
      const ok = await Sharing.isAvailableAsync();
      if (ok) await Sharing.shareAsync(path, { mimeType: 'text/plain' });
      else Alert.alert('Saved', 'Brochure saved.');
    } catch {
      Alert.alert('Error', 'Could not save brochure.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Header title={course.name} />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.hero}>
          <Image source={{ uri: course.image }} style={styles.heroImg} />
          <View style={styles.heroOverlay} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={[styles.heroDuration, { color: 'rgba(255,255,255,0.65)' }]}>{course.duration}</Text>
            <Text style={styles.heroTitle}>{course.name}</Text>
          </View>
        </View>

        <View style={styles.body}>

          <TouchableOpacity
            style={[styles.saveToggle, { borderBottomColor: colors.border }]}
            onPress={() => setSaved(!saved)}
          >
            <Text style={[styles.saveText, { color: saved ? colors.primary : colors.textMuted }]}>
              {saved ? 'Saved to your list' : 'Save this programme'}
            </Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>About this Programme</Text>
            <View style={[styles.sectionLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.bodyText, { color: colors.text }]}>{course.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Entry Requirements</Text>
            <View style={[styles.sectionLine, { backgroundColor: colors.border }]} />
            <View style={[styles.reqBox, { borderLeftColor: colors.accent }]}>
              <Text style={[styles.reqText, { color: colors.textSub }]}>{course.requirements}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Career Outcomes</Text>
            <View style={[styles.sectionLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.bodyText, { color: colors.text }]}>{course.outcomes}</Text>
          </View>

          {/* video preview section */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Programme Preview</Text>
            <View style={[styles.sectionLine, { backgroundColor: colors.border }]} />

            <TouchableOpacity style={styles.videoThumb} onPress={openVideo} activeOpacity={0.85}>
              {thumbnailUrl ? (
                <Image source={{ uri: thumbnailUrl }} style={styles.thumbImage} />
              ) : (
                <View style={[styles.thumbFallback, { backgroundColor: colors.card }]} />
              )}

              {/* dark overlay so the icon stands out */}
              <View style={styles.thumbOverlay} />

              {/* youtube play button */}
              <View style={styles.ytBtnWrap}>
                {/* red youtube badge */}
                <View style={styles.ytBadge}>
                  <Text style={styles.ytBadgeText}>▶</Text>
                </View>
                <Text style={styles.ytLabel}>Watch on YouTube</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Rate this Programme</Text>
            <View style={[styles.sectionLine, { backgroundColor: colors.border }]} />
            <View style={styles.dots}>
              {[1,2,3,4,5,6].map((n) => (
                <View
                  key={n}
                  style={[
                    styles.dot,
                    { borderColor: colors.accent },
                    n <= rating && { backgroundColor: colors.accent },
                  ]}
                />
              ))}
            </View>
            <Text style={[styles.ratingScore, { color: colors.text }]}>{rating} out of {MAX}</Text>
            <TouchableOpacity
              style={[styles.rateBtn, { borderColor: rating >= MAX ? colors.border : colors.accent }]}
              onPress={() => rating < MAX && setRating(r => r + 1)}
              disabled={rating >= MAX}
            >
              <Text style={[styles.rateBtnText, { color: rating >= MAX ? colors.textMuted : colors.accent }]}>
                {rating >= MAX ? 'Maximum Rating Reached' : 'Press to Rate'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.applyBtn, { backgroundColor: colors.primary }]}
            onPress={() => Linking.openURL('https://www.limkokwing.net')}
          >
            <Text style={styles.applyBtnText}>Apply for this Programme</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadLink} onPress={download} disabled={saving}>
            <Text style={[styles.downloadLinkText, { color: colors.textMuted }]}>
              {saving ? 'Preparing...' : 'Download Programme Brochure'}
            </Text>
          </TouchableOpacity>

        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: { height: 260, position: 'relative', overflow: 'hidden' },
  heroImg: { width: '100%', height: '100%', position: 'absolute' },
  heroOverlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.65)' },
  backBtn: { position: 'absolute', top: 48, left: 20 },
  backText: { color: 'hsla(0, 0%, 100%, 0.80)', fontFamily: 'Georgia', fontSize: 14 },
  heroContent: { position: 'absolute', bottom: 28, left: 24, right: 24 },
  heroDuration: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 },
  heroTitle: { color: '#ffffff', fontFamily: 'Georgia', fontSize: 24, fontStyle: 'italic', lineHeight: 32 },
  body: { padding: 24 },
  saveToggle: { paddingVertical: 14, borderBottomWidth: 1, marginBottom: 4 },
  saveText: { fontFamily: 'Georgia', fontSize: 13 },
  section: { marginTop: 24 },
  sectionLabel: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 },
  sectionLine: { height: 1, marginBottom: 14 },
  bodyText: { fontFamily: 'Georgia', fontSize: 14, lineHeight: 23, opacity: 0.9 },
  reqBox: { borderLeftWidth: 2, paddingLeft: 14 },
  reqText: { fontFamily: 'Georgia', fontSize: 13, lineHeight: 22 },

  // youtube thumbnail player
  videoThumb: { width: '100%', height: 210, overflow: 'hidden', position: 'relative' },
  thumbImage: { width: '100%', height: '100%', position: 'absolute' },
  thumbFallback: { width: '100%', height: '100%', position: 'absolute' },
  thumbOverlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.35)' },
  ytBtnWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  ytBadge: {
    width: 64,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  ytBadgeText: { color: '#ffffff', fontSize: 20 },
  ytLabel: { color: '#ffffff', fontFamily: 'Georgia', fontSize: 12, letterSpacing: 1 },

  dots: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  dot: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, backgroundColor: 'transparent' },
  ratingScore: { fontFamily: 'Georgia', fontSize: 16, fontStyle: 'italic', marginBottom: 14 },
  rateBtn: { borderWidth: 1, paddingVertical: 14, alignItems: 'center', marginBottom: 8 },
  rateBtnText: { fontFamily: 'Georgia', fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase' },
  applyBtn: { paddingVertical: 16, alignItems: 'center', marginTop: 28 },
  applyBtnText: { color: '#ffffff', fontFamily: 'Georgia', fontSize: 14, letterSpacing: 1.5, textTransform: 'uppercase' },
  downloadLink: { alignItems: 'center', paddingVertical: 16 },
  downloadLinkText: { fontFamily: 'Georgia', fontSize: 12, textDecorationLine: 'underline' },
});