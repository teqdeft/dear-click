// import React, { useEffect, useState } from 'react';
// import { FlatList, RefreshControl } from 'react-native';
// import PostCard from '../../components/post/PostCard';
// import { fetchPost } from '../post/services/services';
// import DarkSkeletonSoft from './DarkSkeleton';

// type Post = {
//   id: number;
//   caption: string;
//   media_url: string;
//   user_name: string;
//   user_username: string;
//   user_profile_pic: string;
//   like_count: number;
//   comment_count: number;
//   share_count: number;
//   save_count: number;
//   created_at: string;
//   location?: string;
// };

// export default function FeedScreen() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const loadFeed = async () => {
//     try {
//       const res = await fetchPost();
      
//       if (res.success && res.data) {
//         setPosts(res.data);
//       }
//     } catch (err) {
//       console.log('Error fetching posts:', err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };
//   useEffect(() => {
//     loadFeed();
//   }, []);
//   const onRefresh = () => {
//     setRefreshing(true);
//     loadFeed();
//   };

//   if (loading) {
//     return <DarkSkeletonSoft />;
//   }

//   return (
//     <FlatList
//       data={posts}
//       keyExtractor={item => item.id.toString()}
//       renderItem={({ item }) => <PostCard {...item} />}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           tintColor="gray"
//         />
//       }
//       ListHeaderComponent={refreshing ? <DarkSkeletonSoft /> : null}
//       showsVerticalScrollIndicator={false}
//     />
//   );
// }
