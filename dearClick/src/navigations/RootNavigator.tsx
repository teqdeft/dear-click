import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

import AuthNavigator from './AuthNavigator';
import AppStack from './AppStack';
import Loader from '../components/utils/Loader';

export default function RootNavigator() {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) return <Loader />; 

  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
