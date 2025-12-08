import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReelCard() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={styles.postImage}
          source={require('../../assets/posts/profile.jpg')}
        />
        <View>
          <Text style={{ color: 'red', zIndex: 1000 }}>ReelCard</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
