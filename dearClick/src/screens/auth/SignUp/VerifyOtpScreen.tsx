import React, { useState, useRef } from 'react';
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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import BackButton from '../../../assets/svgs/Auth svg/BackButton';
import toast from '../../../components/utils/Toast';
import { RootStackParamList } from '../../../../App';
import { sendOtp, verifyEmail } from '../services/userAuth';

type VerifyOtpScreenRouteProp = RouteProp<
  RootStackParamList,
  'VerifyOtpScreen'
>;

export default function VerifyOtpScreen() {
  const navigation = useNavigation();
  const route = useRoute<VerifyOtpScreenRouteProp>();
  const { email, phone } = route.params;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputsRef.current[index + 1]?.focus(); // optional chaining handles null
    }
  };
  const resendOTP = async () => {
    setOtp(['', '', '', '', '', '']); // clear inputs
    setLoading(true); 

    try {
      const data = await sendOtp({ email, phone });
      if (data?.success) {
        const message = phone
          ? `${data.message || 'OTP resent successfully!'} , ${
              data.data?.otp
            }`
          : data.message || 'OTP resent successfully!';

        toast.success(message);
      } else {
        toast.error(data?.error?.message || 'Failed to resend OTP');
      }
    } catch (err: any) {
      toast.error(err || 'Something went wrong while resending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setLoading(true);
    try {
      const data = await verifyEmail({ phone, email, otp: otpCode });
      if (data?.success) {
        toast.success(data.message || 'Email verified successfully!');
        navigation.navigate('DetailsScreen', { email, phone });     
      } else {
        toast.error(data?.error?.message || 'Invalid OTP');
      }
    } catch (err: any) {
      toast.error(err || 'Something went wrong');
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
            To verify your email address we have sent a code to {email}
          </Text>
        </View>

        {/* OTP Inputs */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>OTP code</Text>
          <View style={styles.innerOptionsContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={ref => (inputsRef.current[index] = ref)}
                keyboardType="numeric"
                style={styles.optionCard}
                maxLength={1}
                value={value}
                onChangeText={text => handleChange(text, index)}
              />
            ))}
          </View>
        </View>
        <Text onPress={resendOTP} style={styles.resendOTP}>
          Resend OTP
        </Text>
        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.continueText}>Continue</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        {/* <Text style={styles.footer}>
          Already have an account?{' '}
          <Text style={styles.signInText}>Sign In</Text>
        </Text> */}
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
  },
  optionsContainer: {
    height: 80,
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
  resendOTP: {
    color: 'grey',
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginBottom: 30,
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
