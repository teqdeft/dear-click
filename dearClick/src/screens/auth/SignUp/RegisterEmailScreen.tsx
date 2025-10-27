import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../assets/svgs/Auth svg/BackButton';
import toast from '../../../components/utils/Toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { sendOtp } from '../services/userAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export default function RegisterEmailScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const data = await sendOtp({ email }); // call API function
      if (data?.success) {
        toast.success(data.message || 'OTP sent! Check your inbox');
        navigation.navigate('Verifyotpcreen', { email });
      } else {
        toast.error(data?.error?.message || 'Something went wrong');
      }
    } catch (err: any) {
      toast.error(err); // error from API
    } finally {
      setLoading(false);
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
          <View style={styles.progressDot} />
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
          <Text style={styles.title}>Email Address</Text>
          <Text style={styles.subtitle}>
            Enter your email address to receive a verification code
          </Text>
        </View>

        {/* Email Input */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Email</Text>
          <TextInput
            style={styles.optionCard}
            placeholder="example@gmail.com"
            placeholderTextColor="grey"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.continueText}>Continue</Text>
          )}
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
  progressContainer: { flexDirection: 'row', marginBottom: 30, gap: 2 },
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
  title: { fontSize: 26, fontWeight: '500', color: '#fff', marginBottom: 6 },
  subtitle: { fontSize: 16, color: 'grey', lineHeight: 20 },
  emaillabel: { color: 'grey', marginBottom: 10, fontSize: 15 },
  optionsContainer: { marginBottom: 30 },
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
