// screens/ApplicationScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import Header from '../components/Header';
import { useTheme } from '../theme';

const STEPS = ['Personal Information', 'Academic Information', 'Supporting Documents', 'Review & Submit'];
const DOCS = ['Certified copy of school results', 'Certified copy of ID or passport', 'Passport-size photograph', 'Portfolio (Design applicants only)'];

function Field({ label, field, placeholder, keyboard, value, error, onChange, colors, hint }) {
  return (
    <View style={styles.field}>
      <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.inputBg, borderColor: error ? '#cc0000' : colors.border, color: colors.text },
        ]}
        placeholder={placeholder || label}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboard || 'default'}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {hint && !error ? <Text style={[styles.hintText, { color: colors.textMuted }]}>{hint}</Text> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

// formats input as DD/MM/YYYY as user types
function formatDob(raw) {
  // strip everything except digits
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4);
}

// only allow digits and + for phone, max 15 chars
function formatPhone(raw) {
  const cleaned = raw.replace(/[^0-9+]/g, '');
  return cleaned.slice(0, 15);
}

function validateDob(dob) {
  if (!dob.trim()) return 'Date of birth is required';
  const parts = dob.split('/');
  if (parts.length !== 3 || dob.length !== 10) return 'Use format DD/MM/YYYY';
  const [dd, mm, yyyy] = parts.map(Number);
  if (mm < 1 || mm > 12) return 'Month must be between 01 and 12';
  if (dd < 1 || dd > 31) return 'Day must be between 01 and 31';
  if (yyyy < 1900 || yyyy > new Date().getFullYear()) return 'Enter a valid year';
  // must be at least 16 years old
  const birth = new Date(yyyy, mm - 1, dd);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear() -
    (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
  if (age < 16) return 'You must be at least 16 years old';
  if (age > 100) return 'Please enter a valid date of birth';
  return null;
}

function validatePhone(phone) {
  if (!phone.trim()) return 'Phone number is required';
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7) return 'Phone number is too short';
  if (digits.length > 15) return 'Phone number is too long';
  return null;
}

