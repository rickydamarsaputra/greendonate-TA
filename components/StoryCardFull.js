import { Text, View } from 'react-native';

export default function StoryCardFull({ item }) {
  return (
    <View className="w-full bg-white mb-2 p-2 shadow-sm shadow-black/50 rounded-lg">
      <Text className="text-sm text-primary-500 font-medium">
        {item.is_show_name ? item.author : 'Kawan Hijau'}
      </Text>
      <Text className="text-sm text-gray-500 text-justify mt-2">{item.content}</Text>
      <Text className="text-xs text-primary-500 font-medium mt-2">{item.created_at}</Text>
    </View>
  );
}