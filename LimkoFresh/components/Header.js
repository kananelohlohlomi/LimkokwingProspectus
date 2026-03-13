// components/Header.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';

const MENU = [
  { label: 'Home', screen: 'Home' },
  { label: 'Faculties and Courses', screen: 'Faculties' },
  { label: 'Career Assessment', screen: 'CareerQuiz' },
  { label: 'Apply Now', screen: 'Application' },
  { label: 'Contact Us', screen: 'Contacts' },
];

export default function Header({ title, logo }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);

  const go = (screen) => { setOpen(false); navigation.navigate(screen); };

  const LOGO_SRC = logo || 'https://images.seeklogo.com/logo-png/8/1/limkokwing-university-logo-png_seeklogo-84264.png';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      <View style={styles.bar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image 
            source={typeof LOGO_SRC === 'string' ? { uri: LOGO_SRC } : LOGO_SRC} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        {title ? (
          <Text style={[styles.title, { color: colors.primary }]} numberOfLines={1}>{title}</Text>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        <TouchableOpacity style={[styles.menuBtn, { borderColor: colors.primary }]} onPress={() => setOpen(true)}>
          <Text style={[styles.menuBtnText, { color: colors.primary }]}>Menu</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={open} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={[styles.panel, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.panelTitle, { color: colors.text }]}>Navigate</Text>
            <View style={[styles.line, { backgroundColor: colors.border }]} />
            {MENU.map((item) => (
              <TouchableOpacity key={item.screen} style={styles.menuItem} onPress={() => go(item.screen)}>
                <Text style={[styles.menuItemText, { color: colors.text }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <View style={[styles.line, { backgroundColor: colors.border }]} />
            <TouchableOpacity onPress={() => setOpen(false)} style={{ paddingTop: 12 }}>
              <Text style={[styles.closeText, { color: colors.textMuted }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { borderBottomWidth: 1 },
  bar: { flexDirection: 'row', alignItems: 'center', height: 80, paddingHorizontal: 16 },
  logo: { width: 80, height: 70 },
  title: { flex: 1, fontFamily: 'Georgia', fontSize: 13, textAlign: 'center', paddingHorizontal: 8, fontStyle: 'italic' },
  menuBtn: { borderWidth: 1, paddingVertical: 4, paddingHorizontal: 10 },
  menuBtnText: { fontFamily: 'Georgia', fontSize: 12, letterSpacing: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  panel: { width: '80%', borderWidth: 1, padding: 24 },
  panelTitle: { fontFamily: 'Georgia', fontSize: 22, fontStyle: 'italic', marginBottom: 16 },
  line: { height: 1, marginVertical: 8 },
  menuItem: { paddingVertical: 14 },
  menuItemText: { fontFamily: 'Georgia', fontSize: 16 },
  closeText: { fontFamily: 'Georgia', fontSize: 13, letterSpacing: 1 },
});