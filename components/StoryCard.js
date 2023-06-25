import { Text, View } from 'react-native';

export default function StoryCard({ item }) {
  return (
    <View className="w-[48.5%] h-[145px] justify-between bg-white mb-3 p-2 shadow-sm shadow-black/50 rounded-lg">
      <View>
        <Text className="text-sm text-primary-500 font-medium">
          {item.is_show_name ? item.author : 'Kawan Hijau'}
        </Text>
        <Text className="text-sm text-gray-500 mt-2" numberOfLines={3}>{item.content}</Text>
      </View>
      <Text className="text-xs text-primary-500 font-medium mt-4">{item.created_at}</Text>
    </View>
  );
}