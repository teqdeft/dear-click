import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyStory from './MyStory';

export default function Stories() {
  const stories = [
    {
      id: 1,
      image: require('../../assets/images/storyImage.jpg'),
      username: '@Prachi',
    },
    {
      id: 2,
      image: require('../../assets/images/storyImage2.jpg'),
      username: '@Ankit',
    },
    {
      id: 3,
      image: require('../../assets/images/storyImage.jpg'),
      username: '@Vishal',
    },
    {
      id: 4,
      image: require('../../assets/images/storyImage.jpg'),
      username: '@Neha',
    },
    {
      id: 5,
      image: require('../../assets/images/storyImage.jpg'),
      username: '@Ravi',
    },
    {
      id: 6,
      image: require('../../assets/images/storyImage.jpg'),
      username: '@Kriti',
    },
    {
      id: 7,
      image: require('../../assets/images/storyImage.jpg'),
      username: '@Aman',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <MyStory />
      <View style={styles.mainContainer}>
        {stories.map(story => (
          <View key={story.id}>
            <View style={styles.innerContainer}>
              <Image style={styles.image} source={story.image} />
            </View>
            <Text style={styles.username}>{story.username}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: '#1F1F1F',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  yourStory: {
    marginRight: 10,
  },
  innerContainer: {
    width: 82,
    height: 82,
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
});
