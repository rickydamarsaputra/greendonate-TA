import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function OrgCard({ item }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: 'detail_organization', params: { organizationId: item.id } })}
      className="w-[250px] overflow-hidden" >
      <Image source={{ uri: item.cover }} className="w-[250px] h-[120px] rounded-lg" style={{ resizeMode: 'cover' }} />
      <Text className="text-sm mt-1 text-primary-500 font-bold">{item.title}</Text>
    </TouchableOpacity>
  );
}