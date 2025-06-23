import { View, Text, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

// Declare Google modules (lazy loaded for native)
let GoogleSignin, statusCodes;

export default function Index() {
  const [GoogleSigninButton, setGoogleSigninButton] = useState(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const GoogleSignInModule = require('@react-native-google-signin/google-signin');
      GoogleSignin = GoogleSignInModule.GoogleSignin;
      statusCodes = GoogleSignInModule.statusCodes;
      setGoogleSigninButton(() => GoogleSignInModule.GoogleSigninButton);

      GoogleSignin.configure({
        webClientId: '654539636997-j3cdgdmqljn9hi24u6ndab4a0df4isi1.apps.googleusercontent.com',
      });
    }
  }, []);

  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  };

  const redirectUri =
    Platform.OS === 'web'
      ? window.location.origin
      : AuthSession.makeRedirectUri({ useProxy: true });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: '654539636997-j3cdgdmqljn9hi24u6ndab4a0df4isi1.apps.googleusercontent.com',
      scopes: ['openid', 'profile', 'email'],
      responseType: 'token',
      usePKCE: false, // 👈 Disable PKCE here
      redirectUri: window.location.origin,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('Web Auth Success, code:', code);
      // Exchange the code with your backend for tokens
    }
  }, [response]);
  const signInWithGoogleWeb = async () => {
    try {
      if (!request) return alert('Auth request not ready.');

      const result = await promptAsync({ useProxy: false });

      if (result.type === 'success' && result.authentication?.accessToken) {
        const accessToken = result.authentication.accessToken;
        console.log('Access Token:', accessToken);

        // Fetch user profile
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const userInfo = await userInfoResponse.json();
        console.log('User Info:', userInfo);
        alert(`Welcome ${userInfo.name}`);
      } else {
        console.warn('Sign-in was cancelled or failed:', result);
      }
    } catch (error) {
      console.error('Web sign-in error:', error);
      alert('Sign-in error: ' + error.message);
    }
  };

  const signInWithGoogleNative = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Native User Info:', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in is in progress');
      } else {
        console.error('Native sign-in error:', error);
      }
    }
  };

  const handleGoogleSignIn = () => {
    if (Platform.OS === 'web') {
      signInWithGoogleWeb();
    } else {
      signInWithGoogleNative();
    }
  };

  const renderGoogleSignInButton = () => {
    if (Platform.OS === 'web') {
      return (
        <TouchableOpacity
          onPress={handleGoogleSignIn}
          className="mt-6 flex-row items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-lg">
          <AntDesign name="google" size={20} color="#4285F4" />
          <Text className="ml-3 text-lg font-semibold text-gray-700">Sign in with Google</Text>
        </TouchableOpacity>
      );
    } else if (GoogleSigninButton) {
      return (
        <GoogleSigninButton
          style={{ width: 192, height: 48, marginTop: 24 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="mb-4 text-3xl font-bold text-white">Welcome to Walmart App</Text>
      <Text className="mb-8 text-lg text-gray-300">Built with Expo + NativeWind</Text>
      <Link href="/home" className="text-xl text-blue-500 underline">
        Go to Home →
      </Link>
      {renderGoogleSignInButton()}
    </View>
  );
}
