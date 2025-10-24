import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../../../context/AuthContext';


export default function CongratsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { login } = useContext(AuthContext);

  const handleDone = async () => {
    try {
      // Replace with your actual token (e.g., from API response or passed as prop/state)
      const token = 'your-jwt-token-here'; // TODO: Get this from signup API flow

      if (!token) {
        Alert.alert(
          'Error',
          'No auth token available. Please check signup flow.',
        );
        return;
      }

      await login(token);
      // No need for navigation.navigate here—the context will switch to AppStack automatically
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'Failed to complete signup. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title + Subtitle */}
      <View style={styles.header}>
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.subtitle}>
          Welcome to Dear Click — start exploring and connect with the world
          around you
        </Text>
        <TouchableOpacity style={styles.continueBtn} onPress={handleDone}>
          <Text style={styles.continueText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Options */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    lineHeight: 20,
    textAlign: 'center',
  },
  continueBtn: {
    backgroundColor: '#FBC213',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: '10%',
  },
  continueText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});
