import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function notification() {
  const { message } = useLocalSearchParams();
  console.log(message);

  return (
    <View className="flex-1 bg-gray-100 px-4">
      <Stack.Screen
        options={{
          headerTitle: 'Detail Pesan',
        }}
      />
      <Text className="leading-5 text-justify text-gray-500 mt-4">
        {message}
      </Text>
    </View>
  );
}