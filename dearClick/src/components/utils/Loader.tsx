import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import DearClickLogo from '../../assets/svgs/DearClick logo/DearClickLogo';

export default function Loader() {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleValue]);

  return (
    <View style={styles.loaderContainer}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <DearClickLogo width={150} height={150} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
});
