import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface TabButtonProps {
  icon: React.ComponentType<{ color: string }>;
  label?: string;
  count?: string | number;
  active: boolean;
  onPress: () => void;
  activeColor?: string;
  inactiveColor?: string;
}

const TabButton: React.FC<TabButtonProps> = ({ icon: Icon, count, active, onPress, activeColor = '#FBC213', inactiveColor = '#3F3F3F', }) => {

  return (
    <TouchableOpacity style={[styles.tabButton, active && styles.activeTab]} onPress={onPress}>
      <View style={styles.storyMenu}>
        <Icon color={active ? activeColor : inactiveColor} />
        <Text style={[styles.storyText, active && styles.storyTextActive]}>
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );

};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },

  activeTab: {
    position: 'relative',
  },

  storyMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  storyText: {
    fontSize: 12,
    color: '#555',
  },

  storyTextActive: {
    color: '#FBC213',
    fontWeight: '600',
  },

});

export default TabButton;
