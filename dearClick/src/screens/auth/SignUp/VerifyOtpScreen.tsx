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

export default function VerifyOtpScreen() {
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
          <View style={styles.progressDot} />
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
          <Text style={styles.title}>Enter 6 Digit Code</Text>
          <Text style={styles.subtitle}>
            To verify your email address we have sent a code to
            johndoe@gmail.com
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>OTP code</Text>
          <View style={styles.innerOptionsContainer}>
            <TextInput
              keyboardType="numeric"
              style={styles.optionCard}
              maxLength={1}
            />
            <TextInput
              keyboardType="numeric"
              style={styles.optionCard}
              maxLength={1}
            />
            <TextInput
              keyboardType="numeric"
              style={styles.optionCard}
              maxLength={1}
            />
            <TextInput
              keyboardType="numeric"
              style={styles.optionCard}
              maxLength={1}
            />
            <TextInput
              keyboardType="numeric"
              style={styles.optionCard}
              maxLength={1}
            />
            <TextInput
              keyboardType="numeric"
              style={styles.optionCard}
              maxLength={1}
            />
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate('DetailsScreen' as never)}
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
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 2,
  },
  scrollContent: {
    paddingBottom: 40,
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
  backText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
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
  innerOptionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 30,
    height: 100,
  },
  optionCard: {
    fontSize: 15,
    color: '#fff',
    width: 38,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
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
