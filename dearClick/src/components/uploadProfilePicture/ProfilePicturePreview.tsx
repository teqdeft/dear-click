import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import BackButton from '../../assets/svgs/Auth svg/BackButton';
import { useNavigation, useRoute } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import toast from '../utils/Toast';
import { updateProfilePicture } from '../../screens/profile/services';

export default function ProfilePicturePreview() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { imageUri: initialImageUri } = route.params as { imageUri: string };

  const [imageUri, setImageUri] = useState(initialImageUri);
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Let user adjust and crop inside circular frame
  const handleAdjustPhoto = async () => {
    try {
      const image = await ImagePicker.openCropper({
        path: imageUri,
        width: 400,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        freeStyleCropEnabled: false,
        compressImageQuality: 1,
      });
      setImageUri(image.path);
      setPhoto({
        uri: image.path,
        type: image.mime,
        fileName: image.path.split('/').pop() || 'photo.jpg',
      });
    } catch (err) {
      console.log('Crop cancelled or failed:', err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      if (!photo) return toast.error('Please adjust and confirm your photo!');
      const data = await updateProfilePicture({
        photo,
        action: 'profileImage',
      });
      setLoading(false);
      if (!data?.success) return toast.error(data.error.message);
      toast.success(data.message);
      navigation.navigate('AppTabs', { screen: 'Profile' });
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.profileInfoHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
      </View>

      <View style={styles.addContent}>
        <Text style={styles.addProfileTitle}>Profile Picture Preview</Text>
      </View>

      {/* Circular Frame */}
      <TouchableOpacity onPress={handleAdjustPhoto}>
        <View style={styles.userProfileOuter}>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.userProileImage} />
          )}
        </View>
      </TouchableOpacity>

      {/* Upload button */}
      <TouchableOpacity
        style={styles.uploadImageButton}
        onPress={handleUpdateProfile}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.takePhotoText}>Save</Text>
        )}
      </TouchableOpacity>

      {/* Skip */}
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => navigation.navigate('AppTabs', { screen: 'Profile' })}
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
    height: 70,
  },
  backBtn: {
    backgroundColor: '#262626',
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addContent: {
    marginBottom: 20,
  },
  addProfileTitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  userProfileOuter: {
    alignSelf: 'center',
    height: 250,
    width: 250,
    borderRadius: 125,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  userProileImage: {
    height: '100%',
    width: '100%',
  },
  uploadImageButton: {
    backgroundColor: '#F5A623',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  takePhotoText: {
    fontSize: 18,
    color: '#101010',
    fontWeight: '500',
  },
  skipBtn: {
    marginTop: 30,
  },
  skipBtnText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 50,
  },
});
