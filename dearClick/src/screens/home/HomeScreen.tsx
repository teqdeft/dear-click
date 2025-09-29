import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import Stories from '../stories/Stories';
import PostCard from '../../components/post/PostCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Interests from '../interests/Interests';
import ProfileSection from './ProfileSection';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <ProfileSection />
        <Stories />
        <Interests />
        <View>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
});
