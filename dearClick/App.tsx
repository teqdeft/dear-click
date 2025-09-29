import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterStartScreen from './src/screens/auth/SignUp/RegisterStartScreen';
import RegisterEmailScreen from './src/screens/auth/SignUp/RegisterEmailScreen';
import VerifyOtpScreen from './src/screens/auth/SignUp/VerifyOtpScreen';
import DetailsScreen from './src/screens/auth/SignUp/DetailsScreen';
import CreatePasswordScreen from './src/screens/auth/SignUp/CreatePasswordScreen';
import InterestScreen from './src/screens/auth/SignUp/InterestScreen';
import CongratsScreen from './src/screens/auth/SignUp/CongratsScreen';
import RegisterPhoneScreen from './src/screens/auth/SignUp/RegisterPhoneScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/utils/ToastConfig';
import SignInScreen from './src/screens/auth/SIgnIn/SIgnInScreen';
import Stories from './src/screens/stories/Stories';
import MyStory from './src/screens/stories/MyStory';

export type RootStackParamList = {
  RegisterStartScreen: undefined;
  RegisterEmailScreen: { email: string };
  VerifyOtpScreen: { email: string; phone: string };
  DetailsScreen: { email: string; phone: string };
  CreatePasswordScreen: { email: string; phone: string };
  RegisterPhoneScreen: { phone: string };
  InterestScreen: undefined;
  CongratsScreen: undefined;
  SignIn: undefined;
  Home: undefined;
  Stories: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn" // Matches a defined screen
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen
          name="RegisterStartScreen"
          component={RegisterStartScreen}
        />
        <Stack.Screen
          name="RegisterEmailScreen"
          component={RegisterEmailScreen}
        />
        <Stack.Screen
          name="RegisterPhoneScreen"
          component={RegisterPhoneScreen}
        />
        <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen
          name="CreatePasswordScreen"
          component={CreatePasswordScreen}
        />
        <Stack.Screen name="InterestScreen" component={InterestScreen} />
        <Stack.Screen name="CongratsScreen" component={CongratsScreen} />
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen name="MyStory" component={MyStory} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;
