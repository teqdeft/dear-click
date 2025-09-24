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
import SignIn from './src/screens/auth/SIgnIn/SignIn';
import SignInEmail from './src/screens/auth/SIgnIn/SignInEmail';
import SignInScreen from './src/screens/auth/SIgnIn/SIgnInScreen';
import HomeScreen from './src/screens/home/HomeScreen';

export type RootStackParamList = {
  RegisterStartScreen: undefined;
  RegisterEmailScreen: undefined;
  VerifyOtpScreen: undefined;
  DetailsScreen: undefined;
  CreatePasswordScreen: undefined;
};
 

const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
