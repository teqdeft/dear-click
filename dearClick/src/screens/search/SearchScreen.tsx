import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { searchUsers } from './services';
import { IMAGE_BASE_URL } from '@env';
import AllPosts from './AllPosts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import Interests from '../interests/Interests';
import BackButton from '../../assets/svgs/Auth svg/BackButton';
import Searchicon from '../../assets/svgs/home/Searchicon';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Fetch results when typing
  const fetchResults = async (text: string) => {
    if (!text.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await searchUsers(text);
      setResults(res?.data || []);
    } catch (err) {
      console.log('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce
  useEffect(() => {
    const timeout = setTimeout(() => fetchResults(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleClick = (id: number) => {
    navigation.navigate('SearchedUser', { userId: id });
  };
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleClick(item.id)}
    >
      <Image
        source={{
          uri: `${IMAGE_BASE_URL}/profilePicture/${item.profile_pic}`,
        }}
        style={styles.profilePic}
      />
      <View>
        <Text style={styles.username}>{item.name}</Text>
        <Text style={styles.username}>@{item.username}</Text>
      </View>
    </TouchableOpacity>
  );
  const SkeletonItem = () => {
    return (
      <View style={styles.skeletonItem}>
        <View style={styles.skeletonAvatar} />
        <View style={{ flex: 1 }}>
          <View style={styles.skeletonLine} />
          <View style={[styles.skeletonLine, { width: 120, marginTop: 6 }]} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Input */}
      <View>
        <View style={[styles.searchContainer, { alignItems: 'center' }]}>
          <TouchableOpacity
            style={styles.goBackBtn}
            onPress={() => navigation.goBack()}
          >
            <BackButton />
          </TouchableOpacity>

          {/* Search Box with Icons */}
          <View style={styles.inputWrapper}>
            <Searchicon width={18} height={18} color="#888" />

            <TextInput
              placeholder="Search users..."
              placeholderTextColor="#999"
              value={query}
              onChangeText={setQuery}
              style={styles.inputText}
            />

            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <Text
                  style={{ color: '#999', fontSize: 18, paddingHorizontal: 4 }}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View>
          <Interests />
        </View>
      </View>

      {/* If no search → show All Posts */}
      {query.length === 0 ? (
        <AllPosts />
      ) : (
        <>
          <FlatList
            data={results}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
              !loading && (
                <Text style={{ color: '#fff' }}>No results found</Text>
              )
            }
          />

          {loading && (
            <FlatList
              data={[1, 2, 3, 4, 5, 6]}
              keyExtractor={item => item.toString()}
              renderItem={() => <SkeletonItem />}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1F1F1F',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 40,
  },

  inputText: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
  },

  searchContainer: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#262626',
    padding: 10,
    borderRadius: 12,

    color: '#fff',
    flex: 1,
  },
  goBackBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#262626',

    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#333',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  username: {
    color: '#fff',
  },
  skeletonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  skeletonAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2a2a2a',
    marginRight: 12,
    overflow: 'hidden',
  },

  skeletonLine: {
    height: 12,
    width: 180,
    backgroundColor: '#2a2a2a',
    borderRadius: 6,
  },
});
