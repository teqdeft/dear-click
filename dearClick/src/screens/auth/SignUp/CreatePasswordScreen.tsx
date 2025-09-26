import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import BackButton from '../../../assets/svgs/Auth svg/BackButton';
import HideEyes from '../../../assets/svgs/Auth svg/HideEyes';
import UnHideEyes from '../../../assets/svgs/Auth svg/UnHideEyes';
import { createPassword } from '../services/userAuth';
import toast from '../../../components/utils/Toast';

export default function CreatePasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: { email: string } }, 'params'>>();
  const { email, phone } = route.params; // email comes from previous screen

  const handleContinue = async () => {
    if (!password || !confirmPassword) {
      toast.error('Please enter both password fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await createPassword({ phone, email, password });
      if (res?.success) {
        toast.success(res?.message);
        navigation.navigate('InterestScreen' as never);
      } else {
        toast.error(res?.error?.message || 'Something went wrong');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong');
    }
  };

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
          <View style={[styles.progressDot, styles.activeDot]} />
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
          <Text style={styles.title}>Create a Password</Text>
          <Text style={styles.subtitle}>
            Protect your account by creating a strong password
          </Text>
        </View>

        {/* New Password */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.optionCard}
              placeholder="New password"
              placeholderTextColor="grey"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <UnHideEyes /> : <HideEyes />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.optionCard}
              placeholder="Re-enter new password"
              placeholderTextColor="grey"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <UnHideEyes /> : <HideEyes />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
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
  scrollContent: { paddingBottom: 40 },
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
  activeDot: { backgroundColor: '#F5A623' },
  backBtn: {
    marginBottom: '20%',
    backgroundColor: '#262626',
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: { marginBottom: 30 },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: { fontSize: 16, color: 'grey', lineHeight: 20 },
  optionsContainer: { marginBottom: 20 },
  emaillabel: { color: 'grey', marginBottom: 10, fontSize: 15 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  optionCard: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    paddingVertical: 10,
  },
  eyeIcon: { marginLeft: 8 },
  continueBtn: {
    backgroundColor: '#FBC213',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: '10%',
  },
  continueText: { color: '#000', fontSize: 16, fontWeight: '700' },
  footer: { textAlign: 'center', color: 'grey', fontSize: 14 },
  signInText: { color: '#FBC213', fontWeight: '600' },
});
