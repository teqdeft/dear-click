import AsyncStorage from '@react-native-async-storage/async-storage';

export const TokenProvider = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token ?? null; // return null if undefined
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};