import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigations/RootNavigator';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/utils/ToastConfig';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}
