import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from '../../screens/home/HomeScreen';
import SearchScreen from '../../screens/search/SearchScreen';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import NotificationScreen from '../../screens/notifications/NotificationScreen';
import CreatePost from '../../screens/post/CreatePost';
import ReelsScreen from '../../screens/reels/ReelsScreen';

// Custom SVG Icons
import Homeicon from '../../assets/svgs/home/Homeicon';
import Searchicon from '../../assets/svgs/home/Searchicon';
import Profileicon from '../../assets/svgs/home/Profileicon';
import Reelsicon from '../../assets/svgs/home/Reelsicon';
import PlusIcon from '../../assets/svgs/home/Plusicon';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const scheme = useColorScheme();

  // Colors based on theme
  const colors = {
    dark: {
      tabBar: '#1F1F1F',
      active: '#FF0000',
      inactive: '#888',
    },
    light: {
      tabBar: '#fff',
      active: '#FF0000',
      inactive: '#555',
    },
  };

  const themeColors = scheme === 'dark' ? colors.dark : colors.light;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: themeColors.tabBar }],
        tabBarIcon: ({ focused }) => {
          const color = focused ? themeColors.active : themeColors.inactive;
          switch (route.name) {
            case 'Home':
              return <Homeicon fill={color} />;
            case 'Search':
              return <Searchicon fill={color} />;
            case 'CreatePost':
              return <PlusIcon fill={color} />;
            case 'Reels':
              return <Reelsicon fill={color} />;
            case 'Profile':
              return <Profileicon fill={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="CreatePost" component={CreatePost} />
      <Tab.Screen name="Reels" component={ReelsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    justifyContent: 'center',
    borderWidth: 0,
    borderTopColor: '#1F1F1F',
    alignItems: 'center',
    elevation: 0,
  },
});
