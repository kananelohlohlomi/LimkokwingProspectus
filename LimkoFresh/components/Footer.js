// components/Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { CONTACT } from '../data';

export default function Footer() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
      <TouchableOpacity onPress={() => Linking.openURL('https://' + CONTACT.website)}>
        <Text style={[styles.link, { color: colors.primary }]}>{CONTACT.website}</Text>
      </TouchableOpacity>
      <Text style={[styles.copy, { color: colors.textMuted }]}>Limkokwing University of Creative Technology, Lesotho.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 40, borderTopWidth: 1, alignItems: 'center' },
  line: { height: 1, width: '100%', marginBottom: 16 },
  link: { fontFamily: 'Georgia', fontSize: 12, lineHeight: 26, textDecorationLine: 'underline' },
  copy: { fontFamily: 'Georgia', fontSize: 10, textAlign: 'center', marginTop: 12 },
});