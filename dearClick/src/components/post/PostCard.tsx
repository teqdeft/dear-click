// components/post/PostCard.tsx
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import ThreeDots from '../../assets/svgs/icons/ThreeDots';
import Like from '../../assets/svgs/icons/Like';
import Comment from '../../assets/svgs/icons/Comment';
import Share from '../../assets/svgs/icons/Share';
import Save from '../../assets/svgs/icons/Save';
import { IMAGE_BASE_URL } from '@env';

type PostCardProps = {
  user_name?: string;
  user_username?: string;
  user_profile_pic?: string;
  caption?: string;
  media_url?: string;
  like_count?: number;
  comment_count?: number;
  share_count?: number;
  created_at?: string;
};

export default function PostCard({
  user_name = 'John Doe',
  user_username = '@johndoerunner',
  user_profile_pic = require('../../assets/posts/profile.jpg'),
  caption = 'In 2025, fashion is all about blending sustainability with bold creativity.',
  media_url = require('../../assets/posts/postimg.png'),
  like_count = 385,
  comment_count = 162,
  share_count = 35,
  created_at = new Date().toISOString(),
}: PostCardProps) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  // Format time ago (simple version)
  const timeAgo = (() => {
    const now = new Date();
    const postDate = new Date(created_at);
    const diffInMinutes = Math.floor(
      (now.getTime() - postDate.getTime()) / 60000,
    );
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const hours = Math.floor(diffInMinutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${Math.floor(hours / 24)} day${
      Math.floor(hours / 24) > 1 ? 's' : ''
    } ago`;
  })();

  const profilePicSource = user_profile_pic
    ? { uri: `${IMAGE_BASE_URL}/profilePicture/${user_profile_pic}` } // Update base URL
    : require('../../assets/posts/profile.jpg');

  const postImageSource = media_url
    ? { uri: `${IMAGE_BASE_URL}/posts/${media_url}` } // Update base URL
    : require('../../assets/posts/postimg.png');

  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <View style={[styles.innnercontainer, { backgroundColor: '#1F1F1F' }]}>
        {/* User Info Section */}
        <View style={styles.userinfo}>
          <View style={styles.profileDetails}>
            <View style={styles.imageContainer}>
              <Image source={profilePicSource} style={styles.profileImage} />
            </View>
            <View style={styles.textDetails}>
              <Text style={[styles.name, { color: '#fff' }]}>{user_name}</Text>
              <Text style={[styles.username, { color: '#aaa' }]}>
                @{user_username} • {timeAgo}
              </Text>
            </View>
          </View>
          <ThreeDots />
        </View>

        {/* Post Image */}
        <View style={styles.postImage}>
          <Image source={postImageSource} style={styles.postMainImage} />
          <Text style={[styles.caption, { color: '#999999' }]}>{caption}</Text>
        </View>

        {/* Reactions */}
        <View style={styles.bottomContainer}>
          <View style={styles.reactions}>
            <TouchableOpacity
              style={[styles.like, { borderColor: '#FFFFFF1A' }]}
            >
              <Like />
              <Text style={[styles.reactionText, { color: '#fff' }]}>
                {like_count}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.like, { borderColor: '#FFFFFF1A' }]}
            >
              <Comment />
              <Text style={[styles.reactionText, { color: '#fff' }]}>
                {comment_count}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.like, { borderColor: '#FFFFFF1A' }]}
            >
              <Share />
              <Text style={[styles.reactionText, { color: '#fff' }]}>
                {share_count}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={[styles.save, { borderColor: '#FFFFFF1A' }]}
            >
              <Save />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

// Keep all your existing styles unchanged
const styles = StyleSheet.create({
  // ... exactly same as before (no change needed)
  container: {
    padding: 10,
  },
  innnercontainer: {
    padding: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  userinfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  imageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    width: 40,
    height: 40,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textDetails: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  username: {
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  postMainImage: {
    width: '100%',
    height: 503,
    resizeMode: 'cover',
  },
  caption: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: 10,
  },
  reactions: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  bottomContainer: {
    borderTopWidth: 1,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  like: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  reactionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  save: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 50,
    padding: 10,
  },
});
