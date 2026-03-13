// screens/CareerQuizScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';
import { useTheme } from '../theme';
import { QUIZ_QUESTIONS, FACULTIES } from '../data';

export default function CareerQuizScreen({ navigation }) {
  const { colors } = useTheme();
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState(null);

  const next = () => {
    if (!selected) return;
    const q = QUIZ_QUESTIONS[current];
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      const tally = {};
      Object.values(newAnswers).forEach((id) => { tally[id] = (tally[id] || 0) + 1; });
      const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
      const primary = FACULTIES.find((f) => f.id === sorted[0][0]);
      const secondary = sorted[1] ? FACULTIES.find((f) => f.id === sorted[1][0]) : null;
      setResults({ primary, secondary });
      setDone(true);
    }
  };

  const reset = () => { setStarted(false); setCurrent(0); setAnswers({}); setSelected(null); setDone(false); setResults(null); };

  const q = QUIZ_QUESTIONS[current];
  const progress = (current / QUIZ_QUESTIONS.length) * 100;

  if (!started) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <Header title="Career Assessment" />
        <ScrollView contentContainerStyle={styles.introWrap}>
          <Text style={[styles.introLabel, { color: colors.accent }]}>Career Assessment</Text>
          <View style={[styles.accentLine, { backgroundColor: colors.accent }]} />
          <Text style={[styles.introTitle, { color: colors.text }]}>Unsure About{'\n'}Your Path?</Text>
          <Text style={[styles.introText, { color: colors.textSub }]}>Answer a few structured questions about your interests, strengths and preferred environments. We will recommend faculties aligned with your profile.</Text>
          <TouchableOpacity style={[styles.beginBtn, { backgroundColor: colors.primary }]} onPress={() => setStarted(true)}>
            <Text style={styles.beginBtnText}>Begin Assessment</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  if (done && results) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <Header title="Your Results" />
        <ScrollView contentContainerStyle={styles.resultsWrap}>
          <Text style={[styles.resultsTitle, { color: colors.text }]}>Your Recommended Path</Text>
          <View style={[styles.accentLine, { backgroundColor: colors.accent }]} />

          {[{ tag: 'Primary Match', fac: results.primary, desc: 'Your interests and strengths align well with this faculty.' }, { tag: 'Secondary Option', fac: results.secondary, desc: 'This faculty also closely matches your profile.' }].filter(r => r.fac).map((r) => (
            <View key={r.fac.id} style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Image source={
                typeof r.fac.image === 'string'
                  ? { uri: r.fac.image }
                  : r.fac.image
              } style={styles.resultImg} />
              <View style={styles.resultBody}>
                <Text style={[styles.resultTag, { color: r.tag === 'Primary Match' ? colors.accent : colors.textMuted }]}>{r.tag}</Text>
                <Text style={[styles.resultFaculty, { color: colors.text }]}>{r.fac.name}</Text>
                <Text style={[styles.resultDesc, { color: colors.textSub }]}>{r.desc}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Courses', { faculty: r.fac })}>
                  <Text style={[styles.exploreBtn, { color: colors.primary }]}>Explore Faculty</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.retake} onPress={reset}>
            <Text style={[styles.retakeText, { color: colors.textMuted }]}>Retake Assessment</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Header title="Career Assessment" />
      <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
        <View style={[styles.progressFill, { backgroundColor: colors.primary, width: progress + '%' }]} />
      </View>
      <ScrollView contentContainerStyle={styles.questionWrap}>
        <Text style={[styles.questionCount, { color: colors.textMuted }]}>{current + 1} of {QUIZ_QUESTIONS.length}</Text>
        <Text style={[styles.question, { color: colors.text }]}>{q.question}</Text>
        <View style={styles.options}>
          {q.options.map((opt, i) => {
            const isSelected = selected === opt.faculty;
            return (
              <TouchableOpacity
                key={i}
                style={[styles.option, { backgroundColor: isSelected ? colors.primary : colors.card, borderColor: isSelected ? colors.primary : colors.border }]}
                onPress={() => setSelected(opt.faculty)}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionText, { color: isSelected ? '#ffffff' : colors.text }]}>{opt.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity style={[styles.nextBtn, { backgroundColor: selected ? colors.primary : colors.border }]} onPress={next} disabled={!selected}>
          <Text style={[styles.nextBtnText, { color: selected ? '#ffffff' : colors.textMuted }]}>{current === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  introWrap: { padding: 32, paddingTop: 40 },
  introLabel: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 },
  accentLine: { height: 2, width: 32, marginBottom: 20 },
  introTitle: { fontFamily: 'Georgia', fontSize: 34, fontStyle: 'italic', lineHeight: 42, marginBottom: 20 },
  introText: { fontFamily: 'Georgia', fontSize: 14, lineHeight: 24, marginBottom: 36 },
  beginBtn: { paddingVertical: 16, alignItems: 'center' },
  beginBtnText: { color: '#ffffff', fontFamily: 'Georgia', fontSize: 14, letterSpacing: 1.5, textTransform: 'uppercase' },
  progressTrack: { height: 3 },
  progressFill: { height: 3 },
  questionWrap: { padding: 32 },
  questionCount: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 },
  question: { fontFamily: 'Georgia', fontSize: 22, fontStyle: 'italic', lineHeight: 32, marginBottom: 32 },
  options: { gap: 12, marginBottom: 32 },
  option: { paddingVertical: 16, paddingHorizontal: 20, borderWidth: 1 },
  optionText: { fontFamily: 'Georgia', fontSize: 14, lineHeight: 20 },
  nextBtn: { paddingVertical: 16, alignItems: 'center' },
  nextBtnText: { fontFamily: 'Georgia', fontSize: 14, letterSpacing: 1.5, textTransform: 'uppercase' },
  resultsWrap: { padding: 28 },
  resultsTitle: { fontFamily: 'Georgia', fontSize: 26, fontStyle: 'italic', marginBottom: 12 },
  resultCard: { borderWidth: 1, overflow: 'hidden', marginBottom: 16 },
  resultImg: { width: '100%', height: 140 },
  resultBody: { padding: 18 },
  resultTag: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 },
  resultFaculty: { fontFamily: 'Georgia', fontSize: 18, fontStyle: 'italic', lineHeight: 26, marginBottom: 8 },
  resultDesc: { fontFamily: 'Georgia', fontSize: 13, lineHeight: 20, marginBottom: 14 },
  exploreBtn: { fontFamily: 'Georgia', fontSize: 13, textDecorationLine: 'underline' },
  retake: { alignItems: 'center', paddingVertical: 24 },
  retakeText: { fontFamily: 'Georgia', fontSize: 13, letterSpacing: 1 },
});
