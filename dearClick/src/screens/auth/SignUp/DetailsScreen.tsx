import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../../assets/svgs/Auth svg/BackButton';
import CameraLogo from '../../../assets/svgs/Auth svg/CameraLogo';
import Profile from '../../../assets/svgs/Auth svg/Profile';

export default function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Progress */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>

        {/* Title + Subtitle */}
        <View style={styles.header}>
          <Text style={styles.title}>Personal Details</Text>
          <Text style={styles.subtitle}>
            Just a few quick details to get started
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Name</Text>
          <TextInput
            style={styles.optionCard}
            placeholder="john Doe"
            placeholderTextColor="grey"
          />
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>User Name</Text>
          <TextInput
            style={styles.optionCard}
            placeholder="johndoe123"
            placeholderTextColor="grey"
          />
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Profile Photo</Text>
          <View style={styles.inputWrapper}>
            <Profile />
            <TouchableOpacity style={styles.optionCard2} />
            <CameraLogo />
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate('CreatePasswordScreen' as never)}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Already have an account?{' '}
          <Text style={styles.signInText}>Sign In</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 2,
  },
  progressDot: {
    flex: 1,
    height: 4,
    backgroundColor: '#333',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  activeDot: {
    backgroundColor: '#F5A623',
  },
  backBtn: {
    marginBottom: '20%',
    backgroundColor: '#262626',
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    lineHeight: 20,
  },
  emaillabel: {
    color: 'grey',
    marginBottom: 10,
    fontSize: 15,
  },
  optionsContainer: {
    marginBottom: 4,
    height: 100,
  },
  optionCard: {
    fontSize: 16,
    color: '#fff',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  optionCard2: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    paddingVertical: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  continueBtn: {
    backgroundColor: '#FBC213',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: '10%',
  },
  continueText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 14,
  },
  signInText: {
    color: '#FBC213',
    fontWeight: '600',
  },
});
