import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Animated, Easing } from 'react-native';
import { searchUsersPublicPosts } from './services';
import { IMAGE_BASE_URL } from '@env';

const numColumns = 3;

// 🔵 PULSE ANIMATION BOX
const PulseBox = ({ style }) => {
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.85,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]} />;
};

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await searchUsersPublicPosts();
      setPosts(res.data);
    } catch (error) {
      console.error('Error loading posts', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: `${IMAGE_BASE_URL}/posts/${item.media_url}` }}
      style={styles.image}
    />
  );

  // Skeleton Item with Pulse Animation
  const SkeletonItem = () => <PulseBox style={styles.skeletonBox} />;

  const renderSkeleton = () => (
    <FlatList
      data={[...Array(12).keys()]} // skeleton count
      key={numColumns}
      numColumns={numColumns}
      renderItem={() => <SkeletonItem />}
      scrollEnabled={false}
    />
  );

  return loading ? (
    renderSkeleton()
  ) : (
    <FlatList
      data={posts}
      key={numColumns}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 230,
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#2b2b2b',
  },

  skeletonBox: {
    width: 110,
    height: 230,
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
  },
});
