import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white">Welcome</Text>
      <Link href="/" className="text-blue-500">
        Go to App
      </Link>
    </View>
  );
};

export default index;
