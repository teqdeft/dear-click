import { ScrollView, StyleSheet, Text } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    letterSpacing: 1,
  },
});
