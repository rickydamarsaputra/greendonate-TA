import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity } from 'react-native';

export default function OrgCardFull({ item }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: 'detail_organization', params: { organizationId: item.id } })}
    >
      <Image source={{ uri: item.cover }} className="w-full h-[120px] rounded-lg" style={{ resizeMode: 'cover' }} />
      <Text className="text-sm mt-1 text-primary-500 font-bold">{item.title}</Text>
    </TouchableOpacity>
  );
}