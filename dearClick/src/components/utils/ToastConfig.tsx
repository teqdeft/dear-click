import { StyleSheet } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.successContainer}
      visibilityTime={3000}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.errorContainer}
      visibilityTime={3000}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  successContainer: {
    borderLeftColor: 'green',
    borderLeftWidth: 5,
    width: '80%',
    height: 50,
  },
  errorContainer: {
    borderLeftColor: 'red',
    borderLeftWidth: 5,
    width: '80%',
    height: 50,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 15,
    fontWeight: '500',
  },
  text2: {
    fontSize: 12,
  },
});
