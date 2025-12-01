import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet } from 'react-native';
import { searchUsersPublicPosts } from './services';
import { imageBaseURL } from './utils/url';
import { IMAGE_BASE_URL } from '@env';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await searchUsersPublicPosts();
      setPosts(res.data); // only array part
    } catch (error) {
      console.error('Error loading posts', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: `${IMAGE_BASE_URL}/posts/${item.media_url}` }}
      style={styles.image}
      resizeMode="cover"
    />
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: screenWidth / 2 - 4,
    height: 220,
    margin: 2,
    borderRadius: 10,
    backgroundColor: '#e0e0e0', // shimmer-like placeholder
  },
});
