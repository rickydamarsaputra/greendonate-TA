import { Image, Text, View } from 'react-native';

export default function StoryCard({ item }) {
  return (
    <View className="w-[48.5%] bg-white mb-2 p-2 shadow-sm shadow-black/50 rounded-lg">
      <Text className="text-xs text-primary-500 font-medium">{item.author}</Text>
      <Text className="text-xs text-gray-500 mt-2" numberOfLines={3}>{item.content}</Text>
      <Text className="text-xs text-primary-500 font-medium mt-2">{item.created_at}</Text>
    </View>
  );
}