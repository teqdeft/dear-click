import React, { useState } from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import PlusIcon from '../../assets/svgs/icons/PlusIcon';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function MyStory() {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const [photo, setPhoto] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.yourStory}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={
              photo
                ? { uri: photo } // show captured photo
                : require('../../assets/posts/profile.jpg')
            }
          />
        </View>
        <View
          style={[styles.plusIconContainer, { backgroundColor: '#1F1F1F' }]}
        >
          <TouchableOpacity
            style={styles.innerplusIconContainer}
            onPress={() => navigation.navigate('CreatePost')}
          >
            <PlusIcon fill={'#FFFFFF'} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.username, { color: '#CCCCCC' }]}>Your Story</Text>
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
    borderColor: '#FBC213', // brand color stays fixed
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 39,
    resizeMode: 'cover',
  },
  username: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  plusIconContainer: {
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
    backgroundColor: '#FBC213', // brand yellow
    padding: 5,
    borderRadius: 20,
  },
  plusIcon: {},
});
