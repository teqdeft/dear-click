import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import ProfileSection from './ProfileSection';
import Stories from '../stories/Stories';
import Interests from '../interests/Interests';
import PostCard from '../../components/post/PostCard';
import { fetchPost } from '../post/services/services';
import DarkSkeletonSoft from './DarkSkeleton';
import DarkSkeletonPosts from './DarkSkeletonPosts';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadFeed();
  };

  if (loading) {
    return <DarkSkeletonSoft />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#1F1F1F' }}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <PostCard {...item} />}
        ListHeaderComponent={
          <>
            <ProfileSection />
            <Stories />
            <Interests />
            {refreshing && <DarkSkeletonPosts />}
          </>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
