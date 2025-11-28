import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Text,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Video from 'react-native-video';
import { allStories } from '../data/storiesData';
import ProgressBar from './ProgressBar';
import styles from './styles';
import { API_URL } from '@env';

const { width, height } = Dimensions.get('window');
export default function StoryViewer({ userIndex, users, onClose }) {
  const [currentUser, setCurrentUser] = useState(userIndex);
  const [currentStory, setCurrentStory] = useState(0);

  const storyData = users[currentUser];
  const stories = storyData.stories;

  const progress = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;

  const playFlip = () => {
    flipAnim.setValue(0);
    Animated.timing(flipAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const startProgress = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: stories[currentStory].duration * 1000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) nextStory();
    });
  };

  const nextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1);
    } else {
      nextUser();
    }
  };

  const prevStory = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
    } else {
      prevUser();
    }
  };

  const nextUser = () => {
    if (currentUser < users.length - 1) {
      setCurrentUser(currentUser + 1);
      setCurrentStory(0);
    } else {
      onClose();
    }
  };

  const prevUser = () => {
    if (currentUser > 0) {
      setCurrentUser(currentUser - 1);
      setCurrentStory(0);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    playFlip();
    startProgress();
  }, [currentStory, currentUser]);

  const currentItem = stories[currentStory];

  const flipInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '0deg'],
  });

  return (
    <GestureRecognizer
      onSwipeLeft={nextUser}
      onSwipeRight={prevUser}
      onSwipeDown={onClose}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: `${API_URL}/profilePicture/${storyData.profile_pic}` }}
          style={styles.profileImg}
        />
        <Text style={styles.username}>{storyData.username}</Text>
      </View>

      <View style={styles.progressContainer}>
        {stories.map((_, i) => (
          <ProgressBar key={i} progress={progress} active={i === currentStory} />
        ))}
      </View>

      <TouchableOpacity style={styles.leftTap} onPress={prevStory} />
      <TouchableOpacity style={styles.rightTap} onPress={nextStory} />

      <Animated.View
        style={{
          flex: 1,
          transform: [{ rotateY: flipInterpolate }],
          backfaceVisibility: 'hidden',
        }}
      >
        {currentItem.type === 'image' ? (
          <Image source={currentItem.url} style={styles.media} />
        ) : (
          <Video
            source={currentItem.url}
            style={styles.media}
            resizeMode="cover"
            onLoad={startProgress}
          />
        )}
      </Animated.View>
    </GestureRecognizer>
  );
}
