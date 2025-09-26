// src/utils/toast.ts
import Toast from 'react-native-toast-message';

type ToastShowOptions = {
  text2?: string;
  visibilityTime?: number;
  position?: 'top' | 'bottom';
  onPress?: () => void;
  props?: Record<string, any>;
};

const DEFAULT_VISIBILITY = 3000;

function show(
  type: 'success' | 'error' | 'info' | string,
  text1: string,
  text2?: string,
  opts?: ToastShowOptions,
) {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime: opts?.visibilityTime ?? DEFAULT_VISIBILITY,
    position: opts?.position ?? 'top',
    onPress: opts?.onPress,
    props: opts?.props,
  });
}

export const toast = {
  success: (text1: string, text2?: string, opts?: ToastShowOptions) =>
    show('success', text1, text2, opts),

  error: (text1: string, text2?: string, opts?: ToastShowOptions) =>
    show('error', text1, text2, opts),

  info: (text1: string, text2?: string, opts?: ToastShowOptions) =>
    show('info', text1, text2, opts),

  // Generic show in case you created custom types in your config
  show: (
    type: string,
    text1: string,
    text2?: string,
    opts?: ToastShowOptions,
  ) => show(type, text1, text2, opts),
};

export default toast;