export default function ApplicationScreen({ navigation }) {
  const { colors, dark } = useTheme();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', dob: '',
    school: '', year: '', subjects: '', grades: '',
  });
  const [errors, setErrors] = useState({});
  const [autosaved, setAutosaved] = useState(false);
  const glowAnim = useRef(new Animated.Value(0)).current;

  const setField = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    // clear error for this field as user types
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
    setTimeout(() => { setAutosaved(true); setTimeout(() => setAutosaved(false), 2000); }, 600);
  };

  const handleDobChange = (raw) => {
    setField('dob', formatDob(raw));
  };

  const handlePhoneChange = (raw) => {
    setField('phone', formatPhone(raw));
  };

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = 'First name is required';
      if (!form.lastName.trim()) e.lastName = 'Last name is required';
      if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email is required';
      const phoneErr = validatePhone(form.phone);
      if (phoneErr) e.phone = phoneErr;
      const dobErr = validateDob(form.dob);
      if (dobErr) e.dob = dobErr;
    }
    if (step === 1) {
      if (!form.school.trim()) e.school = 'School name is required';
      if (!form.grades.trim()) e.grades = 'Grades are required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };

  const submit = () => {
    Animated.sequence([
      Animated.timing(glowAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(glowAnim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
      Animated.timing(glowAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setSubmitted(true), 600);
  };

  if (submitted) {
    return (
      <View style={[styles.submittedRoot, { backgroundColor: dark ? '#0A0A0A' : colors.primary }]}>
        <Animated.View style={[styles.glow, { opacity: glowAnim }]} />
        <Text style={styles.submittedLabel}>Application Submitted</Text>
        <Text style={styles.submittedSub}>We have received your application and will be in touch shortly.</Text>
        <TouchableOpacity style={styles.doneBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.doneBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Header title="Application" />

      <View style={[styles.progressBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View style={styles.stepDots}>
          {STEPS.map((_, i) => (
            <View key={i} style={styles.stepItem}>
              <View style={[styles.stepDot, { backgroundColor: i <= step ? colors.primary : colors.border }]} />
              {i < STEPS.length - 1 && (
                <View style={[styles.stepLine, { backgroundColor: i < step ? colors.primary : colors.border }]} />
              )}
            </View>
          ))}
        </View>
        <Text style={[styles.stepLabel, { color: colors.textSub }]}>{STEPS[step]}</Text>
        {autosaved && <Text style={[styles.autosave, { color: colors.textMuted }]}>Changes saved</Text>}
      </View>

      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {step === 0 && (
          <>
            <Field
              label="First Name" field="firstName"
              value={form.firstName} onChange={v => setField('firstName', v)}
              error={errors.firstName} colors={colors}
            />
            <Field
              label="Last Name" field="lastName"
              value={form.lastName} onChange={v => setField('lastName', v)}
              error={errors.lastName} colors={colors}
            />
            <Field
              label="Email Address" field="email" keyboard="email-address"
              value={form.email} onChange={v => setField('email', v)}
              error={errors.email} colors={colors}
            />
            <Field
              label="Phone Number" field="phone" keyboard="phone-pad"
              placeholder="+266 XXXXXXXX"
              hint="Include country code, digits only (7–15 digits)"
              value={form.phone} onChange={handlePhoneChange}
              error={errors.phone} colors={colors}
            />
            <Field
              label="Date of Birth" field="dob" keyboard="numeric"
              placeholder="DD/MM/YYYY"
              hint="Must be at least 16 years old"
              value={form.dob} onChange={handleDobChange}
              error={errors.dob} colors={colors}
            />
          </>
        )}

        {step === 1 && (
          <>
            <Field label="Previous School" field="school" value={form.school} onChange={v => setField('school', v)} error={errors.school} colors={colors} />
            <Field label="Year of Completion" field="year" keyboard="numeric" value={form.year} onChange={v => setField('year', v)} error={errors.year} colors={colors} />
            <Field label="Subjects Taken" field="subjects" placeholder="e.g. English, Maths, Commerce" value={form.subjects} onChange={v => setField('subjects', v)} error={errors.subjects} colors={colors} />
            <Field label="Grades Achieved" field="grades" placeholder="e.g. A, B, C, C, D" value={form.grades} onChange={v => setField('grades', v)} error={errors.grades} colors={colors} />
          </>
        )}

        {step === 2 && (
          <View>
            <Text style={[styles.docsTitle, { color: colors.text }]}>Supporting Documents</Text>
            <Text style={[styles.docsText, { color: colors.textSub }]}>
              Please prepare the following documents to submit with your application:
            </Text>
            {DOCS.map(doc => (
              <View key={doc} style={[styles.docRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.docText, { color: colors.text }]}>{doc}</Text>
                <Text style={[styles.docStatus, { color: colors.textMuted }]}>Pending</Text>
              </View>
            ))}
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={[styles.reviewTitle, { color: colors.text }]}>Review Your Application</Text>
            {[
              ['Name', form.firstName + ' ' + form.lastName],
              ['Email', form.email],
              ['Phone', form.phone],
              ['Date of Birth', form.dob],
              ['School', form.school],
              ['Year', form.year],
              ['Grades', form.grades],
            ].filter(([, v]) => v.trim()).map(([k, v]) => (
              <View key={k} style={[styles.reviewRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.reviewKey, { color: colors.textMuted }]}>{k}</Text>
                <Text style={[styles.reviewVal, { color: colors.text }]}>{v}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.navRow}>
          {step > 0 && (
            <TouchableOpacity
              style={[styles.backBtn, { borderColor: colors.border }]}
              onPress={() => setStep(s => s - 1)}
            >
              <Text style={[styles.backBtnText, { color: colors.textSub }]}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.nextBtn,
              { backgroundColor: colors.primary, flex: step > 0 ? 1 : undefined, marginLeft: step > 0 ? 12 : 0 },
            ]}
            onPress={step === STEPS.length - 1 ? submit : next}
          >
            <Text style={styles.nextBtnText}>
              {step === STEPS.length - 1 ? 'Submit Application' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  submittedRoot: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  glow: { position: 'absolute', width: 280, height: 280, borderRadius: 140, backgroundColor: 'rgba(201,168,76,0.12)' },
  submittedLabel: { fontFamily: 'Georgia', fontSize: 26, fontStyle: 'italic', color: '#C9A84C', textAlign: 'center', marginBottom: 16 },
  submittedSub: { fontFamily: 'Georgia', fontSize: 14, color: 'rgba(255,255,255,0.65)', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  doneBtn: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', paddingVertical: 14, paddingHorizontal: 32 },
  doneBtnText: { color: '#ffffff', fontFamily: 'Georgia', fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase' },
  progressBar: { paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1 },
  stepDots: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stepItem: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  stepDot: { width: 8, height: 8, borderRadius: 4 },
  stepLine: { flex: 1, height: 1, marginHorizontal: 4 },
  stepLabel: { fontFamily: 'Georgia', fontSize: 12, letterSpacing: 0.5 },
  autosave: { fontFamily: 'Georgia', fontSize: 11, marginTop: 4 },
  form: { padding: 24, paddingBottom: 60 },
  field: { marginBottom: 20 },
  fieldLabel: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  input: { borderWidth: 1, paddingHorizontal: 16, paddingVertical: 14, fontFamily: 'Georgia', fontSize: 14 },
  hintText: { fontFamily: 'Georgia', fontSize: 11, marginTop: 4, opacity: 0.8 },
  errorText: { fontFamily: 'Georgia', fontSize: 11, color: '#cc0000', marginTop: 4 },
  docsTitle: { fontFamily: 'Georgia', fontSize: 18, fontStyle: 'italic', marginBottom: 10 },
  docsText: { fontFamily: 'Georgia', fontSize: 13, lineHeight: 21, marginBottom: 20 },
  docRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1 },
  docText: { fontFamily: 'Georgia', fontSize: 13, flex: 1 },
  docStatus: { fontFamily: 'Georgia', fontSize: 11, letterSpacing: 1 },
  reviewTitle: { fontFamily: 'Georgia', fontSize: 18, fontStyle: 'italic', marginBottom: 20 },
  reviewRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1 },
  reviewKey: { fontFamily: 'Georgia', fontSize: 12, letterSpacing: 1, flex: 1 },
  reviewVal: { fontFamily: 'Georgia', fontSize: 13, flex: 2, textAlign: 'right' },
  navRow: { flexDirection: 'row', marginTop: 32 },
  backBtn: { borderWidth: 1, paddingVertical: 14, paddingHorizontal: 24 },
  backBtnText: { fontFamily: 'Georgia', fontSize: 13, letterSpacing: 1 },
  nextBtn: { paddingVertical: 14, alignItems: 'center' },
  nextBtnText: { color: '#ffffff', fontFamily: 'Georgia', fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase' },
});