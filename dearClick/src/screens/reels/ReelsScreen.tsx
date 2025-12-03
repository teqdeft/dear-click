import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Notification from '../../assets/svgs/icons/Notification';
import Like from '../../assets/svgs/icons/Like';
import Comment from '../../assets/svgs/icons/Comment';
import Share from '../../assets/svgs/icons/Share';
import ThreeDots from '../../assets/svgs/icons/ThreeDots';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { BlurView } from "@react-native-community/blur";

const { height, width } = Dimensions.get('window');

export default function ReelsScreen() {
  // for progress bar
  const [progress, setProgress] = useState(0.4); // 40%

  // post text read more and less
  const [expanded, setExpanded] = useState(false);

  const text =
    'Today I’m listening to my favorite music. Today I’m listening to my favorite music. Today I’m listening to my favorite music. Today I’m listening to my favorite music.';

  // toggle button
  const [activeTab, setActiveTab] = useState('For You');

  const data = [
    { label: 'Recent', value: 'Recent' },
    { label: 'Click', value: 'Click' },
    { label: 'Clicka', value: 'Clicka' },
    { label: 'Clickb', value: 'Clickb' },
  ];
  return (
    <SafeAreaView style={styles.postDetailWrap}>
      {/* share post media */}
      <View style={styles.postMainMedia}>
        <Image
          source={require('../../assets/posts/postimg.png')}
          style={styles.sharePostImage}
        />
      </View>

      {/* gradient for overlay */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']}
        style={styles.postMainMediaAfter}
      ></LinearGradient>

      {/* Notification */}
      <TouchableOpacity style={styles.storyNotification}>
        <Notification />
      </TouchableOpacity>

      {/* for you and followed */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'For You' && styles.activeTab]}
          onPress={() => setActiveTab('For You')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'For You' && styles.activeText,
            ]}
          >
            For You
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Followed' && styles.activeTab]}
          onPress={() => setActiveTab('Followed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Followed' && styles.activeText,
            ]}
          >
            Followed
          </Text>
        </TouchableOpacity>
      </View>

      {/* 
        <BlurView style={styles.tabContainer}  blurType="light" // "dark" | "light" | "xlight" | etc.
          blurAmount={15}
        >
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "For You" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("For You")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "For You" && styles.activeText,
              ]}
            >
              For You
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Followed" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("Followed")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Followed" && styles.activeText,
              ]}
            >
              Followed
            </Text>
          </TouchableOpacity>
          
        </BlurView> */}

      <View style={styles.actionOnPost}>
        <TouchableOpacity>
          <View style={styles.actionBtnCircle}>
            <Like />
          </View>
          <Text style={styles.actionOnPostText}>249</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionOnPost}>
        <TouchableOpacity>
          <View style={styles.actionBtnCircle}>
            <Comment />
          </View>
          <Text style={styles.actionOnPostText}>10</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionOnPost}>
        <TouchableOpacity>
          <View style={styles.actionBtnCircle}>
            <Share />
          </View>
          <Text style={styles.actionOnPostText}>516</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionReadMore}>
        <TouchableOpacity style={styles.actionReadModal}>
          <View>
            <ThreeDots />
          </View>
        </TouchableOpacity>
      </View>

      {/* Profile Main */}
      <View style={styles.profileMain}>
        <View style={styles.profileInfo}>
          <View style={styles.proifleImage}>
            <View style={styles.usrImage}>
              <Image
                source={require('../../assets/posts/postimg.png')}
                style={styles.uploadUserImage}
              />
            </View>
          </View>
          <View style={styles.userDetail}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userPhone}>
              Artist | Art Instructor Based in Ireland
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Follow</Text>
        </TouchableOpacity>
      </View>

      {/* story detail */}
      <Text style={styles.postDetailText}>
        {expanded ? text : text.slice(0, 50) + '...'}
      </Text>

      <View style={styles.postHashTag}>
        <Text style={styles.hashTag}>#Lifestyle</Text>
        <Text style={styles.hashTag}>#Music</Text>
        <Text style={styles.hashTag}>#Lifestyle</Text>
      </View>

      <TouchableOpacity
        style={styles.readMoreOuter}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.readMore}>
          {expanded ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>

      {/* progress bar */}
      <View style={styles.progressBackground}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      {/* app footr place here */}
      <View style={styles.footer}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
  },

  // notification
  storyNotification: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    position: 'absolute',
    right: 16,
    top: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // tab container
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 25,
    padding: 8,
    alignSelf: 'center',
    maxWidth: 180,
    height: 50,
    position: 'absolute',
    top: 70,
    width: '50%',
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#FFB800',
  },

  tabText: {
    color: '#fff',
    fontSize: 14,
    padding: 0,
    lineHeight: 14,
    fontFamily: 'Poppins-Regular',
  },

  activeText: {
    color: '#191919',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },

  // action on post
  actionOnPost: {
    width: 'auto',
    textAlign: 'right',
    paddingHorizontal: 16,
    marginLeft: 'auto',
    marginBottom: 10,
  },

  actionReadMore: {
    width: 'auto',
    textAlign: 'right',
    paddingHorizontal: 16,
    marginLeft: 'auto',
  },

  actionBtnCircle: {
    height: 40,
    width: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionReadModal: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionOnPostText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },

  // post detail
  postDetailText: {
    fontSize: 15,
    color: '#fff',
    width: '100%',
    paddingHorizontal: 16,
    textAlign: 'left',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },

  postHashTag: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    gap: 7,
    marginBottom: 5,
  },

  hashTag: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },

  readMoreOuter: {
    width: 'auto',
    textAlign: 'right',
    paddingHorizontal: 16,
    marginLeft: 'auto',
  },

  readMore: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },

  // footer
  footer: {
    height: 100,
    width: '100%',
    backgroundColor: 'rgba(42, 42, 42, 0.83)',
  },

  // progress bar
  progressBackground: {
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(56, 56, 56, 1)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FBC213',
  },

  // profile detail
  profileMain: {
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
    zIndex: 2,
    width: '100%',
    paddingHorizontal: 18,
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
    height: 52,
    width: 52,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#FBC213',
    padding: 3,
  },

  uploadUserImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },

  userDetail: {
    justifyContent: 'center',
  },

  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
    paddingBottom: 5,
  },

  userPhone: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    maxWidth: 170,
  },

  signOutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  signOutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  // post main media
  postDetailWrap: {
    height: height,
    width: width,
    backgroundColor: 'lightblue',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },

  postMainMedia: {
    height: height,
    width: width,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },

  postMainMediaAfter: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },

  // MAIN POST START
  mainMediaPost: {
    width: '100%',
    height: 450,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
  },

  sharePostImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },

  // upload story
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
});
