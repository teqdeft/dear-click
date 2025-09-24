// we are not using this file anymore

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import DearClickLogo from '../../../assets/svgs/DearClick logo/DearClickLogo';
import UnHideEyes from '../../../assets/svgs/Auth svg/UnHideEyes';
import HideEyes from '../../../assets/svgs/Auth svg/HideEyes';

export default function SignInEmailScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* logo */}

      <View style={styles.header}>
        <View>
          <DearClickLogo />
        </View>
        <View>
          <Text style={styles.title}>Sign In to Your Account</Text>
          <Text style={styles.subtitle}>
            Just a few quick details to get started
          </Text>
          <View style={styles.optionsContainer}>
            <Text style={styles.emaillabel}>Email, Phone or Username</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.optionCard}
                placeholder="Email, Phone or Username"
                placeholderTextColor="grey"
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.optionsContainer}>
            <Text style={styles.emaillabel}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.optionCard}
                placeholder="password"
                placeholderTextColor="grey"
                keyboardType="default"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <UnHideEyes /> : <HideEyes />}
              </TouchableOpacity>
            </View>
          </View>
          {/* Footer */}
          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => navigation.navigate('InterestScreen' as never)}
          >
            <Text style={styles.continueText}>Sign In</Text>
          </TouchableOpacity>
        </View>
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
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'grey',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  logoWrapper: {
    padding: 12,
    backgroundColor: 'black',
    borderRadius: 50,
  },

  continueText: {
    color: '#000',
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  eyeIcon: {
    marginLeft: 8,
  },
  continueBtn: {
    backgroundColor: '#FBC213',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: '10%',
  },

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
  emaillabel: {
    color: 'grey',
    marginBottom: 10,
    fontSize: 15,
  },
  continueText2: {
    color: '#fff',
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    color: 'grey',
    marginTop: 20,
  },
  signInText: {
    color: '#FBC213',
    fontWeight: '600',
  },
});
