import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import BackButton from '../../assets/svgs/Auth svg/BackButton';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from '../../context/AuthContext';
import toast from '../../components/utils/Toast';
import { updateProfile } from './services';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function ProfileInfo() {
  const { apiData, apiLoading, apiError, fetchApiData } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    bio: '',
    website: '',
  });

  useEffect(() => {
    if (apiData) {
      setFormData({
        name: apiData?.name || '',
        userName: apiData?.userName || '',
        bio: apiData?.bio || '',
        website: apiData?.website || '',
      });
    }
  }, [apiData]);

  useEffect(() => {
    if (!apiData) {
      fetchApiData();
    }
  }, []);

  const handleUpdateProfile = async () => {
    if (!formData.name) {
      return toast.error('Name is required!');
    }
    if (!formData.userName) {
      return toast.error('Username is required!');
    }

    try {
      setLoading(true);
      let action = 'Profile-info';
      const data = await updateProfile(formData, action);
      setLoading(false);

      if (!data.success) {
        return toast.error(data.error.message);
      }
      toast.success(data.message);
      navigation.navigate('AppTabs', { screen: 'Profile' });
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

  if (apiLoading) return <ActivityIndicator size="large" color="#000" />;

  if (apiError) return <Text>Error: {apiError}</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.profileInfoHeader}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Text style={styles.notificationTitle}>Profile Information</Text>
      </View>
      <View style={styles.profileInformation}>
        {/* Name */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Full Name</Text>
          <TextInput
            style={styles.optionCard}
            placeholder="Enter Your Full Name"
            placeholderTextColor="#AFAFAF"
            value={formData.name}
            onChangeText={text => setFormData({ ...formData, name: text })}
          />
        </View>
        {/* Username */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>User Name</Text>
          <TextInput
            style={styles.optionCard}
            placeholder="Enter Your User Name"
            placeholderTextColor="#AFAFAF"
            value={formData.userName}
            editable={false}
            onChangeText={text => setFormData({ ...formData, userName: text })}
          />
        </View>
        {/* Bio */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Bio</Text>
          <TextInput
            style={styles.optionCard2}
            placeholder="Enter Your Bio"
            placeholderTextColor="#AFAFAF"
            value={formData.bio}
            onChangeText={text => setFormData({ ...formData, bio: text })}
          />
        </View>
        {/* Website */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Website</Text>
          <TextInput
            style={styles.optionCard2}
            placeholder="Enter Your Website"
            placeholderTextColor="#AFAFAF"
            value={formData.website}
            onChangeText={text => setFormData({ ...formData, website: text })}
          />
        </View>
        {/* Continue Button */}

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.continueText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 23,
  },
  profileInformation: {
    backgroundColor: '#1F1F1F',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 20,
    position: 'relative',
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

  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  optionsContainer: {
    marginBottom: 4,
    height: 100,
  },
  emaillabel: {
    color: 'grey',
    marginBottom: 10,
    fontSize: 14,
  },
  optionCard: {
    height: 56,
    fontSize: 16,
    color: '#fff',
    width: '100%',
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  optionCard2: {
    height: 56,
    fontSize: 16,
    color: '#fff',
    width: '100%',
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  continueBtn: {
    backgroundColor: '#FBC213',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: '10%',
  },
  continueText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  signInText: {
    color: '#FBC213',
    fontWeight: '600',
  },
});
