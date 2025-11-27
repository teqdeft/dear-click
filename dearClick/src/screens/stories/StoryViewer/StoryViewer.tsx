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

const { width, height } = Dimensions.get('window');

export default function StoryViewer({ userIndex, onClose }) {
  const [currentUser, setCurrentUser] = useState(userIndex);
  const [currentStory, setCurrentStory] = useState(0);

  const storyData = allStories[currentUser];
  const stories = storyData.stories;

  const progress = useRef(new Animated.Value(0)).current;

  // ⭐ Added flip animation value
  const flipAnim = useRef(new Animated.Value(0)).current;

  // ⭐ Flip animation function
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
    if (currentUser < allStories.length - 1) {
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

  // ⭐ Run flip + progress on story change
  useEffect(() => {
    playFlip();
    startProgress();
  }, [currentStory, currentUser]);

  const currentItem = stories[currentStory];

  // ⭐ Interpolate flip animation (rotateY)
  const flipInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '0deg'], // flip in
  });

  return (
    <GestureRecognizer
      onSwipeLeft={nextUser}
      onSwipeRight={prevUser}
      onSwipeDown={onClose}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={storyData.profile} style={styles.profileImg} />
        <Text style={styles.username}>{storyData.username}</Text>
      </View>

      <View style={styles.progressContainer}>
        {stories.map((_, i) => (
          <ProgressBar
            key={i}
            progress={progress}
            active={i === currentStory}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.leftTap} onPress={prevStory} />
      <TouchableOpacity style={styles.rightTap} onPress={nextStory} />

      {/* ⭐ FLIP ANIMATION WRAPPER */}
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
