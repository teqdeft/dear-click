
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

export default function SignInScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {/* logo */}

      {/* Title + Subtitle */}
      <View style={styles.header}>
        <View>
          <DearClickLogo />
        </View>
        <View>
          <Text style={styles.title}>Best Social App to Make New Friends</Text>
          <Text style={styles.subtitle}>
            With Dear Click you will find new friends from various countries and
            regions of the world
          </Text>
          <View>
            <View style={styles.optionsContainer}>
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
              onPress={() => navigation.navigate('Home' as never)}
            >
              <Text style={styles.continueText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          {/* Footer */}
          <Text
            onPress={() => navigation.navigate('RegisterStartScreen' as never)}
            style={styles.footer}
          >
            Already have an account?{' '}
            <Text style={styles.signInText}>SignUp</Text>
          </Text>
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
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
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
  emaillabel: {
    color: 'grey',
    marginBottom: 10,
    fontSize: 15,
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
  eyeIcon: {
    marginLeft: 8,
  },
  optionsContainer: {
    marginBottom: 10,
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
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  footer: {
    textAlign: 'center',
    fontSize: 14,
    color: 'grey',
  },
  signInText: {
    color: '#FBC213',
    fontWeight: '600',
  },
});
