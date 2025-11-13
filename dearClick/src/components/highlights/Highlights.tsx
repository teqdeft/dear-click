import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
const Highlights = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.highlights}
    >
      <View style={styles.mainContainer}>
        <View style={styles.moodCard}>
          <View style={styles.moodImage}>
            <Image
              source={require('../../assets/posts/profile.jpg')}
              style={styles.moodCardImage}
            />
          </View>
          <Text style={styles.moodText}>Travels</Text>
        </View>

        <View style={styles.moodCard}>
          <View style={styles.moodImage}>
            <Image
              source={require('../../assets/images/storyImage2.jpg')}
              style={styles.moodCardImage}
            />
          </View>
          <Text style={styles.moodText}>Cool</Text>
        </View>
        <View style={styles.moodCard}>
          <View style={styles.moodImage}>
            <Image
              source={require('../../assets/images/storyImage2.jpg')}
              style={styles.moodCardImage}
            />
          </View>
          <Text style={styles.moodText}>Cool</Text>
        </View>
        <View style={styles.moodCard}>
          <View style={styles.moodImage}>
            <Image
              source={require('../../assets/images/storyImage2.jpg')}
              style={styles.moodCardImage}
            />
          </View>
          <Text style={styles.moodText}>Cool</Text>
        </View>
        <View style={styles.moodCard}>
          <View style={styles.moodImage}>
            <Image
              source={require('../../assets/images/storyImage2.jpg')}
              style={styles.moodCardImage}
            />
          </View>
          <Text style={styles.moodText}>Cool</Text>
        </View>
        <View style={styles.moodCard}>
          <View style={styles.moodImage}>
            <Image
              source={require('../../assets/images/storyImage2.jpg')}
              style={styles.moodCardImage}
            />
          </View>
          <Text style={styles.moodText}>Cool</Text>
        </View>
        <View style={styles.moodCard}>
          <View style={styles.moodImage}>
            <Image
              source={require('../../assets/images/storyImage2.jpg')}
              style={styles.moodCardImage}
            />
          </View>

          <Text style={styles.moodText}>Cool</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Highlights;

const styles = StyleSheet.create({
  highlights: {
    flex: 1,
    gap: 10,
    height: 100,
  },

  mainContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  moodCard: {
    alignItems: 'flex-start',
  },
  moodImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#3f3f3f',
    overflow: 'hidden',
  },
  moodCardImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },

  moodText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
});
