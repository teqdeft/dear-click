import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import BackButton from '../../assets/svgs/Auth svg/BackButton';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from '../../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import toast from '../../components/utils/Toast';
import { updateProfile, updateSettings } from './services';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function AccountSetings() {
  const { apiData, apiLoading, apiError, fetchApiData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [formData, setFormData] = useState({
    account_type: '',
    account_privacy: '',
    language: '',
  });

  useEffect(() => {
    if (apiData) {
      setFormData({
        account_type: apiData?.account_type || '',
        account_privacy: apiData?.account_privacy || '',
        language: apiData?.language || '',
      });
    }
  }, [apiData]);

  useEffect(() => {
    if (!apiData) {
      fetchApiData();
    }
  }, []);

  const handleUpdateSettings = async () => {

    if (!formData.account_type) {
      return toast.error('account_type is required!');
    }

    if (!formData.account_privacy) {
      return toast.error('account_privacy is required!');
    }

    try {
      setLoading(true);
      const data = await updateSettings(formData);
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
    <SafeAreaView style={styles.container}>
    <ScrollView >
      {/* Header */}
      <View style={styles.profileInfoHeader}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>
        <Text style={styles.notificationTitle}>Account Settings</Text>
      </View>
      <View style={styles.profileInformation}>
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Account Type</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.account_type}
              style={styles.optionCardV2}
              onValueChange={(itemValue, itemIndex) =>
                setFormData({ ...formData, account_type: itemValue })
              }
            >
              <Picker.Item label="Personal" value="1" />
              <Picker.Item label="Business" value="2" />
              <Picker.Item label="Creator" value="3" />
            </Picker>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Account Status</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.account_privacy}
              style={styles.optionCardV2}
              onValueChange={(itemValue, itemIndex) =>
                setFormData({ ...formData, account_privacy: itemValue })
              }
            >
              <Picker.Item label="Public" value="public" />
              <Picker.Item label="Private" value="private" />
            </Picker>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Language</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.language}
              style={styles.optionCardV2}
              onValueChange={(itemValue, itemIndex) =>
                setFormData({ ...formData, language: itemValue })
              }
            >
              <Picker.Item label="English" value="English" />
            </Picker>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueBtn} onPress={handleUpdateSettings} disabled={loading}>
          {loading ? (<ActivityIndicator color="#000" />) : (<Text style={styles.continueText}>Save</Text>)}
        </TouchableOpacity>

      </View>
    </ScrollView>
    </SafeAreaView>
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

  pickerWrapper: {
    height: 56,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 8,
    overflow: 'hidden',
  },

  optionCardV2: {
    height: 53,
    width: '100%',
  },

});
