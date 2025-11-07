import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
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
  userId: number;
  name: string;
  username: string;
  profile_pic: string;
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchPost();
        console.log('API full response:', data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    // <SafeAreaView>
    //   <ScrollView style={styles.container}>
    //     <ProfileSection />
    //     <Stories />
    //     <Interests />
    //     <View>
    //       <FlatList
    //         data={posts}
    //         keyExtractor={item => item.id.toString()}
    //         renderItem={({ item }) => <PostCard item={item} />}
    //         showsVerticalScrollIndicator={true}
    //       />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <PostCard item={item} />}
        showsVerticalScrollIndicator={true}
        ListHeaderComponent={
          <>
            <ProfileSection />
            <Stories />
            <Interests />
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
});
