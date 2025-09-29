import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DearClickLogo from '../../assets/svgs/DearClick logo/DearClickLogo';
import Notification from '../../assets/svgs/icons/Notification';

export default function ProfileSection() {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.mainLogo}>
        <DearClickLogo width={100} height={20} />
      </View>
      <View style={styles.notification}>
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
    backgroundColor: '#1F1F1F',
  },
  notification: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFFFFF1A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
