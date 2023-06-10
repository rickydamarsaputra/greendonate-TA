import { Image, Text, View } from 'react-native';

export default function OrgCard({ item }) {
  return (
    <View className="w-[250px] overflow-hidden" >
      <Image source={item.cover} className="w-[250px] h-[120px] rounded-lg" style={{ resizeMode: 'cover' }} />
      <Text className="text-sm mt-1 text-primary-500 font-bold">{item.title}</Text>
    </View>
  );
}