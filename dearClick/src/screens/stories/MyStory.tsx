import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import PlusIcon from '../../assets/svgs/icons/PlusIcon';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { IMAGE_BASE_URL } from '@env';
import { getmyStories } from './services';


export default function MyStory() {
  const scheme = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [myStories, setMyStories] = useState<any[]>([]);

  useEffect(() => {
    loadMyStories();
  }, []);

  const loadMyStories = async () => {
    const res = await getmyStories();

    if (res?.success && res.data?.length > 0) {
      setMyStories(res.data);

      // ALWAYS show user's profile picture (NOT story thumbnail)
      setProfilePic(`${IMAGE_BASE_URL}/profilePicture/${res.data[0].profile_pic}`);
    }
  };

  const handlePress = () => {
    if (myStories.length === 0) {
      // No stories → Create Story
      navigation.navigate('CreatePost');
    } else {
      // Has stories → Open your own StoryViewer
      navigation.navigate('StoryScreen', {
        userIndex: 0,
        users: [
          {
            userId: myStories[0].userId,
            username: myStories[0].username,
            name: myStories[0].name,
            profile_pic: myStories[0].profile_pic,
            stories: myStories.map(item => ({
              id: item.id,
              type: item.type,
              duration: item.duration,
              caption: item.caption,
              url: { uri: `${IMAGE_BASE_URL}/stories/${item.media_url}` },
            })),
          },
        ],
      });
    }
  };

  return (
    <View style={styles.yourStory}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <Image
              style={styles.image}
              source={
                profilePic
                  ? { uri: profilePic }
                  : require('../../assets/posts/profile.jpg')
              }
            />
          </View>

          {/* DO NOT REMOVE + ICON (Always visible) */}
          <View style={[styles.plusIconContainer, { backgroundColor: '#1F1F1F' }]}>
            <TouchableOpacity
              style={styles.innerplusIconContainer}
              onPress={() => navigation.navigate('CreatePost')}
            >
              <PlusIcon fill={'#FFFFFF'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <Text style={[styles.username, { color: '#CCCCCC' }]}>Your Story</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  yourStory: { marginRight: 10 },
  outerContainer: {
    width: 82,
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    padding: 4,
    borderRadius: 41,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FBC213',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 39,
    resizeMode: 'cover',
  },
  username: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  plusIconContainer: {
    padding: 5,
    width: 33,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  innerplusIconContainer: {
    backgroundColor: '#FBC213',
    padding: 5,
    borderRadius: 20,
  },
});
