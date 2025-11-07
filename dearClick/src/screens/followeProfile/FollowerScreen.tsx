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
import { useNavigation, useRoute } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AllImagesIcon from '../../assets/svgs/profile/AllimgIcon';
import ReelsIcon from '../../assets/svgs/profile/ReelsIcon';
import ImageIcon from '../../assets/svgs/profile/ImageIcon';
import { fetchFollowerProfile } from './services';
import { IMAGE_BASE_URL } from '@env';
import { getMediaType } from '../../helpers/common';

type Post = {
  id: number;
  caption: string;
  media_url: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  save_count: number;
  location: string;
};

type ProfileData = {
  id: number;
  name: string;
  userName: string;
  profile_pic: string;
  following_count: number;
  followers_count: number;
  bio: string;
  post_count: number;
  posts: Post[];
};
type MediaType = 'AllMedia' | 'reels' | 'images';
export default function FollowerScreen() {
  const [activeTab, setActiveTab] = useState<MediaType>('AllMedia');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { userId } = route.params as { userId: number };
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchFollowerProfile({
          id: userId,
          media_type: activeTab,
        });
        console.log('API full response:', data);
        setProfileData(data);
      } catch (error) {
        console.log('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [activeTab]);

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileInfoHeader}>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>

        <TouchableOpacity style={styles.goProfileDetail}>
          <ThreeDots style={styles.goBackImage} />
        </TouchableOpacity>
      </View>

      {/* Profile Main */}
      <View style={styles.profileMain}>
        <View style={styles.profileInfo}>
          <View style={styles.proifleImage}>
            <View style={styles.usrImage}>
              <Image
                source={{
                  uri: `${IMAGE_BASE_URL}/profilePicture/${profileData?.profile_pic}`,
                }}
                style={styles.uploadUserImage}
              />
            </View>
          </View>
          <View style={styles.userDetail}>
            <Text style={styles.userName}>{profileData?.name}</Text>
            <Text style={styles.userPhone}>{profileData?.bio}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.userFollow}>
          <Text style={styles.userFollowText}>Follow</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.userUnFollow}>
          <Text style={styles.userUnFollowText}>UnFollow</Text>
        </TouchableOpacity> */}
      </View>

      {/* User Post Detail */}
      <View style={styles.userAllPost}>
        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}>{profileData?.post_count}</Text>

          <Text style={styles.postTypeTitle}>Posts</Text>
        </View>

        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}>{profileData?.followers_count}</Text>
          <Text style={styles.postTypeTitle}>Followers</Text>
        </View>

        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}>{profileData?.following_count}</Text>
          <Text style={styles.postTypeTitle}>Following</Text>
        </View>

        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}>87</Text>
          <Text style={styles.postTypeTitle}>Stories</Text>
        </View>
      </View>

      {/* Mood Section */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.highlights}
      >
        <View style={styles.mainContainer}>
          <View style={styles.moodCard}>
            <View style={styles.moodImage}>
              <Image
                source={require('../../assets/posts/profile.jpg')}
                style={styles.moodCardImage}
              />
            </View>
            <Text style={styles.moodText}>Travels</Text>
          </View>

          <View style={styles.moodCard}>
            <View style={styles.moodImage}>
              <Image
                source={require('../../assets/images/storyImage2.jpg')}
                style={styles.moodCardImage}
              />
            </View>
            <Text style={styles.moodText}>Cool</Text>
          </View>
          <View style={styles.moodCard}>
            <View style={styles.moodImage}>
              <Image
                source={require('../../assets/images/storyImage2.jpg')}
                style={styles.moodCardImage}
              />
            </View>
            <Text style={styles.moodText}>Cool</Text>
          </View>
          <View style={styles.moodCard}>
            <View style={styles.moodImage}>
              <Image
                source={require('../../assets/images/storyImage2.jpg')}
                style={styles.moodCardImage}
              />
            </View>
            <Text style={styles.moodText}>Cool</Text>
          </View>
          <View style={styles.moodCard}>
            <View style={styles.moodImage}>
              <Image
                source={require('../../assets/images/storyImage2.jpg')}
                style={styles.moodCardImage}
              />
            </View>
            <Text style={styles.moodText}>Cool</Text>
          </View>
          <View style={styles.moodCard}>
            <View style={styles.moodImage}>
              <Image
                source={require('../../assets/images/storyImage2.jpg')}
                style={styles.moodCardImage}
              />
            </View>
            <Text style={styles.moodText}>Cool</Text>
          </View>
          <View style={styles.moodCard}>
            <View style={styles.moodImage}>
              <Image
                source={require('../../assets/images/storyImage2.jpg')}
                style={styles.moodCardImage}
              />
            </View>

            <Text style={styles.moodText}>Cool</Text>
          </View>
        </View>
      </ScrollView>
      {/* all story detail */}

      {/* Tab Buttons */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'AllMedia' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('AllMedia')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'AllMedia' && styles.activeTabText,
            ]}
          >
            <View style={styles.storyMenu}>
              <AllImagesIcon
                color={activeTab === 'AllMedia' ? '#FBC213' : '#3F3F3F'}
              />
              <Text
                style={[
                  styles.storyText,
                  activeTab === 'AllMedia' && styles.storyTextActive,
                ]}
              >
                185
              </Text>
            </View>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'reels' && styles.activeTab]}
          onPress={() => setActiveTab('reels')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'reels' && styles.activeTabText,
            ]}
          >
            <View style={styles.storyMenu}>
              <ReelsIcon
                color={activeTab === 'reels' ? '#FBC213' : '#3F3F3F'}
              />

              <Text
                style={[
                  styles.storyText,
                  activeTab === 'reels' && styles.storyTextActive,
                ]}
              >
                18
              </Text>
            </View>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'images' && styles.activeTab]}
          onPress={() => setActiveTab('images')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'images' && styles.activeTabText,
            ]}
          >
            <View style={styles.storyMenu}>
              <ImageIcon
                color={activeTab === 'images' ? '#FBC213' : '#3F3F3F'}
              />
              <Text
                style={[
                  styles.storyText,
                  activeTab === 'images' && styles.storyTextActive,
                ]}
              >
                105
              </Text>
            </View>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
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
                  <Image
                    source={{
                      uri: `${IMAGE_BASE_URL}/posts/${posts?.media_url}`,
                    }}
                    style={styles.postMediaContent}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'reels' && (
          <View style={styles.postStoryRow}>
            <View style={styles.postStoryColl}>
              <View style={styles.postType}>
                <ReelsIcon />
              </View>
              <View style={styles.postCard}>
                <Image
                  source={require('../../assets/posts/profile.jpg')}
                  style={styles.postMediaContent}
                />
              </View>
            </View>

            <View style={styles.postStoryColl}>
              <View style={styles.postType}>
                <ReelsIcon />
              </View>
              <View style={styles.postCard}>
                <Image
                  source={require('../../assets/posts/profile.jpg')}
                  style={styles.postMediaContent}
                />
              </View>
            </View>

            <View style={styles.postStoryColl}>
              <View style={styles.postType}>
                <ReelsIcon />
              </View>
              <View style={styles.postCard}>
                <Image
                  source={require('../../assets/posts/profile.jpg')}
                  style={styles.postMediaContent}
                />
              </View>
            </View>

            <View style={styles.postStoryColl}>
              <View style={styles.postType}>
                <ReelsIcon />
              </View>
              <View style={styles.postCard}>
                <Image
                  source={require('../../assets/posts/profile.jpg')}
                  style={styles.postMediaContent}
                />
              </View>
            </View>

            <View style={styles.postStoryColl}>
              <View style={styles.postType}>
                <ReelsIcon />
              </View>
              <View style={styles.postCard}>
                <Image
                  source={require('../../assets/posts/profile.jpg')}
                  style={styles.postMediaContent}
                />
              </View>
            </View>

            <View style={styles.postStoryColl}>
              <View style={styles.postType}>
                <ReelsIcon />
              </View>
              <View style={styles.postCard}>
                <Image
                  source={require('../../assets/posts/profile.jpg')}
                  style={styles.postMediaContent}
                />
              </View>
            </View>
          </View>
        )}
        {activeTab === 'images' && (
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
                  <Image
                    source={{
                      uri: `${IMAGE_BASE_URL}/posts/${posts?.media_url}`,
                    }}
                    style={styles.postMediaContent}
                  />
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

  // post detail
  userAllPost: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },

  userPostDetail: {
    alignItems: 'center',
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

  // end

  profileInfoHeader: {
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
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

  notificationTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
    textAlign: 'center',
    flex: 1,
  },

  profileMain: {
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  mainContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  proifleImage: {
    position: 'relative',
  },

  usrImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#FBC213',
  },

  uploadUserImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },

  userDetail: {
    justifyContent: 'center',
  },

  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    paddingBottom: 5,
  },

  userPhone: {
    fontSize: 14,
    color: '#999999',
    maxWidth: 140,
  },
  highlights: {
    flex: 1,
    gap: 10,
    height: 100,
  },

  userFollow: {
    backgroundColor: '#FBB116',
    borderRadius: 40,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  userUnFollow: {
    backgroundColor: '#353535',
    borderRadius: 40,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  userFollowText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
  },

  userUnFollowText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },

  moodCard: {
    alignItems: 'flex-start',
  },

  moodImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#3f3f3f',
    overflow: 'hidden',
  },

  moodCardImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },

  moodText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },

  tabs: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },

  tabButtons: {
    flexDirection: 'row',
  },

  tabBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  tabBtnActive: {
    backgroundColor: 'transparent',
  },

  storyMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  storyIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  storyText: {
    fontSize: 12,
    color: '#555',
  },

  storyTextActive: {
    color: '#FBC213',
    fontWeight: '600',
  },

  tabContent: {
    paddingHorizontal: 16,
    marginTop: 10,
  },

  postStoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '1%',
  },

  postStoryColl: {
    width: '32.66666%',
    position: 'relative',
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

  typeIconImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
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

  // new tab box
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },

  tabText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 16,
  },

  activeTab: {
    position: 'relative',
  },

  activeTabText: {
    color: '#FBC213',
    fontWeight: '600',
  },

  contentBox: {
    marginTop: 10,
    elevation: 3,
    marginBottom: 50,
  },

  contentText: {
    fontSize: 16,
  },
});
