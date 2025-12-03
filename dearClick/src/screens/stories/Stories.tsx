/* eslint-disable react-native/no-inline-styles */
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyStory from './MyStory';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/types';

import { API_URL, IMAGE_BASE_URL } from '@env';
import { getStories } from './services';

export default function Stories(refreshKey: any) {
  type NavProp = NativeStackNavigationProp<RootStackParamList, 'Stories'>;
  const navigation = useNavigation<NavProp>();

  const [users, setUsers] = useState<any[]>([]);

  const fetchStories = async () => {
    const res = await getStories();
    if (res?.success) {
      // to show more than one story in one circle
      const grouped: any = {};

      res.data.forEach((item: any) => {
        if (!grouped[item.userId]) {
          grouped[item.userId] = {
            userId: item.userId,
            username: item.username,
            name: item.name,
            profile_pic: item.profile_pic,
            stories: [],
          };
        }

        grouped[item.userId].stories.push({
          id: item.id,
          type: item.type,
          duration: item.duration,
          url: {
            uri: `${IMAGE_BASE_URL}/stories/${item.media_url}`,
          },
        });
      });

      setUsers(Object.values(grouped));
    }
  };
  useEffect(() => {
    fetchStories();
  }, [refreshKey]);
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <MyStory refreshKey={refreshKey} />

      <View style={styles.mainContainer}>
        {users.map((user, index) => (
          <View
            key={user.userId}
            onTouchEnd={() =>
              navigation.navigate('StoryScreen', {
                userIndex: index,
                users,
              })
            }
          >
            <View style={styles.innerContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: `${IMAGE_BASE_URL}/profilePicture/${user.profile_pic}`,
                }}
              />
            </View>
            <Text style={styles.username}>{user.username}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 14, backgroundColor: '#1F1F1F' },
  mainContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  innerContainer: {
    width: 82,
    height: 82,
    borderWidth: 2,
    padding: 4,
    borderRadius: 41,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FBC213',
  },
  image: { width: 70, height: 70, borderRadius: 39, resizeMode: 'cover' },
  username: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: '#CCCCCC',
  },
});
