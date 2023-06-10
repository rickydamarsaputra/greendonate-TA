import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

export default function myDonation() {
  return (
    <View className="flex-1 bg-white px-4">
      <Tabs.Screen
        options={{
          headerTitle: 'Donasi Saya',
        }}
      />
      <Text>Donasi Saya screen</Text>
    </View>
  );
}