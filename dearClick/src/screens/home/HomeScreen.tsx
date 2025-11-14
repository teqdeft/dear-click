import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Stories from '../stories/Stories';
import PostCard from '../../components/post/PostCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Interests from '../interests/Interests';
import ProfileSection from './ProfileSection';
import { fetchPost } from '../post/services/services';

type Post = {
  id: number;
  media_url: string;
  caption: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  share_count: string;
  userId: number;
  name: string;
  username: string;
  profile_pic: string;
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visiblePostId, setVisiblePostId] = useState<number | null>(null);
  const [likeTrigger, setLikeTrigger] = useState<number | null>(0);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70, // must be at least 70% visible
  }).current;

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const firstVisible = viewableItems[0]?.item?.id;
      setVisiblePostId(firstVisible);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const getPosts = async () => {
    try {
      setLoading(true);
      const { data } = await fetchPost();
      if (likeTrigger == 0) {
        const shuffledPosts = data.sort(() => Math.random() - 0.5);
        setPosts(shuffledPosts);
      }
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [likeTrigger]);

  return (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            isVisible={visiblePostId === item.id}
            onLikeSuccess={() => setLikeTrigger(prev => prev + 1)}
          />
        )}
        showsVerticalScrollIndicator={true}
        // showsVerticalScrollIndicator={true}
        ListHeaderComponent={
          <>
            <ProfileSection />
            <Stories />
            <Interests />
          </>
        }
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
});
