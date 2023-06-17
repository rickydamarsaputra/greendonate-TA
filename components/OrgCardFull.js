import { Image, Text, View } from 'react-native';

export default function OrgCardFull({ item }) {
  return (
    <View>
      <Image source={{ uri: item.cover }} className="w-full h-[120px] rounded-lg" style={{ resizeMode: 'cover' }} />
      <Text className="text-sm mt-1 text-primary-500 font-bold">{item.title}</Text>
    </View>
  );
}