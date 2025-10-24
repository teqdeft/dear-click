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

export default function PostCard() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

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
        {/* User Info Section */}
        <View style={styles.userinfo}>
          <View style={styles.profileDetails}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/posts/profile.jpg')}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.textDetails}>
              <Text style={[styles.name, { color: isDark ? '#fff' : '#000' }]}>
                John Doe
              </Text>
              <Text
                style={[styles.username, { color: isDark ? '#aaa' : '#555' }]}
              >
                @johndoerunner • 1 min ago
              </Text>
            </View>
          </View>
          <ThreeDots />
        </View>

        {/* Post Image */}
        <View style={styles.postImage}>
          <Image
            source={require('../../assets/posts/postimg.png')}
            style={styles.postMainImage}
          />
          <Text
            style={[styles.caption, { color: isDark ? '#999999' : '#444' }]}
          >
            😄 In 2025, fashion is all about blending sustainability with bold
            🎨 creativity.
          </Text>
        </View>

        {/* Reactions */}
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
                385
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
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
                162
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
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
                35
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={[
                styles.save,
                { borderColor: isDark ? '#FFFFFF1A' : '#0000001A' },
              ]}
            >
              <Save />
            </TouchableOpacity>
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
  postImage: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  postMainImage: {
    width: '100%',
    height: 343,
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
