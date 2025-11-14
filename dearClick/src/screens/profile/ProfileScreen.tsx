import React, { useContext, useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BackButton from '../../assets/svgs/Auth svg/BackButton';
import EditIcon from '../../assets/svgs/icons/EditIcon';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IMAGE_BASE_URL } from '@env';
import { formatDate } from '../../helpers/dateFormatter';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ProfileScreen() {
  const { logout } = useContext(AuthContext);
  const { apiData, apiLoading, apiError, fetchApiData } =
    useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useFocusEffect(
    useCallback(() => {
      fetchApiData();
    }, []),
  );

  if (apiLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (apiError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {apiError}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.profileInfoHeader}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} >
          <BackButton />
        </TouchableOpacity>
        <Text style={styles.notificationTitle}>Settings</Text>
      </View>

      {/* Profile Main */}
      <View style={styles.profileMain}>
        <View style={styles.profileInfo}>
          <View style={styles.proifleImage}>

            <View style={styles.usrImage}>
              <Image
                source={apiData?.profile_pic ? { uri: `${IMAGE_BASE_URL}/profilePicture/${apiData?.profile_pic}`, } : require('../../assets/posts/profile.jpg')}
                style={styles.uploadUserImage}
              />
            </View>

            <TouchableOpacity style={styles.editImage} onPress={() => navigation.navigate('UploadProfilePicture')}>
              <EditIcon width={10} fill="#0a0a0aff" />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.userName}>{apiData?.name || '--'}</Text>
            <Text style={styles.userPhone}>{apiData?.phone || '--'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={logout}>
          <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Poppins-Medium', }}>Sign out</Text>
        </TouchableOpacity>

      </View>

      {/* Profile Information Section */}
      <View style={styles.profileInformation}>
        <Text style={styles.informationTitle}>Profile Information</Text>
        <TouchableOpacity style={styles.editInfo} onPress={() => navigation.navigate('ProfileInfo')}>
          <EditIcon />
        </TouchableOpacity>

        <View style={styles.information}>
          <View style={styles.infoGroup}>
            <Text style={styles.infoName}>Full Name</Text>
            <Text style={styles.infoValue}>{apiData?.name || '--'}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoName}>Username</Text>
            <Text style={styles.infoValue}>{apiData?.userName || '--'}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoName}>Bio</Text>
            <Text style={styles.infoValue}>{apiData?.bio || '--'}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoName}>Website</Text>
            <Text style={styles.infoValue}>{apiData?.website || '--'}</Text>
          </View>
        </View>
      </View>

      {/* Contact Details */}
      <View style={styles.profileInformation}>
        <Text style={styles.informationTitle}>Contact Details</Text>
        <TouchableOpacity style={styles.editInfo} onPress={() => navigation.navigate('ContactDetail')}>
          <EditIcon />
        </TouchableOpacity>

        <View style={styles.information}>
          <View style={styles.infoGroup}>
            <Text style={styles.infoName}>Email</Text>
            <Text style={styles.infoValue}>{apiData?.email || '--'}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoName}>Phone Number</Text>
            <Text style={styles.infoValue}>{apiData?.phone || '--'}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoName}>Gender</Text>
            <Text style={styles.infoValue}>{apiData?.gender || '--'}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoName}>Birthday</Text>
            <Text style={styles.infoValue}>
              {apiData?.date_of_birth || '--'}
            </Text>
          </View>
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.profileInformation}>
        <Text style={styles.informationTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.editInfo} onPress={() => navigation.navigate('AccountSetings')}>
          <EditIcon />
        </TouchableOpacity>

        <View style={styles.information}>
          <View style={styles.infoGroup}>
            <Text style={styles.infoName}>Account Type</Text>
            <Text style={styles.infoValue}>
              {apiData?.account_type == '1' ? 'Personal' : apiData?.account_type == '2' ? 'Business' : apiData?.account_type == '3' ? 'Creator' : '--'}
            </Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoName}>Account Status</Text>
            <Text style={styles.infoValue}> {apiData?.account_privacy || '--'}
            </Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoName}>Language</Text>
            <Text style={styles.infoValue}>{apiData?.language || '--'}</Text>
          </View>
        </View>
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
  },

  profileInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 23,
  },

  backBtn: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#262626',
    width: 40,
    height: 40,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },

  profileMain: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  proifleImage: {
    position: 'relative',
  },

  usrImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
    overflow: 'hidden',
  },

  uploadUserImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },

  editImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 22,
    width: 22,
    borderWidth: 3,
    borderColor: '#1F1F1F',
    backgroundColor: '#FBC213',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },

  userName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    paddingBottom: 5,
  },

  userPhone: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#fff',
  },

  signOutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 40,
    paddingHorizontal: 19,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileInformation: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 23,
    marginBottom: 20,
    position: 'relative',
  },

  informationTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 20,
  },

  editInfo: {
    position: 'absolute',
    right: 16,
    top: 13,
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  information: {
    marginTop: 10,
  },

  infoGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  infoName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    fontWeight: '400',
    color: '#fff',
    width: '40%',
  },

  infoValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#999999',
    width: '56%',
    fontWeight: '400',
  },

});
