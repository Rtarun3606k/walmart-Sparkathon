import { View } from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';
import '../global.css';

const layout = () => {
  return (
    <View className="flex-1">
      <Slot />
    </View>
  );
};

export default layout;
