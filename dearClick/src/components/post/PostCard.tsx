import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ThreeDots from '../../assets/svgs/icons/ThreeDots';
import Like from '../../assets/svgs/icons/Like';
import Comment from '../../assets/svgs/icons/Comment';
import Share from '../../assets/svgs/icons/Share';
import Save from '../../assets/svgs/icons/Save';
import { IMAGE_BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/core';
import {
  postLike,
  fetchComments,
  addComment,
  getComments,
  createComment,
} from '../../screens/post/services/services';
import { fetchSinlgePost } from '../../screens/post/services/services';
import CommentsModal from './CommentsModal';
import { deleteComment } from '../../screens/post/services/services';
import { Pressable } from 'react-native';

export default function PostCard({
  id,
  user_id,
  user_name = 'John Doe',
  user_username = '@johndoerunner',
  user_profile_pic = require('../../assets/posts/profile.jpg'),
  caption = 'In 2025, fashion is all about blending sustainability with bold creativity.',
  media_url = require('../../assets/posts/postimg.png'),
  like_count = 385,
  comment_count = 162,
  share_count = 35,
  created_at = new Date().toISOString(),
  onUpdatePost,
}) {
  const scheme = useColorScheme();
  const navigation = useNavigation();

  const [localLike, setLocalLike] = useState(like_count);

  const [commentModal, setCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

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
    ? { uri: `${IMAGE_BASE_URL}/profilePicture/${user_profile_pic}` }
    : require('../../assets/posts/profile.jpg');

  const postImageSource = media_url
    ? { uri: `${IMAGE_BASE_URL}/posts/${media_url}` }
    : require('../../assets/posts/postimg.png');

  const handleLike = async () => {
    try {
      await postLike({ postId: id });
      const updated = await fetchSinlgePost(id);

      if (updated?.data) {
        setLocalLike(updated.data.like_count);
        onUpdatePost?.(updated.data);
      }
    } catch (err) {
      console.log('like error', err);
    }
  };

  const openComments = async () => {
    try {
      setCommentModal(true);
      setLoadingComments(true);

      const res = await getComments(id);

      if (res?.data) {
        setComments(res.data);
      }
    } catch (err) {
      console.log('fetch comment error', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await createComment(id, commentText);

      if (res?.data) {
        setComments([res.data, ...comments]); // add instantly
        setCommentText('');
        fetchSinlgePost(id);
      }
    } catch (err) {
      console.log('add comment error', err);
    }
  };

  const handleClick = id => {
    navigation.navigate('SearchedUser', { userId: id });
  };

  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <View style={[styles.innnercontainer, { backgroundColor: '#1F1F1F' }]}>
        {/* USER INFO */}
        <View style={styles.userinfo}>
          <TouchableOpacity
            style={styles.profileDetails}
            onPress={() => handleClick(user_id)}
          >
            <View style={styles.imageContainer}>
              <Image source={profilePicSource} style={styles.profileImage} />
            </View>
            <View style={styles.textDetails}>
              <Text style={[styles.name, { color: '#fff' }]}>{user_name}</Text>
              <Text style={[styles.username, { color: '#aaa' }]}>
                @{user_username} • {timeAgo}
              </Text>
            </View>
          </TouchableOpacity>
          <ThreeDots />
        </View>

        {/* POST IMAGE */}
        <View style={styles.postImage}>
          <Image source={postImageSource} style={styles.postMainImage} />
          <Text style={[styles.caption, { color: '#999999' }]}>{caption}</Text>
        </View>

        {/* REACTIONS */}
        <View style={styles.bottomContainer}>
          <View style={styles.reactions}>
            <TouchableOpacity
              onPress={handleLike}
              style={[styles.like, { borderColor: '#FFFFFF1A' }]}
            >
              <Like fill={'#FBC213'} />
              <Text style={[styles.reactionText, { color: '#fff' }]}>
                {localLike}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openComments}
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

      <CommentsModal
        visible={commentModal}
        comments={comments}
        loading={loadingComments}
        commentText={commentText}
        onClose={() => setCommentModal(false)}
        onCommentTextChange={setCommentText}
        onSendComment={handleSendComment}
      />
    </View>
  );
}

// Styles unchanged
const styles = StyleSheet.create({
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
