import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import BackButton from '../../assets/svgs/Auth svg/BackButton';
import ThreeDots from '../../assets/svgs/icons/ThreeDots';
import Highlights from '../../components/highlights/Highlights';
import TabButton from '../../components/mediaTab/MediaTab';
import AllImagesIcon from '../../assets/svgs/profile/AllimgIcon';
import ReelsIcon from '../../assets/svgs/profile/ReelsIcon';
import ImageIcon from '../../assets/svgs/profile/ImageIcon';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Setting from '../../assets/svgs/icons/Setting';
import Stories from '../stories/Stories';
import { SafeAreaView } from 'react-native-safe-area-context';

type MediaType = 'AllMedia' | 'reels' | 'images';

export default function Profile() {
  const [activeTab, setActiveTab] = useState<MediaType>('AllMedia');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  // Static dummy data (UI only)
  const profileData = {
    name: 'John Doe',
    bio: 'This is a user bio',
    profile_pic: '',
    all_media_count: 23,
    followers_count: 500,
    following_count: 120,
    reels_count: 8,
    images_count: 15,
    posts: [
      { id: 1, media_url: '', thumbnail_url: '' },
      { id: 2, media_url: '', thumbnail_url: '' },
      { id: 3, media_url: '', thumbnail_url: '' },
    ],
  };

  return (
    <SafeAreaView style={styles.container} >
    <ScrollView  >
      {/* Header */}
      <View style={styles.profileInfoHeader}>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>

        <TouchableOpacity style={styles.goProfileDetail}>
          <Setting
            onPress={() => navigation.navigate('Profilesc')}
            style={styles.goBackImage}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Main */}
      <View style={styles.profileMain}>
        <View style={styles.profileInfo}>
          <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <Image
                source={require('../../assets/posts/profile.jpg')}
                style={styles.image}
              />
            </View>
          </View>
          <View style={styles.userDetail}>
            <Text style={styles.userName}>{profileData.name}</Text>
            <Text style={styles.userPhone}>{profileData.bio}</Text>
          </View>
        </View>
      </View>

      {/* User Stats */}
      <View style={styles.userAllPost}>
        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}>{profileData.all_media_count}</Text>
          <Text style={styles.postTypeTitle}>Posts</Text>
        </View>

        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}>{profileData.followers_count}</Text>
          <Text style={styles.postTypeTitle}>Followers</Text>
        </View>

        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}>{profileData.following_count}</Text>
          <Text style={styles.postTypeTitle}>Following</Text>
        </View>
      </View>

      <Highlights />

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TabButton
          icon={AllImagesIcon}
          label="AllMedia"
          count={profileData.all_media_count}
          active={activeTab === 'AllMedia'}
          onPress={() => setActiveTab('AllMedia')}
        />

        <TabButton
          icon={ReelsIcon}
          label="reels"
          count={profileData.reels_count}
          active={activeTab === 'reels'}
          onPress={() => setActiveTab('reels')}
        />

        <TabButton
          icon={ImageIcon}
          label="images"
          count={profileData.images_count}
          active={activeTab === 'images'}
          onPress={() => setActiveTab('images')}
        />
      </View>

      {/* Posts Display – static UI */}
      <View style={styles.contentBox}>
        <View style={styles.postStoryRow}>
          {profileData.posts.map(post => (
            <View style={styles.postStoryColl} key={post.id}>
              <View style={styles.postType}>
                <ImageIcon color={'#FFFFFF'} />
              </View>

              <View style={styles.postCard}>
                <Image
                  source={require('../../assets/posts/profile.jpg')}
                  style={styles.postMediaContent}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  innerContainer: {
    width: 82,
    height: 82,
    borderWidth: 2,
    padding: 4,
    borderRadius: 41,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FBC213',
  },
  userAllPost: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  userPostDetail: {
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 39,
    resizeMode: 'cover',
  },
  numberPost: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  postTypeTitle: {
    color: '#999999',
    fontSize: 13,
    marginTop: 4,
  },
  profileInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  goBackBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#262626',
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goProfileDetail: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#262626',
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  profileMain: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  proifleImage: { position: 'relative' },
  usrImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FBC213',
  },
  uploadUserImage: {
    height: '100%',
    width: '100%',
  },
  userDetail: { justifyContent: 'center' },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    paddingBottom: 5,
  },
  userPhone: { fontSize: 14, color: '#999', maxWidth: 140 },
  userFollow: {
    backgroundColor: '#FBB116',
    borderRadius: 40,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userFollowText: { color: '#000', fontSize: 12, fontWeight: '500' },
  postStoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '1%',
  },
  postStoryColl: {
    width: '32.6%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  postType: {
    position: 'absolute',
    top: 8,
    right: 15,
    zIndex: 8,
    height: 20,
    width: 20,
  },
  postCard: {
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#8080801c',
  },
  postMediaContent: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
   
  },
  contentBox: {
    marginTop: 10,
    marginBottom: 50,
  },
});
