// components/CommentsModal.tsx

import { IMAGE_BASE_URL } from '@env';
import React from 'react';
import {
  View,
  Modal,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import ThreeDots from '../../assets/svgs/icons/ThreeDots';

type Comment = {
  id: string | number;
  username: string;
  comment: string;
};

type CommentsModalProps = {
  visible: boolean;
  comments: Comment[];
  loading: boolean;
  commentText: string;
  onClose: () => void;
  onCommentTextChange: (text: string) => void;
  onSendComment: () => void;
};

export default function CommentsModal({
  visible,
  comments,
  loading,
  commentText,
  onClose,
  onCommentTextChange,
  onSendComment,
}: CommentsModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Comments</Text>

            {/* Invisible spacer to center title */}
            <View style={{ width: 60 }} />
          </View>

          {/* COMMENTS LIST */}
          <FlatList
            data={comments}
            keyExtractor={item => item.id.toString()}
            refreshing={loading}
            style={styles.list}
            renderItem={({ item }) => (
              <View style={styles.userinfo}>
                <View style={styles.profileDetails}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.profileImage}
                      source={{
                        uri: `${IMAGE_BASE_URL}/profilePicture/${item.profile_pic}`,
                      }}
                    />
                  </View>
                  <View style={styles.textDetails}>
                    <Text style={[styles.name, { color: '#fff' }]}>
                      {item.username}
                    </Text>
                    <Text style={[styles.comment, { color: '#aaa' }]}>
                      {item.comment}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <ThreeDots />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No comments yet. Be the first!
                </Text>
              </View>
            }
          />

          {/* INPUT BAR */}
          <View style={styles.inputContainer}>
            <TextInput
              value={commentText}
              onChangeText={onCommentTextChange}
              placeholder="Write a comment..."
              placeholderTextColor="#777"
              style={styles.textInput}
              multiline={false}
            />
            <TouchableOpacity
              onPress={onSendComment}
              disabled={!commentText.trim()}
            >
              <Text
                style={[
                  styles.sendButton,
                  !commentText.trim() && styles.sendButtonDisabled,
                ]}
              >
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '80%',
    backgroundColor: '#1F1F1F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeText: { color: '#fff', fontSize: 16 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  list: { flex: 1, flexDirection: 'column' },
  commentItem: {
    marginVertical: 8,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  comment: { color: '#FBC213', fontWeight: 'bold', fontSize: 14 },
  commentText: { color: '#ccc', fontSize: 14, marginTop: 2 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 16 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    color: '#fff',
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
  },
  imageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    width: 40,
    height: 40,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sendButton: { color: '#FBC213', fontSize: 16, fontWeight: '600' },
  sendButtonDisabled: { color: '#666' },
  textDetails: {
    flexDirection: 'column',
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
});
