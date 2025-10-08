import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth Screens
import RegisterStartScreen from './src/screens/auth/SignUp/RegisterStartScreen';
import RegisterEmailScreen from './src/screens/auth/SignUp/RegisterEmailScreen';
import VerifyOtpScreen from './src/screens/auth/SignUp/VerifyOtpScreen';
import DetailsScreen from './src/screens/auth/SignUp/DetailsScreen';
import CreatePasswordScreen from './src/screens/auth/SignUp/CreatePasswordScreen';
import InterestScreen from './src/screens/auth/SignUp/InterestScreen';
import CongratsScreen from './src/screens/auth/SignUp/CongratsScreen';
import RegisterPhoneScreen from './src/screens/auth/SignUp/RegisterPhoneScreen';
import SignInScreen from './src/screens/auth/SIgnIn/SIgnInScreen';

// Main App Tabs
import AppTabs from './src/navigations/tabs/AppTabs';

// Extra Screens
import Stories from './src/screens/stories/Stories';
import MyStory from './src/screens/stories/MyStory';

// Toast
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/utils/ToastConfig';

export type RootStackParamList = {
  // Auth Flow
  SignIn: undefined;
  RegisterStartScreen: undefined;
  RegisterEmailScreen: { email: string };
  RegisterPhoneScreen: { phone: string };
  VerifyOtpScreen: { email: string; phone: string };
  DetailsScreen: { email: string; phone: string };
  CreatePasswordScreen: { email: string; phone: string };
  InterestScreen: undefined;
  CongratsScreen: undefined;

  // Main App (Tabs)
  AppTabs: undefined;

  // Extra Screens
  Stories: undefined;
  MyStory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="RegisterStartScreen" component={RegisterStartScreen} />
        <Stack.Screen name="RegisterEmailScreen" component={RegisterEmailScreen} />
        <Stack.Screen name="RegisterPhoneScreen" component={RegisterPhoneScreen} />
        <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} />
        <Stack.Screen name="InterestScreen" component={InterestScreen} />
        <Stack.Screen name="CongratsScreen" component={CongratsScreen} />

        {/* Main App (Tabs) */}
        <Stack.Screen name="AppTabs" component={AppTabs} />

        {/* Extra Screens */}
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen name="MyStory" component={MyStory} />
      </Stack.Navigator>

      {/* Global Toast Config */}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;
