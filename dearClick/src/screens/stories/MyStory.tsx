import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PlusIcon from '../../assets/svgs/icons/PlusIcon';

export default function MyStory() {
  return (
    <View style={styles.yourStory}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/posts/profile.jpg')}
          />
        </View>
        <View style={styles.plusIconContainer}>
          <TouchableOpacity style={styles.innerplusIconContainer}>
            <PlusIcon style={styles.plusIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.username}>Your Story</Text>
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
    borderColor: '#FBC213',
  },
  image: {
    width: 78,
    height: 78,
    borderRadius: 39,
    resizeMode: 'cover',
  },
  username: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: 'grey',
  },
  plusIconContainer: {
    backgroundColor: '#1F1F1F',
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
    backgroundColor: '#FBC213',
    padding: 5,
    borderRadius: 20,
  },
  plusIcon: {},
});
