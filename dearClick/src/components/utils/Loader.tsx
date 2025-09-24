import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import React from 'react';

export default function Loader() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#0066FF" />
      <Text style={{ marginTop: 10 }}>Please wait...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
