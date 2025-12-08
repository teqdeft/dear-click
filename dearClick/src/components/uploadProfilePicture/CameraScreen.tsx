import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  CameraPermissionStatus,
  VideoFile,
} from 'react-native-vision-camera';
import PreviewScreen from './PreviewScreen';
import toast from '../utils/Toast';
import { createPost } from '../../screens/post/services/services';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createStory } from '../../screens/stories/services';
import { launchImageLibrary } from 'react-native-image-picker';
import GalleryIcon from '../../assets/svgs/icons/GalleryIcon';
import CameraFlashOff from '../../assets/svgs/icons/CameraFlashOff';
import CameraFlahOn from '../../assets/svgs/icons/CameraFlahOn';
import CameraFlip from '../../assets/svgs/icons/CameraFlip';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function CameraWithSpinner() {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>('not-determined');
  const [isFront, setIsFront] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimeSec, setRecordTimeSec] = useState(0);
  const [selectedTab, setSelectedTab] = useState('Story');
  const tabs = ['Story', 'Post'];
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<{
    type: 'photo' | 'video';
    path: string;
  } | null>(null);

  // handle camera access front and back
  const device = useCameraDevice(isFront ? 'front' : 'back');
  useFocusEffect(
    useCallback(() => {
      // RESET ALL STATES HERE
      setPhoto(null);
      setPreview(null);
      setIsRecording(false);
      setRecordTimeSec(0);
      setFlash('off');
      setIsFront(false);
      setSelectedTab('Story');

      // Stop timers/spinner if any
      stopSpinnerAnimation();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      return () => {};
    }, []),
  );
  const cameraRef = useRef<Camera | null>(null);

  // Animated rotation value for spinner ring
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Timer interval ref
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setCameraPermission(status);
      // microphone needed for video
      await Camera.requestMicrophonePermission();
    })();

    // <clean>                              </clean>up on unmount
    return () => {
      stopSpinnerAnimation();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start spinner animation loop
  const startSpinnerAnimation = () => {
    rotateAnim.setValue(0);
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000, // rotation speed
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const stopSpinnerAnimation = () => {
    rotateAnim.stopAnimation();
    rotateAnim.setValue(0);
  };

  // Start recording
  const startRecording = async () => {
    try {
      setIsRecording(true);
      startSpinnerAnimation();
      setRecordTimeSec(0);

      // start a small timer to show seconds (optional)
      timerRef.current = setInterval(() => {
        setRecordTimeSec(s => s + 1);
      }, 1000) as unknown as number;

      cameraRef.current?.startRecording({
        flash,
        onRecordingFinished: (video: VideoFile) => {
          setIsRecording(false);
          stopSpinnerAnimation();
          if (timerRef.current) clearInterval(timerRef.current);
          const videoUri =
            Platform.OS === 'android' ? 'file://' + video.path : video.path;
          setPhoto({
            uri: videoUri,
            type: 'video/mp4',
            fileName: `video_${Date.now()}.mp4`,
          });
          setPreview({
            type: 'video',
            path: video?.path ? 'file://' + video.path : '',
          });
        },
        onRecordingError: error => {
          console.error('Recording error:', error);
          setIsRecording(false);
          stopSpinnerAnimation();
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        },
      });
    } catch (err) {
      console.error('startRecording err:', err);
      setIsRecording(false);
      stopSpinnerAnimation();
    }
  };

  // Stop recording
  const stopRecording = async () => {
    if (!isRecording) return;
    try {
      await cameraRef.current?.stopRecording();
      // onRecordingFinished will handle resetting state
    } catch (err) {
      console.error('stopRecording err:', err);
      setIsRecording(false);
      stopSpinnerAnimation();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const capturePhoto = async () => {
    if (isRecording || !cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePhoto({
        flash: flash,
        enableAutoRedEyeReduction: true,
      });

      if (!photo?.path) throw new Error('Photo path not found');

      const photoUri =
        Platform.OS === 'android' ? 'file://' + photo.path : photo.path;

      setPhoto({
        uri: photoUri,
        type: 'image/jpeg',
        fileName: `photo_${Date.now()}.jpg`,
      });

      setPreview({
        type: 'photo',
        path: photoUri,
      });
    } catch (err) {
      console.error('capturePhoto error:', err);
      toast.error('Photo is not capture yet!');
    }
  };

  // rotation interpolation
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Permission & device checks
  if (cameraPermission !== 'granted') {
    return (
      <View>
        <Text>Camera permission required</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  const handleAddStoryOrPost = async () => {
    try {
      setLoading(true);

      let data;

      if (selectedTab === 'Post') {
        data = await createPost(photo);
      }

      if (selectedTab === 'Story') {
        data = await createStory(photo);
      }

      if (!data?.success) {
        toast.error(data?.error?.message || 'Failed to submit');
        return;
      }

      toast.success(data.message);
      navigation.navigate('AppTabs', { screen: 'Home' });
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      quality: 1,
      selectionLimit: 10,
    });

    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];

      const fileType = asset.type;
      let mediaType: 'photo' | 'video' = fileType?.startsWith('image')
        ? 'photo'
        : 'video';

      setPhoto(asset);

      setPreview({ type: mediaType, path: asset.uri! });
    }
  };

  if (preview) {
    return (
      <PreviewScreen
        media={preview}
        onRetake={() => setPreview(null)}
        onUse={() => handleAddStoryOrPost()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        video={true}
      />

      {/* TOP BAR — Instagram Style */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => setFlash(f => (f === 'off' ? 'on' : 'off'))}
        >
          {/* <EditIcon flash={flash} /> */}
          {flash === 'on' ? <CameraFlahOn /> : <CameraFlashOff />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsFront(p => !p)}>
          <CameraFlip />
        </TouchableOpacity>
      </View>

      {/* RECORDING TIMER */}
      {isRecording && (
        <View style={styles.recTimer}>
          <View style={styles.recDot} />
          <Text style={styles.recTimerText}>
            {Math.floor(recordTimeSec / 60)
              .toString()
              .padStart(2, '0')}
            :{(recordTimeSec % 60).toString().padStart(2, '0')}
          </Text>
        </View>
      )}

      {/* BOTTOM AREA */}
      <View style={styles.bottomContainer}>
        {/* LEFT — Gallery Preview */}
        <TouchableOpacity onPress={openGallery} style={styles.galleryBox}>
          <GalleryIcon />
        </TouchableOpacity>

        {/* CENTER — SHUTTER BUTTON */}
        <Pressable
          onPress={capturePhoto}
          onLongPress={startRecording}
          onPressOut={stopRecording}
          style={[
            styles.captureButton,
            isRecording && styles.captureButtonRecording,
          ]}
        />

        {/* RIGHT SPACER */}
        <View style={{ width: 60 }} />
      </View>

      {/* MODES BELOW SHUTTER → POST / STORY / REEL */}
      <View style={styles.modeTabs}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTab(item)}
            style={styles.modeItem}
          >
            <Text
              style={[
                styles.modeText,
                selectedTab === item && styles.modeTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const StyleSheet = {
  absoluteFill: {
    position: 'absolute' as const,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};

const styles = StyleSheetCreate();

function StyleSheetCreate() {
  return {
    container: {
      flex: 1,
      backgroundColor: 'black',
    } as any,

    /* ---- TOP BAR ---- */
    topBar: {
      position: 'absolute' as const,
      top: Platform.OS === 'ios' ? 50 : 30,
      left: 0,
      right: 0,
      flexDirection: 'row' as const,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      zIndex: 20,
    } as any,

    /* ---- RECORD TIMER ---- */
    recTimer: {
      position: 'absolute' as const,
      top: Platform.OS === 'ios' ? 50 : 30,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 4,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 20,
      zIndex: 20,
    } as any,

    recDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: 'red',
      marginRight: 6,
    } as any,

    recTimerText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    } as any,

    /* ---- BOTTOM BAR (GALLERY + SHUTTER) ---- */
    bottomContainer: {
      width: '100%',
      position: 'absolute' as const,
      bottom: 110,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 25,
      zIndex: 20,
    } as any,

    galleryBox: {
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    } as any,

    /* ---- SHUTTER BUTTON ---- */
    captureButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 6,
      borderColor: 'white',
      backgroundColor: 'transparent',
    } as any,

    captureButtonRecording: {
      backgroundColor: 'red',
      borderColor: 'red',
    } as any,

    /* ---- MODES UNDER SHUTTER (POST / STORY / REEL) ---- */
    modeTabs: {
      position: 'absolute' as const,
      bottom: 40,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 20,
    } as any,

    modeItem: {
      marginHorizontal: 15,
    } as any,

    modeText: {
      color: '#b6b0b0ff',
      fontSize: 16,
      fontWeight: '500',
    } as any,

    modeTextActive: {
      color: 'white',
      fontWeight: '700',
    } as any,
  };
}
