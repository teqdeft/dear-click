import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import ProfileSection from './ProfileSection';
import Stories from '../stories/Stories';
import Interests from '../interests/Interests';
import PostCard from '../../components/post/PostCard';
import { fetchPost, fetchSinlgePost } from '../post/services/services';
import DarkSkeletonSoft from './DarkSkeleton';
import DarkSkeletonPosts from './DarkSkeletonPosts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [storiesRefreshKey, setStoriesRefreshKey] = useState(0);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const res = await fetchPost();
      if (res.success && res.data) {
        setPosts(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshSinglePost = async (postId: number) => {
    try {
      const result = await fetchSinlgePost(postId);

      if (result.success) {
        const updated = result.data;

        setPosts(prev =>
          prev.map(post => (post.id === postId ? updated : post)),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeed();
    setStoriesRefreshKey(k => k + 1);
    setRefreshing(false);
  };

  if (loading) return <DarkSkeletonSoft />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1F1F1F' }}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard {...item} onPostUpdated={refreshSinglePost} />
        )}
        ListHeaderComponent={
          <>
            <ProfileSection />
            <Stories refreshKey={storiesRefreshKey} />
            <Interests />
            {refreshing && <DarkSkeletonPosts />}
          </>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
