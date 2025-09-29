import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ThreeDots from '../../assets/svgs/icons/ThreeDots';
import Like from '../../assets/svgs/icons/Like';
import Comment from '../../assets/svgs/icons/Comment';
import Share from '../../assets/svgs/icons/Share';
import Save from '../../assets/svgs/icons/Save';

export default function PostCard() {
  return (
    <View style={styles.container}>
      <View style={styles.innnercontainer}>
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
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.username}>@johndoerunner • 1 min ago</Text>
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
          <Text style={styles.caption}>
            😄 In 2025, fashion is all about blending sustainability with bold
            🎨 creativity.
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.reactions}>
            <View style={styles.like}>
              <Like />
              <Text style={styles.reactionText}>385</Text>
            </View>
            <View style={styles.like}>
              <Comment />
              <Text style={styles.reactionText}>162</Text>
            </View>
            <View style={styles.like}>
              <Share />
              <Text style={styles.reactionText}>35</Text>
            </View>
          </View>

          <View>
            <View style={styles.save}>
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
    backgroundColor: 'black',
  },
  innnercontainer: {
    padding: 10,
    backgroundColor: '#1F1F1F',
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
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  username: {
    color: '#aaa',
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
    color: '#999999',
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
    borderColor: '#FFFFFF1A',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  like: {
    borderWidth: 1,
    borderColor: '#FFFFFF1A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  reactionText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  save: {
    borderWidth: 1,
    borderColor: '#FFFFFF1A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 50,
    padding: 10,
  },
});
