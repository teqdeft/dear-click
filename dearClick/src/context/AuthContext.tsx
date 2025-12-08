import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import api from '../helpers/axiosInstance';

interface AuthContextType {
  userToken: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  apiData: any | null;
  apiLoading: boolean;
  apiError: string | null;
  fetchApiData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  apiData: null,
  apiLoading: false,
  apiError: null,
  fetchApiData: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // api state
  const [apiData, setApiData] = useState<any | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem('userToken', token);
    setUserToken(token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
  };

  const fetchApiData = async () => {
    try {
      const { data } = await api.get(`${API_URL}/auth/profile-details`);
      setApiData(data.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchApiData();
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        loading,
        login,
        logout,
        apiData,
        apiLoading,
        apiError,
        fetchApiData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
