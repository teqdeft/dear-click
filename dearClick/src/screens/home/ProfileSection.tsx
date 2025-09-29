import { StyleSheet, View, useColorScheme } from 'react-native';
import React from 'react';
import DearClickLogo from '../../assets/svgs/DearClick logo/DearClickLogo';
import Notification from '../../assets/svgs/icons/Notification';

export default function ProfileSection() {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  return (
    <View
      style={[
        styles.profileContainer,
        { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFFFFF' },
      ]}
    >
      <View>
        <DearClickLogo
          width={100}
          height={20}
          fill={isDarkMode ? '#FFFFFF' : '#000000'}
        />
      </View>
      <View
        style={[
          styles.notification,
          {
            borderColor: isDarkMode ? '#FFFFFF1A' : '#0000001A',
            backgroundColor: isDarkMode ? '#2C2C2C' : '#F5F5F5',
          },
        ]}
      >
        <Notification />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notification: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
