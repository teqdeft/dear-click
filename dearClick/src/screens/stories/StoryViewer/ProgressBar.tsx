import React from 'react';
import { View, Animated } from 'react-native';
import styles from './styles';

export default function ProgressBar({ progress, active }) {
  return (
    <View style={styles.progressBackground}>
      <Animated.View
        style={[
          styles.progressFill,
          {
            width: active
              ? progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                })
              : '100%',
          },
        ]}
      />
    </View>
    
  );
}
