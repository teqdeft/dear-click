import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Music from '../../assets/svgs/interest/Music';
import Fashion from '../../assets/svgs/interest/Fashion';
import Game from '../../assets/svgs/interest/Games';
import Pet from '../../assets/svgs/interest/Pet';
import Travel from '../../assets/svgs/interest/Travel';
import Technology from '../../assets/svgs/interest/Technology';
import Beauty from '../../assets/svgs/interest/Beauty';
import Food from '../../assets/svgs/interest/Food';
import Comedy from '../../assets/svgs/interest/Comedy';
import Skincare from '../../assets/svgs/interest/Skincare';
import Wellness from '../../assets/svgs/interest/Wellness';
import Bag from '../../assets/svgs/interest/Bag';
import Accessories from '../../assets/svgs/interest/Accessories';
import Sports from '../../assets/svgs/interest/Sports';
import All from '../../assets/svgs/interest/All';

export default function Interests() {
  const interests = [
    { name: 'All', icon: <All /> },
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
    <ScrollView
      style={styles.mainContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
    >
      <View style={styles.container}>
        {interests.map((interest, idx) => (
          <View style={styles.inner} key={idx}>
            {interest.icon}
            <Text style={styles.innerText}>{interest.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 14,
    backgroundColor: '#1F1F1F',
  },
  container: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  inner: {
    borderWidth: 1,
    borderColor: '#FFFFFF1A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  innerText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});
