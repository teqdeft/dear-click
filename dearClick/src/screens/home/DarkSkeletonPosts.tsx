import React, { useEffect, useRef } from 'react';
import { View, Animated, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function DarkSkeletonPosts() {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.8, // <-- small fade (very light)
          duration: 900, // slow & smooth
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Reusable fading box
  const FadeBox = ({ style }) => (
    <Animated.View
      style={[
        {
          backgroundColor: '#222',
          opacity: pulse,
          borderRadius: 6,
        },
        style,
      ]}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Stories
      <FlatList
        horizontal
        data={[...Array(8)]}
        keyExtractor={(_, i) => String(i)}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 12, marginBottom: 10 }}
        renderItem={() => (
          <View style={{ width: 70, marginRight: 12, alignItems: 'center' }}>
            <FadeBox
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
            />
            <FadeBox
              style={{
                height: 10,
                width: '70%',
                marginTop: 8,
              }}
            />
          </View>
        )}
      /> */}
      {/* Posts */}
      <FlatList
        data={[...Array(4)]}
        keyExtractor={(_, i) => String(i)}
        renderItem={() => (
          <View
            style={{ paddingHorizontal: 12, paddingTop: 12, marginBottom: 20 }}
          >
            {/* Post header */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <FadeBox style={{ width: 40, height: 40, borderRadius: 20 }} />
              <View style={{ marginLeft: 10 }}>
                <FadeBox style={{ height: 14, width: 120 }} />
                <FadeBox style={{ height: 10, width: 80, marginTop: 6 }} />
              </View>
            </View>

            {/* Image */}
            <FadeBox
              style={{ width: '100%', height: width, borderRadius: 10 }}
            />

            {/* Icons */}
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <FadeBox style={{ height: 20, width: 40, marginRight: 12 }} />
              <FadeBox style={{ height: 20, width: 40, marginRight: 12 }} />
              <FadeBox style={{ height: 20, width: 40 }} />
            </View>

            {/* Caption */}
            <View style={{ marginTop: 10 }}>
              <FadeBox style={{ height: 12, width: '90%' }} />
              <FadeBox style={{ height: 12, width: '80%', marginTop: 6 }} />
              <FadeBox style={{ height: 12, width: '60%', marginTop: 6 }} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
