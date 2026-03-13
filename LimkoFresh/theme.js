// theme.js
import { useColorScheme } from 'react-native';

const light = {
  primary: '#1a237e',
  secondary: '#00695c',
  accent: '#B8962E',
  background: '#F8F8F6',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#111111',
  textSub: '#555555',
  textMuted: '#999999',
  border: '#E0E0E0',
  inputBg: '#F2F2F2',
};

const dark = {
  primary: '#5c6bc0',
  secondary: '#00897b',
  accent: '#C9A84C',
  background: '#0A0A0A',
  surface: '#161616',
  card: '#1E1E1E',
  text: '#F0EBE0',
  textSub: '#ec0a0a',
  textMuted: '#666666',
  border: '#2A2A2A',
  inputBg: '#1A1A1A',
};

export function useTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark' || (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  return { colors: isDark ? dark : light, dark: isDark };
}
