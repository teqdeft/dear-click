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
import { getMediaType, getPostDuration } from '../../helpers/common';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Video from 'react-native-video';

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
  share_count: string;
};

type PostCardProps = {
  item: Post;
  isVisible: boolean;
};

export default function PostCard({ item, isVisible }: PostCardProps) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  //  const myfun = async()=>{
  //   await AsyncStorage.removeItem("userToken")
  //  }
  //  myfun()

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? 'black' : '#F5F5F5' },
      ]}
    >
      <View
        style={[
          styles.innnercontainer,
          { backgroundColor: isDark ? '#1F1F1F' : '#FFFFFF' },
        ]}
      >
        {/* 🔹 User Info */}
        <View style={styles.userinfo}>
          <View style={styles.profileDetails}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `${IMAGE_BASE_URL}/profilePicture/${item?.profile_pic}`,
                }}
                style={styles.profileImage}
              />
            </View>

            <View style={styles.textDetails}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('FollowerScreen', { userId: item.userId })
                }
              >
                <Text
                  style={[styles.name, { color: isDark ? '#fff' : '#000' }]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
              <Text
                style={[styles.username, { color: isDark ? '#aaa' : '#555' }]}
              >
                @{item.username} • {getPostDuration(item.created_at)}
              </Text>
            </View>
          </View>
          <ThreeDots />
        </View>

        {/*  Post Media */}
        <View style={styles.postImage}>
          {getMediaType(item.media_url) == 'image' ? (
            <Image
              source={{
                uri: `${IMAGE_BASE_URL}/posts/${item?.media_url}`,
              }}
              style={styles.postMainImage}
            />
          ) : (
            <Video
              source={{ uri: `${IMAGE_BASE_URL}/posts/${item?.media_url}` }}
              style={styles.postMainImage1}
              resizeMode="cover"
              repeat={true}
              paused={!isVisible}
              muted={false}
            />
          )}
          <Text
            style={[styles.caption, { color: isDark ? '#999999' : '#444' }]}
          >
            {item.caption}
          </Text>
        </View>

        {/* 🔹 Reactions */}
        <View style={styles.bottomContainer}>
          <View style={styles.reactions}>
            <TouchableOpacity
              style={[
                styles.like,
                { borderColor: isDark ? '#FFFFFF1A' : '#0000001A' },
              ]}
            >
              <Like />
              <Text
                style={[
                  styles.reactionText,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                {item.like_count}
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.like,
                { borderColor: isDark ? '#FFFFFF1A' : '#0000001A' },
              ]}
            >
              <Comment />
              <Text
                style={[
                  styles.reactionText,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                {item.comment_count}
              </Text>
            </View>

            <View
              style={[
                styles.like,
                { borderColor: isDark ? '#FFFFFF1A' : '#0000001A' },
              ]}
            >
              <Share />
              <Text
                style={[
                  styles.reactionText,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                {item.share_count} Share
              </Text>
            </View>
          </View>

          <View>
            <View
              style={[
                styles.save,
                { borderColor: isDark ? '#FFFFFF1A' : '#0000001A' },
              ]}
            >
              <Save />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

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
  postImage: { width: '100%', borderRadius: 10, overflow: 'hidden' },
  postMainImage: { width: '100%', height: 403, resizeMode: 'cover' },
  postMainImage1: { width: '100%', height: 403 },
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
