import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/auth/SIgnIn/SIgnInScreen';
import RegisterStartScreen from '../screens/auth/SignUp/RegisterStartScreen';
import RegisterEmailScreen from '../screens/auth/SignUp/RegisterEmailScreen';
import VerifyOtpScreen from '../screens/auth/SignUp/VerifyOtpScreen';
import DetailsScreen from '../screens/auth/SignUp/DetailsScreen';
import CreatePasswordScreen from '../screens/auth/SignUp/CreatePasswordScreen';
import InterestScreen from '../screens/auth/SignUp/InterestScreen';
import CongratsScreen from '../screens/auth/SignUp/CongratsScreen';
import RegisterPhoneScreen from '../screens/auth/SignUp/RegisterPhoneScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="RegisterStartScreen" component={RegisterStartScreen} />
      <Stack.Screen name="RegisterEmailScreen" component={RegisterEmailScreen} />
      <Stack.Screen name="RegisterPhoneScreen" component={RegisterPhoneScreen} />
      <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} />
      <Stack.Screen name="InterestScreen" component={InterestScreen} />
      <Stack.Screen name="CongratsScreen" component={CongratsScreen} />
    </Stack.Navigator>
  );
}
