import { Tabs } from 'expo-router';
import { Text, ScrollView, View } from 'react-native';
import { ChartKit } from '../../components';

export default function statistics() {
  return (
    <ScrollView
      className="flex-1 bg-gray-100 px-4"
      showsVerticalScrollIndicator={false}
    >
      <Tabs.Screen
        options={{
          headerTitle: 'Statistika Greendonate',
        }}
      />

      <View className="mt-4">
        <Text className="text-lg text-primary-500 font-bold mb-2">Pengguna Bulanan</Text>
        <ChartKit />
      </View>
      <View className="mt-4">
        <Text className="text-lg text-primary-500 font-bold mb-2">Donasi Bulanan</Text>
        <ChartKit />
      </View>
    </ScrollView>
  );
}