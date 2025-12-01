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

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.itemContainer}>
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

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        placeholder="Search users..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

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
            <Text style={{ color: '#fff', marginVertical: 10 }}>
              Loading...
            </Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1F1F1F',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: '#fff',
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
});
