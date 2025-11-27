import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppTabs from './AppTabs';
import Stories from '../screens/stories/Stories';
import MyStory from '../screens/stories/MyStory';
import ProfileInfo from '../screens/profile/ProfileInfo';
import AccountSetings from '../screens/profile/AccountSetings';
import ContactDetail from '../screens/profile/ContactDetail';
import UploadProfilePicture from '../components/uploadProfilePicture/uploadProfilePicture';
import ProfilePicturePreview from '../components/uploadProfilePicture/ProfilePicturePreview';
import FollowerScreen from '../screens/followeProfile/FollowerScreen';
import PostSourceSelector from '../components/post/PostSourceSelector';
import CameraWithSpinner from '../components/uploadProfilePicture/CameraScreen';
import StorySourceSelector from '../screens/stories/StorySourceSelector';
import ProfileScreen from '../screens/profile/ProfileScreen';
import StoryScreen from '../screens/stories/StoryScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tabs */}
      <Stack.Screen name="AppTabs" component={AppTabs} />

      {/* Stack Screens */}
      <Stack.Screen name="Stories" component={Stories} />
      <Stack.Screen name="MyStory" component={MyStory} />
      <Stack.Screen
        name="UploadProfilePicture"
        component={UploadProfilePicture}
      />
      <Stack.Screen
        name="ProfilePicturePreview"
        component={ProfilePicturePreview}
      />
      <Stack.Screen name="FollowerScreen" component={FollowerScreen} />

      <Stack.Screen name="CameraScreen" component={CameraWithSpinner} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
      <Stack.Screen name="AccountSetings" component={AccountSetings} />
      <Stack.Screen name="ContactDetail" component={ContactDetail} />
      <Stack.Screen name="PostSourceSelector" component={PostSourceSelector} />
      <Stack.Screen
        name="StorySourceSelector"
        component={StorySourceSelector}
      />
      <Stack.Screen name="Profilesc" component={ProfileScreen} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
    </Stack.Navigator>
  );
}
