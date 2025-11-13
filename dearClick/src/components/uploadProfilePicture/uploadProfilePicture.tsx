import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import BackButton from '../../assets/svgs/Auth svg/BackButton';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { AuthContext } from '../../context/AuthContext';
import { IMAGE_BASE_URL } from '@env';

export default function UploadProfilePicture() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { apiData, apiLoading, apiError, fetchApiData } =
    useContext(AuthContext);
  const [photo, setPhoto] = useState<any>(null);

  useEffect(() => {
    if (!apiData) {
      fetchApiData();
    }
  }, []);

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

  // OPEN CAMERA
  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: false,
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Error', response.errorMessage || 'Camera error');
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          const formattedUri = uri.startsWith('file://')
            ? uri
            : `file://${uri}`;
          setPhoto(formattedUri);
          navigation.navigate('ProfilePicturePreview', {
            imageUri: formattedUri,
            photo: response.assets[0],
          });
        }
      }
    });
  };

  // OPEN GALLERY
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
        console.log('Error', response.errorMessage || 'Gallery error');
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          const formattedUri = uri.startsWith('file://')
            ? uri
            : `file://${uri}`;
          setPhoto(formattedUri);
          navigation.navigate('ProfilePicturePreview', {
            imageUri: formattedUri,
            photo: response.assets[0],
          });
        }
      }
    });
  };

  if (apiLoading) return <ActivityIndicator size="large" color="#000" />;

  if (apiError) return <Text>Error: {apiError}</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileInfoHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
      </View>
      <View style={styles.addContent}>
        <Text style={styles.addProfileTitle}>Add A Profile Picture</Text>
        <Text style={styles.addProfiletext}>Take or upload a picture</Text>
      </View>
      <View style={styles.userProfileOuter}>
        <Image
          source={
            apiData?.profile_pic
              ? {
                  uri: `${IMAGE_BASE_URL}/profilePicture/${apiData?.profile_pic}`,
                }
              : require('../../assets/posts/profile.jpg')
          }
          style={styles.userProileImage}
        />
      </View>
      {/* Upload Image Button */}
      <TouchableOpacity style={styles.uploadImageButton} onPress={openGallery}>
        <Text style={styles.uploadBtnText}>Upload A Photo</Text>
      </TouchableOpacity>
      {/* Take Photo Button */}
      <TouchableOpacity
        style={styles.takePhotoButton}
        onPress={requestCameraPermission}
      >
        <Text style={styles.takePhotoText}>Take A Photo</Text>
      </TouchableOpacity>
      {/* Skip For Now Button */}
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.skipBtnText}>Skip For Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
  },
  profileInfoHeader: {
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 0,
    height: 70,
  },
  backBtn: {
    marginBottom: '20%',
    backgroundColor: '#262626',
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addContent: {
    position: 'relative',
  },
  addProfileTitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 10,
    fontWeight: 500,
  },
  addProfiletext: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  userProfileOuter: {
    position: 'relative',
    height: 250,
    width: 250,
    borderRadius: '100%',
    overflow: 'hidden',
    margin: 'auto',
  },
  userProileImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  uploadImageButton: {
    backgroundColor: '#F5A623',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  uploadBtnText: {
    fontSize: 18,
    color: '#101010',
    fontWeight: 500,
  },
  takePhotoButton: {
    backgroundColor: '#F5A623',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  takePhotoText: {
    fontSize: 18,
    color: '#101010',
    fontWeight: 500,
  },
  skipBtn: {
    position: 'relative',
  },
  skipBtnText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 50,
  },
});
