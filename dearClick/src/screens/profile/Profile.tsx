import React, { useEffect, useState } from 'react';
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
import { fetchUserProfile } from './services';
import { formatCount, getMediaType } from '../../helpers/common';
import { IMAGE_BASE_URL } from '@env';


type Post = {
  id: number;
  caption: string;
  media_url: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  save_count: number;
  location: string;
  thumbnail_url: string;
};

type ProfileData = {
  id: number;
  name: string;
  userName: string;
  profile_pic: string;
  following_count: number;
  followers_count: number;
  bio: string;
  all_media_count: number;
  images_count: number;
  reels_count: number;
  posts: Post[];
};

type MediaType = 'AllMedia' | 'reels' | 'images';

export default function Profile() {
  const [activeTab, setActiveTab] = useState<MediaType>('AllMedia');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const getUserProfle = async () => {
      try {
        setLoading(true);
        const { data } = await fetchUserProfile({ media_type: activeTab, });
        setProfileData(data);
      } catch (error) {
        console.log('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserProfle();
  }, [activeTab]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.profileInfoHeader}>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.goProfileDetail}
          onPress={() => navigation.navigate('Profilesc')}
        >
          <Setting style={styles.goBackImage} />
        </TouchableOpacity>
      </View>

      {/* Profile Main */}
      <View style={styles.profileMain}>
        <View style={styles.profileInfo}>
          <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.usrImage}>
                <Image source={{ uri: `${IMAGE_BASE_URL}/profilePicture/${profileData?.profile_pic}`, }} style={styles.uploadUserImage} />
              </View>
            </View>
          </View>
          <View style={styles.userDetail}>
            <Text style={styles.userName}>{profileData?.name}</Text>
            <Text style={styles.userPhone}>{profileData?.bio}</Text>
          </View>
        </View>
      </View>

      {/* User Stats */}
      <View style={styles.userAllPost}>
        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}>{formatCount(profileData?.all_media_count)}</Text>
          <Text style={styles.postTypeTitle}>Posts</Text>
        </View>

        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}>{formatCount(profileData?.followers_count)}</Text>
          <Text style={styles.postTypeTitle}>Followers</Text>
        </View>

        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}>{formatCount(profileData?.following_count)}</Text>
          <Text style={styles.postTypeTitle}>Following</Text>
        </View>
      </View>

      <Highlights />

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TabButton
          icon={AllImagesIcon}
          label="AllMedia"
          count={formatCount(profileData?.all_media_count)}
          active={activeTab === 'AllMedia'}
          onPress={() => setActiveTab('AllMedia')}
        />

        <TabButton
          icon={ReelsIcon}
          label="reels"
          count={formatCount(profileData?.reels_count)}
          active={activeTab === 'reels'}
          onPress={() => setActiveTab('reels')}
        />

        <TabButton
          icon={ImageIcon}
          label="images"
          count={formatCount(profileData?.images_count)}
          active={activeTab === 'images'}
          onPress={() => setActiveTab('images')}
        />
      </View>

      <View style={styles.contentBox}>
        {activeTab === 'AllMedia' && (
          <View style={styles.postStoryRow}>
            {profileData?.posts?.map(posts => (
              <View style={styles.postStoryColl} key={posts.id}>
                <View style={styles.postType}>
                  {getMediaType(posts.media_url) == 'image' ? (
                    <ImageIcon color={'#FFFFFF'} />
                  ) : (
                    <ReelsIcon color={'#FFFFFF'} />
                  )}
                </View>
                <View style={styles.postCard}>
                  {getMediaType(posts.media_url) == 'image' ? (
                    <Image
                      source={{
                        uri: `${IMAGE_BASE_URL}/posts/${posts?.media_url}`,
                      }}
                      style={styles.postMediaContent}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: `${IMAGE_BASE_URL}/thumbnail/posts/${posts?.thumbnail_url}`,
                      }}
                      style={styles.postMediaContent}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'reels' && (
          <View style={styles.postStoryRow}>
            {profileData?.posts?.map(posts => (
              <View style={styles.postStoryColl} key={posts.id}>
                <View style={styles.postType}>
                  {getMediaType(posts.media_url) == 'image' ? (<ImageIcon color={'#FFFFFF'} />) : (<ReelsIcon color={'#FFFFFF'} />)}
                </View>
                <View style={styles.postCard}>
                  <Image
                    source={{
                      uri: `${IMAGE_BASE_URL}/thumbnail/posts/${posts?.thumbnail_url}`,
                    }}
                    style={styles.postMediaContent}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
        {activeTab === 'images' && (
          <View style={styles.postStoryRow}>
            {profileData?.posts?.map(posts => (
              <View style={styles.postStoryColl} key={posts.id}>

                <View style={styles.postType}>
                  {getMediaType(posts.media_url) == 'image' ? (<ImageIcon color={'#FFFFFF'} />) : (<ReelsIcon color={'#FFFFFF'} />)}
                </View>

                <View style={styles.postCard}>
                  <Image source={{ uri: `${IMAGE_BASE_URL}/posts/${posts?.media_url}`, }} style={styles.postMediaContent} />
                </View>

              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
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
