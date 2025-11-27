import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PhoneLogo from '../../../assets/svgs/Auth svg/PhoneLogo';
import EmailLogo from '../../../assets/svgs/Auth svg/EmailLogo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterStartScreen() {
  const [selected, setSelected] = useState('');
  const navigation = useNavigation();
  const scheme = useColorScheme(); // 'dark' or 'light'

  const isDark = scheme === 'dark';

  const navigateToNext = () => {
    if (selected === 'phone') {
      navigation.navigate('RegisterPhoneScreen' as never);
    } else if (selected === 'email') {
      navigation.navigate('RegisterEmailScreen' as never);
    }
  };
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#111' }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Progress */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        {/* Title + Subtitle */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: '#fff' }]}>
            Create account using
          </Text>
          <Text style={[styles.subtitle, { color: 'grey' }]}>
            No account yet? Sign up quickly with your phone or email
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsWrapper}>
          <TouchableOpacity
            style={[
              styles.optionCard,
              { backgroundColor: '#262626' },
              selected === 'phone' && styles.optionSelected,
            ]}
            onPress={() => setSelected('phone')}
          >
            <PhoneLogo />
            {/* <Image source={require('../../assets/images/phone.png')} /> */}
            <Text style={[styles.optionText, { color: '#fff' }]}>
              Phone Number
            </Text>
            <View style={styles.radioCircle}>
              {selected === 'phone' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              { backgroundColor: '#262626' },
              selected === 'email' && styles.optionSelected,
            ]}
            onPress={() => setSelected('email')}
          >
            <EmailLogo />
            {/* <Image source={require('../../assets/images/email.png')} /> */}
            <Text style={[styles.optionText, { color: '#fff' }]}>
              Email Address
            </Text>
            <View style={styles.radioCircle}>
              {selected === 'email' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueBtn,
            { backgroundColor: isDark ? '#FBC213' : '#FBC213' },
          ]}
          onPress={navigateToNext}
        >
          <Text style={[styles.continueText, { color: '#000' }]}>Continue</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text
          onPress={() => navigation.navigate('SignIn' as never)}
          style={[styles.footer, { color: 'grey' }]}
        >
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
  header: {
    marginTop: '20%',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 20,
  },
  optionsWrapper: {
    marginBottom: 30,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: '#FBC213',
  },
  optionText: {
    fontSize: 16,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FBC213',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FBC213',
  },
  continueBtn: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 50,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
  },
  signInText: {
    color: '#FBC213',
    fontWeight: '600',
  },
});
