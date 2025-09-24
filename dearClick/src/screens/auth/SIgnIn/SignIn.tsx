// we are not using this file anymore   

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import DearClickLogo from '../../../assets/svgs/DearClick logo/DearClickLogo';
import SignInEmail from '../../../assets/svgs/Auth svg/SIgnInEmail';
import SignInPhone from '../../../assets/svgs/Auth svg/SiginPhone';

export default function SignIn() {
  const navigation = useNavigation();

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
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => navigation.navigate('VerifyOtpScreen' as never)}
          >
            <View style={styles.logoWrapper}>
              <SignInPhone />
            </View>
            <Text style={styles.continueText}>Sign in with Phone</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueBtn2}
            onPress={() => navigation.navigate('SignInEmail' as never)}
          >
            <View style={styles.logoWrapper}>
              <SignInEmail />
            </View>
            <Text style={styles.continueText2}>Sign in with Email</Text>
          </TouchableOpacity>
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
  logoWrapper: {
    padding: 12,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  continueBtn: {
    flexDirection: 'row',
    backgroundColor: '#FBC213',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  continueBtn2: {
    flexDirection: 'row',
    backgroundColor: '#333',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  continueText: {
    color: '#000',
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
