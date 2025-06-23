import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white">index</Text>
      <Link href="/home" className="text-blue-500">
        Go to Home
      </Link>
    </View>
  );
};

export default index;
