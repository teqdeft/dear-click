import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import DearClickLogo from '../../../assets/svgs/DearClick logo/DearClickLogo';
import UnHideEyes from '../../../assets/svgs/Auth svg/UnHideEyes';
import HideEyes from '../../../assets/svgs/Auth svg/HideEyes';

export default function SignInScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  // Animations
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoY = useRef(new Animated.Value(0)).current;

  const formOpacity = useRef(new Animated.Value(0)).current;
  const formY = useRef(new Animated.Value(50)).current; // starts lower

  const input1Opacity = useRef(new Animated.Value(0)).current;
  const input1Y = useRef(new Animated.Value(20)).current;
  const input2Opacity = useRef(new Animated.Value(0)).current;
  const input2Y = useRef(new Animated.Value(20)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Logo: Fade + Bounce
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1.1,
          friction: 3,
          tension: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
      // Logo lift
      Animated.timing(logoY, {
        toValue: -70,
        duration: 700,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Form fade + slide
      Animated.parallel([
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(formY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Stagger inputs
        Animated.stagger(200, [
          Animated.parallel([
            Animated.timing(input1Opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(input1Y, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(input2Opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(input2Y, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(buttonOpacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(buttonY, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Animated.View
        style={{
          opacity: logoOpacity,
          transform: [{ scale: logoScale }, { translateY: logoY }],
        }}
      >
        <DearClickLogo />
      </Animated.View>

      {/* Form */}
      <Animated.View
        style={[
          styles.formContainer,
          {
            opacity: formOpacity,
            transform: [{ translateY: formY }],
          },
        ]}
      >
        <Text style={styles.title}>Best Social App to Make New Friends</Text>
        <Text style={styles.subtitle}>
          With Dear Click you will find new friends from various countries and
          regions of the world
        </Text>

        {/* Input 1 */}
        <Animated.View
          style={[
            styles.optionsContainer,
            {
              opacity: input1Opacity,
              transform: [{ translateY: input1Y }],
            },
          ]}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.optionCard}
              placeholder="Email, Phone or Username"
              placeholderTextColor="grey"
              keyboardType="email-address"
            />
          </View>
        </Animated.View>

        {/* Input 2 */}
        <Animated.View
          style={[
            styles.optionsContainer,
            {
              opacity: input2Opacity,
              transform: [{ translateY: input2Y }],
            },
          ]}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.optionCard}
              placeholder="Password"
              placeholderTextColor="grey"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <UnHideEyes /> : <HideEyes />}
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Button */}
        <Animated.View
          style={{
            opacity: buttonOpacity,
            transform: [{ translateY: buttonY }],
            width: '100%',
          }}
        >
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => navigation.navigate('Home' as never)}
          >
            <Text style={styles.continueText}>Sign In</Text>
          </TouchableOpacity>

          <Text
            onPress={() => navigation.navigate('RegisterStartScreen' as never)}
            style={styles.footer}
          >
            Already have an account?{' '}
            <Text style={styles.signInText}>SignUp</Text>
          </Text>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 40,
    width: '100%',
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
    width: '100%',
  },
  continueBtn: {
    backgroundColor: '#FBC213',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: '10%',
    width: '100%',
  },
  continueText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
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
