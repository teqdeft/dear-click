import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import BackButton from '../../assets/svgs/Auth svg/BackButton';
import { useNavigation } from '@react-navigation/core';
export default function ContactDetail() {
  const navigation = useNavigation();
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
            placeholder="John@example.com"
            placeholderTextColor="#AFAFAF"
          />
        </View>
        {/* Username */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Phone Number</Text>
          <TextInput
            style={styles.optionCard}
            placeholder="81658-48566"
            placeholderTextColor="#AFAFAF"
          />
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Gender</Text>
          <TextInput
            style={styles.optionCard}
            placeholder="Male"
            placeholderTextColor="#AFAFAF"
          />
        </View>
        {/* Bio */}
        <View style={styles.optionsContainer}>
          <Text style={styles.emaillabel}>Birthday</Text>
          <TextInput
            style={styles.optionCard2}
            placeholder="26 Oct 2001"
            placeholderTextColor="#AFAFAF"
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueText}>Save</Text>
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
