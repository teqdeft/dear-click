import AsyncStorage from '@react-native-async-storage/async-storage';


export const Tokenprovider = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token ?? null; // use nullish coalescing for cleaner return
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};