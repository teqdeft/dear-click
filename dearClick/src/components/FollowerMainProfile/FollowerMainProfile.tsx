import { IMAGE_BASE_URL } from '@env';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { formatCount } from '../../helpers/common';

interface ProfileData {
  profile_pic?: string;
  name?: string;
  bio?: string;
  all_media_count?: number;
  followers_count?: number;
  following_count?: number;
}

interface ProfileMainProps {
  profileData: ProfileData;
  onFollow?: (event: GestureResponderEvent) => void;
  isFollowing?: boolean;
}

const ProfileMain: React.FC<ProfileMainProps> = ({ profileData, onFollow, isFollowing = false, }) => {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileMain}>
        <View style={styles.profileInfo}>
          <View style={styles.proifleImage}>

            <View style={styles.usrImage}>
              <Image source={{ uri: `${IMAGE_BASE_URL}/profilePicture/${profileData?.profile_pic}`, }} style={styles.uploadUserImage} />
            </View>
          </View>

          <View style={styles.userDetail}>
            <Text style={styles.userName}>{profileData?.name}</Text>
            <Text style={styles.userPhone}>{profileData?.bio}</Text>
          </View>

        </View>

        {isFollowing ? (
          <TouchableOpacity style={styles.userUnFollow} onPress={onFollow}>
            <Text style={styles.userUnFollowText}>Unfollow</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.userFollow} onPress={onFollow}>
            <Text style={styles.userFollowText}>Follow</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* User Stats Section */}
      <View style={styles.userAllPost}>
        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}>
            {formatCount(profileData?.all_media_count)}
          </Text>
          <Text style={styles.postTypeTitle}>Posts</Text>
        </View>

        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}> {formatCount(profileData?.followers_count)}</Text>
          <Text style={styles.postTypeTitle}>Followers</Text>
        </View>

        <View style={styles.userPostDetail}>
          <Text style={styles.numberPost}> {formatCount(profileData?.following_count)} </Text>
          <Text style={styles.postTypeTitle}>Following</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
  },

  profileMain: {
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
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

  userFollow: {
    backgroundColor: '#FBB116',
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

  userUnFollow: {
    backgroundColor: '#353535',
    borderRadius: 40,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  userUnFollowText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },

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
});
