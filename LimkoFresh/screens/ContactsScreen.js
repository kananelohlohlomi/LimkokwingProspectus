// screens/ContactsScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../theme';
import { CONTACT } from '../data';

function Row({ label, value, onPress, colors }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} style={[styles.row, { borderBottomColor: colors.border }]}>
      <Text style={[styles.rowLabel, { color: colors.textMuted }]}>{label}</Text>
      <Text style={[styles.rowValue, { color: onPress ? colors.primary : colors.text }]}>{value}</Text>
    </TouchableOpacity>
  );
}

export default function ContactsScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Header title="Contact Us" />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={[styles.pageHead, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Text style={[styles.headSub, { color: colors.accent }]}>Limkokwing University</Text>
          <Text style={[styles.headTitle, { color: colors.text }]}>Get in Touch</Text>
          <View style={[styles.headLine, { backgroundColor: colors.accent }]} />
          <Text style={[styles.headSub2, { color: colors.textSub }]}>We are here to answer your questions about admissions, programmes and student life.</Text>
        </View>

        {[
          {
            title: 'Campus Address',
            rows: [
              { label: 'Street', value: CONTACT.address },
              { label: 'PO Box', value: CONTACT.poBox },
            ],
          },
          {
            title: 'Telephone',
            rows: [
              { label: 'Main Line', value: CONTACT.phone, onPress: () => Linking.openURL('tel:' + CONTACT.phone) },
              { label: 'Toll Free', value: CONTACT.tollfree, onPress: () => Linking.openURL('tel:80022066') },
            ],
          },
          {
            title: 'Online',
            rows: [
              { label: 'Website', value: CONTACT.website, onPress: () => Linking.openURL('https://' + CONTACT.website) },
              { label: 'Email', value: CONTACT.email, onPress: () => Linking.openURL('mailto:' + CONTACT.email) },
              { label: 'Facebook', value: CONTACT.facebook, onPress: () => Linking.openURL('https://' + CONTACT.facebook) },
            ],
          },
          {
            title: 'Office Hours',
            rows: [
              { label: 'Monday — Friday', value: '08:00 — 16:30' },
              { label: 'Saturday', value: '09:00 — 13:00' },
              { label: 'Sunday', value: 'Closed' },
            ],
          },
        ].map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>{section.title}</Text>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {section.rows.map((r) => (
                <Row key={r.label} label={r.label} value={r.value} onPress={r.onPress} colors={colors} />
              ))}
            </View>
          </View>
        ))}

        <View style={[styles.applyBox, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <Text style={[styles.applyTitle, { color: colors.text }]}>Ready to start your journey?</Text>
          <Text style={[styles.applyText, { color: colors.textSub }]}>Visit our website or call us to find out how to apply for the next intake.</Text>
          <TouchableOpacity style={[styles.applyBtn, { backgroundColor: colors.primary }]} onPress={() => Linking.openURL('https://' + CONTACT.website)}>
            <Text style={styles.applyBtnText}>Visit Our Website</Text>
          </TouchableOpacity>
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
  headTitle: { fontFamily: 'Georgia', fontSize: 32, fontStyle: 'italic', marginBottom: 10 },
  headLine: { height: 2, width: 36, marginBottom: 12 },
  headSub2: { fontFamily: 'Georgia', fontSize: 13, lineHeight: 21 },
  section: { paddingHorizontal: 24, paddingTop: 24 },
  sectionTitle: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 },
  card: { borderWidth: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1 },
  rowLabel: { fontFamily: 'Georgia', fontSize: 12, flex: 1 },
  rowValue: { fontFamily: 'Georgia', fontSize: 13, flex: 2, textAlign: 'right' },
  applyBox: { margin: 24, padding: 24, borderWidth: 1 },
  applyTitle: { fontFamily: 'Georgia', fontSize: 20, fontStyle: 'italic', marginBottom: 8 },
  applyText: { fontFamily: 'Georgia', fontSize: 13, lineHeight: 21, marginBottom: 20 },
  applyBtn: { paddingVertical: 14, alignItems: 'center' },
  applyBtnText: { color: '#ffffff', fontFamily: 'Georgia', fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase' },
});
