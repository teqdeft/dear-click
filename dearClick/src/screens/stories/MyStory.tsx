import React, { useState } from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import PlusIcon from '../../assets/svgs/icons/PlusIcon';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function MyStory() {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const [photo, setPhoto] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // 📸 CAMERA PERMISSION
  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to upload stories.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openCamera();
        } else {
          Alert.alert('Permission Denied', 'Camera permission is required!');
        }
      } else {
        openCamera();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 📷 OPEN CAMERA
  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Camera error');
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          setPhoto(uri); // ✅ Type-safe
        }
      }
    });
  };

  // 🖼️ OPEN GALLERY
  const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Gallery error');
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          setPhoto(uri); // ✅ Type-safe
        }
      }
    });
  };

  // 🧠 SHOW CHOICE (CAMERA OR GALLERY)
  const chooseImageSource = () => {
    Alert.alert(
      'Upload Story',
      'Choose an option',
      [
        { text: 'Camera', onPress: requestCameraPermission },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.yourStory}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={
              photo
                ? { uri: photo } // show captured photo
                : require('../../assets/posts/profile.jpg')
            }
          />
        </View>
        <View
          style={[
            styles.plusIconContainer,
            { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFFFFF' },
          ]}
        >
          <TouchableOpacity
            style={styles.innerplusIconContainer}
            onPress={() => navigation.navigate('UploadStory')}
          >
            <PlusIcon fill={isDarkMode ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={[styles.username, { color: isDarkMode ? '#CCCCCC' : '#555555' }]}
      >
        Your Story
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  yourStory: {
    marginRight: 10,
  },
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
    borderColor: '#FBC213', // brand color stays fixed
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
    backgroundColor: '#FBC213', // brand yellow
    padding: 5,
    borderRadius: 20,
  },
  plusIcon: {},
});
