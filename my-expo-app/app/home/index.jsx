import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { EXPO_APP_URL } from '@env';

const index = () => {
  console.log('Index component rendered');
  console.log('Process Environment:', process.env.EXPO_APP_URL, 'EXPO_APP_URL:', EXPO_APP_URL);
  const test = async () => {
    const request = await fetch(`${process.env.EXPO_APP_URL}/test`);
    console.log('Requesting test API...');
    console.log('Request URL:', request);
    const response = await request.json();
    console.log(response);
  };

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white">Welcome</Text>
      <Link href="/" className="text-blue-500">
        Go to App
      </Link>
      <Button
        title="Test API"
        onPress={() => {
          console.log('Button pressed');
          test();
        }}
        className="mt-4"
      />
    </View>
  );
};

export default index;
