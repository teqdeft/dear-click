import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import BackButton from '../../assets/svgs/Auth svg/BackButton';
import { useNavigation } from '@react-navigation/core';
import toast from '../../components/utils/Toast';
import { updateProfile } from './services';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import BirthdayPicker from '../../components/utils/DatePicker';

export default function ContactDetail() {
  const { apiData, apiLoading, apiError, fetchApiData } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    gender: '',
    date_of_birth: '',
  });

  useEffect(() => {
    if (apiData) {
      setFormData({
        email: apiData?.email || '',
        phone: apiData?.phone || '',
        gender: apiData?.gender || '',
        date_of_birth: apiData?.date_of_birth || '',
      });
    }
  }, [apiData]);

  useEffect(() => {
    if (!apiData) {
      fetchApiData();
    }
  }, []);

  const handleUpdateProfile = async () => {
    if (!formData.email && !formData.phone) {
      toast.error('Please provide atleast one from email or phone!');
      return;
    }

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (formData.phone.length && formData.phone.length !== 10) {
      toast.error('Please enter a valid Contact');
      return;
    }

    try {
      setLoading(true);
      let action = 'Contact-info';
      const data = await updateProfile(formData, action);
      setLoading(false);
      if (!data.success) {
        return toast.error(data.error.message);
      }
      toast.success(data.message);
      navigation.navigate('AppTabs', { screen: 'Profile' });
    } catch (err) {
      setLoading(false);
      console.log(err);
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
        <Text style={styles.notificationTitle}>Contact Details</Text>
      </View>
      <View style={styles.profileInformation}>
        {/* Name */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Email</Text>
          <TextInput
            style={styles.optionCard}
            placeholder="Enter Your Email"
            placeholderTextColor="#AFAFAF"
            value={formData.email}
            editable={apiData?.email ? false : true}
            onChangeText={text => setFormData({ ...formData, email: text })}
          />
        </View>
        {/* Username */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Phone Number</Text>
          <TextInput
            style={styles.optionCard}
            placeholder="81658-48566"
            placeholderTextColor="#AFAFAF"
            editable={apiData?.phone ? false : true}
            value={formData.phone}
            onChangeText={text => setFormData({ ...formData, phone: text })}
          />
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Gender</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.gender}
              style={styles.optionCardV2}
              onValueChange={(itemValue, itemIndex) =>
                setFormData({ ...formData, gender: itemValue })
              }
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>
        {/* Birthday */}
        <View style={styles.optionsContainer}>
          <BirthdayPicker
            value={formData.date_of_birth}
            onChange={text => setFormData({ ...formData, date_of_birth: text })}
            label="Birthday"
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
    height: 53,
    marginTop: 30,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
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
  pickerWrapper: {
    height: 56,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 8,
    overflow: 'hidden',
  },
  optionCardV2: {
    height: 50,
    width: '100%',
  },
});
