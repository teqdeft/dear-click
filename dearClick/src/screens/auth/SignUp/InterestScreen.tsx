import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../../assets/svgs/Auth svg/BackButton';
import Music from '../../../assets/svgs/interest/Music';
import Fashion from '../../../assets/svgs/interest/Fashion';
import Game from '../../../assets/svgs/interest/Games';
import Pet from '../../../assets/svgs/interest/Pet';
import Travel from '../../../assets/svgs/interest/Travel';
import Technology from '../../../assets/svgs/interest/Technology';
import Beauty from '../../../assets/svgs/interest/Beauty';
import Food from '../../../assets/svgs/interest/Food';
import Comedy from '../../../assets/svgs/interest/Comedy';
import Skincare from '../../../assets/svgs/interest/Skincare';
import Wellness from '../../../assets/svgs/interest/Wellness';
import Bag from '../../../assets/svgs/interest/Bag';
import Accessories from '../../../assets/svgs/interest/Accessories';
import Sports from '../../../assets/svgs/interest/Sports';

export default function InterestScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (interest: string) => {
    setSelected(prev =>
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest],
    );
  };

  const interests = [
    { name: 'Music', icon: <Music /> },
    { name: 'Fashion', icon: <Fashion /> },
    { name: 'Games', icon: <Game /> },
    { name: 'Pet', icon: <Pet /> },
    { name: 'Travelling', icon: <Travel /> },
    { name: 'Technology', icon: <Technology /> },
    { name: 'Beauty', icon: <Beauty /> },
    { name: 'Food', icon: <Food /> },
    { name: 'Comedy', icon: <Comedy /> },
    { name: 'Skincare', icon: <Skincare /> },
    { name: 'Wellness', icon: <Wellness /> },
    { name: 'Bag', icon: <Bag /> },
    { name: 'Accessories', icon: <Accessories /> },
    { name: 'Sports', icon: <Sports /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Progress */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={[styles.progressDot, styles.activeDot]} />
        </View>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>

        {/* Title + Subtitle */}
        <View style={styles.header}>
          <Text style={styles.title}>Tell us your Interests</Text>
          <Text style={styles.subtitle}>
            Protect your account by creating a strong password
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {interests.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.input,
                selected.includes(item.name) && styles.selectedInput,
              ]}
              onPress={() => toggleSelect(item.name)}
            >
              <View style={styles.optionContent}>
                {item.icon}
                <Text
                  style={[
                    styles.optionText,
                    selected.includes(item.name) && styles.selectedText,
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate('CongratsScreen' as never)}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 2,
  },
  progressDot: {
    flex: 1,
    height: 4,
    backgroundColor: '#333',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  activeDot: {
    backgroundColor: '#F5A623',
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
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    lineHeight: 20,
  },
  optionsContainer: {
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    gap: 4,
    justifyContent: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
  input: {
    backgroundColor: '#262626',
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontSize: 10,
    fontWeight: '500',
    color: '#fff',
    width: 'auto',
    borderRadius: 30,
  },
  selectedInput: {
    backgroundColor: 'white',
  },
  selectedText: {
    color: '#000',
    fontWeight: '600',
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
  footer: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 14,
  },
  signInText: {
    color: '#FBC213',
    fontWeight: '600',
  },
});
