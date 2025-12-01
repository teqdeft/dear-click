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
import ProgressBar from './ProgressBar';
import styles from './styles';
import { API_URL, IMAGE_BASE_URL } from '@env';

const { width, height } = Dimensions.get('window');

export default function StoryViewer({ userIndex, users, onClose }) {
  const [currentUser, setCurrentUser] = useState(userIndex);
  const [currentStory, setCurrentStory] = useState(0);

  const storyData = users[currentUser];
  const stories = storyData.stories;

  const progress = useRef(new Animated.Value(0)).current;

  // Fade transition animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const playFade = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Hold-to-pause state
  const [isPaused, setIsPaused] = useState(false);

  const pauseStory = () => {
    setIsPaused(true);
    progress.stopAnimation();
  };

  const resumeStory = () => {
    setIsPaused(false);

    const remaining =
      (1 - progress.__getValue()) * stories[currentStory].duration * 1000;

    Animated.timing(progress, {
      toValue: 1,
      duration: remaining,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !isPaused) nextStory();
    });
  };

  // Story progress timer
  const startProgress = () => {
    if (isPaused) return;

    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: stories[currentStory].duration * 1000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !isPaused) nextStory();
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
    playFade();
    startProgress();
  }, [currentStory, currentUser]);

  // Swipe-down exit animation
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const closeWithAnimation = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 200,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.85,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const currentItem = stories[currentStory];

  // Viewers bottom sheet animation
  const [showViewers, setShowViewers] = useState(false);
  const viewersAnim = useRef(new Animated.Value(0)).current;

  const openViewers = () => {
    setShowViewers(true);
    Animated.timing(viewersAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeViewers = () => {
    Animated.timing(viewersAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setShowViewers(false));
  };

  return (
    <GestureRecognizer
      onSwipeLeft={nextUser}
      onSwipeRight={prevUser}
      onSwipeDown={closeWithAnimation}
      style={styles.container}
    >
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateY }, { scale }],
          opacity: opacityAnim,
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: `${IMAGE_BASE_URL}/profilePicture/${storyData.profile_pic}`,
            }}
            style={styles.profileImg}
          />
          <Text style={styles.username}>{storyData.username}</Text>
        </View>

        {/* Progress bars */}
        <View style={styles.progressContainer}>
          {stories.map((_, i) => (
            <ProgressBar
              key={i}
              progress={progress}
              active={i === currentStory}
            />
          ))}
        </View>

        {/* Left / Right tap zones */}
        <TouchableOpacity style={styles.leftTap} onPress={prevStory} />
        <TouchableOpacity style={styles.rightTap} onPress={nextStory} />

        {/* VIEWERS BUTTON */}
        <TouchableOpacity
          onPress={openViewers}
          style={{
            position: 'absolute',
            bottom: 30,
            right: 20,
            backgroundColor: 'rgba(0,0,0,0.3)',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            zIndex: 99,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14 }}>👁 Viewers</Text>
        </TouchableOpacity>

        {/* HOLD TO PAUSE */}
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1 }}
          onLongPress={pauseStory}
          onPressOut={resumeStory}
        >
          <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            {currentItem.type === 'image' ? (
              <Image source={currentItem.url} style={styles.media} />
            ) : (
              <Video
                source={currentItem.url}
                style={styles.media}
                resizeMode="cover"
                paused={isPaused}
                onLoad={startProgress}
              />
            )}
          </Animated.View>
        </TouchableOpacity>

        {/* VIEWERS BOTTOM SHEET */}
        {showViewers && (
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: height * 0.4,
              backgroundColor: '#111',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              transform: [
                {
                  translateY: viewersAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height * 0.4, 0],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity onPress={closeViewers}>
              <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>
                Close ✖
              </Text>
            </TouchableOpacity>

            <Text style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>
              Viewers
            </Text>

            {storyData.viewers?.length ? (
              storyData.viewers.map((v, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Image
                    source={{
                      uri: `${IMAGE_BASE_URL}/profilePicture/${v.profile_pic}`,
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ color: '#fff', fontSize: 16 }}>
                    {v.username}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={{ color: '#aaa', marginTop: 10 }}>
                No viewers yet
              </Text>
            )}
          </Animated.View>
        )}
      </Animated.View>
    </GestureRecognizer>
  );
}
