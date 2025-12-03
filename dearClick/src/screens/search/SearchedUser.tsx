import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
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

import { IMAGE_BASE_URL } from '@env';
import { follows, getUserDetails } from '../search/services';
import toast from '../../components/utils/Toast';

type MediaType = 'AllMedia' | 'reels' | 'images';

export default function SearchedUser({ route }) {
  const [activeTab, setActiveTab] = useState<MediaType>('AllMedia');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = route?.params?.userId;

  // Fetch profile data

  const fetchProfile = async () => {
    try {
      const res = await getUserDetails(userId);
      setUserData(res.data);
    } catch (err) {
      console.log('Failed to load user :: ', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User not found</Text>
      </View>
    );
  }

  const handleFollow = async (id: number) => {
    const res = await follows(id);

    toast.success(res.message);
    fetchProfile();
    if (!res?.success) {
      toast.success(res?.error?.metadata);
      return;
    }

    const action = res.data.action;
    const status = res.data.status;

    setUserData(prev => ({
      ...prev,
      isFollowing: action === 'followed' || action === 'requested',
      followers_count:
        action === 'followed'
          ? prev.followers_count + 1
          : action === 'unfollowed'
          ? Math.max(prev.followers_count - 1, 0)
          : prev.followers_count,
      followStatus: status,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.profileInfoHeader}>
          <TouchableOpacity
            style={styles.goBackBtn}
            onPress={() => navigation.goBack()}
          >
            <BackButton />
          </TouchableOpacity>

          <TouchableOpacity style={styles.goProfileDetail}>
            <ThreeDots
              //   onPress={() => navigation.navigate('Profilesc')}
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
                  source={{
                    uri: userData.profile_pic
                      ? `${IMAGE_BASE_URL}/profilePicture/${userData.profile_pic}`
                      : 'https://via.placeholder.com/150',
                  }}
                  style={styles.image}
                />
              </View>
            </View>

            <View style={styles.userDetail}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userPhone}>{userData.phone}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.followsButton,
                {
                  backgroundColor:
                    userData.followStatus === 'accepted'
                      ? '#333'
                      : userData.followStatus === 'pending'
                      ? '#555'
                      : '#999',
                },
              ]}
              onPress={() => handleFollow(userData.id)}
            >
              <Text style={styles.userName}>
                {userData.followStatus === 'accepted'
                  ? 'Following'
                  : userData.followStatus === 'pending'
                  ? 'Requested'
                  : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Stats */}
        <View style={styles.userAllPost}>
          <View style={styles.userPostDetail}>
            <Text style={styles.numberPost}>{userData.following_count}</Text>
            <Text style={styles.postTypeTitle}>Posts</Text>
          </View>

          <View style={styles.userPostDetail}>
            <Text style={styles.numberPost}>{userData.followers_count}</Text>
            <Text style={styles.postTypeTitle}>Followers</Text>
          </View>

          <View style={styles.userPostDetail}>
            <Text style={styles.numberPost}>{userData.following_count}</Text>
            <Text style={styles.postTypeTitle}>Following</Text>
          </View>
        </View>

        <Highlights />

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TabButton
            icon={AllImagesIcon}
            label="AllMedia"
            count={0}
            active={activeTab === 'AllMedia'}
            onPress={() => setActiveTab('AllMedia')}
          />

          <TabButton
            icon={ReelsIcon}
            label="reels"
            count={0}
            active={activeTab === 'reels'}
            onPress={() => setActiveTab('reels')}
          />

          <TabButton
            icon={ImageIcon}
            label="images"
            count={0}
            active={activeTab === 'images'}
            onPress={() => setActiveTab('images')}
          />
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
  followsButton: {
    backgroundColor: '#999999',
    borderRadius: 20,
    height: 42,
    width: 91,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
