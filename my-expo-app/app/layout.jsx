import { View } from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';
import '../global.css';
import { SafeAreaView } from 'react-native-safe-area-context';

const layout = () => {
  return (
    <View className="flex-1">
      <SafeAreaView>
        <Slot />
      </SafeAreaView>
    </View>
  );
};

export default layout;
