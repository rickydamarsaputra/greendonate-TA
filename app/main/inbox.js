import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

export default function inbox() {
  return (
    <View className="flex-1 bg-white px-4">
      <Tabs.Screen
        options={{
          headerTitle: 'Inbox',
        }}
      />
      <Text>inbox screen</Text>
    </View>
  );
}