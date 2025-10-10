import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppTabs from './AppTabs';
import Stories from '../screens/stories/Stories';
import MyStory from '../screens/stories/MyStory';
import ProfileInfo from '../screens/profile/ProfileInfo';
import AccountSetings from '../screens/profile/AccountSetings';
import ContactDetail from '../screens/profile/ContactDetail';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tabs */}
      <Stack.Screen name="AppTabs" component={AppTabs} />

      {/* Stack Screens */}
      <Stack.Screen name="Stories" component={Stories} />
      <Stack.Screen name="MyStory" component={MyStory} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
      <Stack.Screen name="AccountSetings" component={AccountSetings} />
      <Stack.Screen name="ContactDetail" component={ContactDetail} />
    </Stack.Navigator>
  );
}
