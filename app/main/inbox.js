import { Tabs } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function inbox() {
  return (
    <View className="flex-1 bg-gray-100 px-4">
      <Tabs.Screen
        options={{
          headerTitle: 'Inbox',
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="my-6 space-y-4">
        {Array.from(Array(20).keys()).map((item, index) => (
          <TouchableOpacity key={index} className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3">
            <Text className="font-medium text-gray-500">Testing Notifikasi {item + 1}</Text>
            <AntDesign name="right" size={18} color="#4C5155" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}