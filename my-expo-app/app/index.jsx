import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClient: '654539636997-j3cdgdmqljn9hi24u6ndab4a0df4isi1.apps.googleusercontent.com',
});

const index = () => {
  const signInWithGoogle = async () => {
    try {
      // Initialize Google Sign-In
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services are not available');
      } else {
        console.error('Sign-in error:', error);
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="mb-4 text-3xl font-bold text-white">Welcome to Walmart App</Text>
      <Text className="mb-8 text-lg text-gray-300">Built with Expo + NativeWind</Text>
      <Link href="/home" className="text-xl text-blue-500 underline">
        Go to Home →
      </Link>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogle}
      />
    </View>
  );
};

export default index;
