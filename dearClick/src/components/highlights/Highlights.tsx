/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import Plus from '../../assets/svgs/icons/Plus';

export default function Stories() {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  const stories = [
    {
      id: 1,
      image: require('../../assets/images/storyImage.jpg'),
      username: 'Travels',
    },
    {
      id: 2,
      image: require('../../assets/images/storyImage2.jpg'),
      username: 'Cool',
    },
    {
      id: 3,
      image: require('../../assets/images/storyImage.jpg'),
      username: 'Scot',
    },
    {
      id: 4,
      image: require('../../assets/images/storyImage.jpg'),
      username: 'Holidays',
    },
    {
      id: 5,
      image: require('../../assets/images/storyImage.jpg'),
      username: 'Outing',
    },
    {
      id: 6,
      image: require('../../assets/images/storyImage.jpg'),
      username: 'Junlge safari',
    },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF' },
      ]}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <TouchableOpacity>
          <View style={styles.innerContainer}>
            <Plus />
          </View>
          <Text
            style={[
              styles.username,
              { color: isDarkMode ? '#CCCCCC' : '#555555' },
            ]}
          >
            New
          </Text>
        </TouchableOpacity>
        {stories.map(story => (
          <View key={story.id}>
            <View style={styles.innerContainer}>
              <Image style={styles.image} source={story.image} />
            </View>
            <Text
              style={[
                styles.username,
                { color: isDarkMode ? '#CCCCCC' : '#555555' },
              ]}
            >
              {story.username}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  innerContainer: {
    width: 60,
    height: 60,
    borderWidth: 2,
    padding: 4,
    borderRadius: 41,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#999999',
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
});
