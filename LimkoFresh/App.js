// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './ThemeContext';
import { useFonts } from 'expo-font';
import { View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import FacultiesScreen from './screens/FacultiesScreen';
import CoursesScreen from './screens/CoursesScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import CareerQuizScreen from './screens/CareerQuizScreen';
import ContactsScreen from './screens/ContactsScreen';
import ApplicationScreen from './screens/ApplicationScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    Playfair: require('./assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
    PlayfairItalic: require('./assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Faculties" component={FacultiesScreen} />
          <Stack.Screen name="Courses" component={CoursesScreen} />
          <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
          <Stack.Screen name="CareerQuiz" component={CareerQuizScreen} />
          <Stack.Screen name="Contacts" component={ContactsScreen} />
          <Stack.Screen name="Application" component={ApplicationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}