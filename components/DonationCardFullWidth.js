import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

function BadgeStatusOngoing({ status }) {
  return (
    <View className="w-[40%] bg-primary-500 absolute top-0 right-0 px-2 py-1 m-2 rounded">
      <Text className="text-xs text-center font-semibold text-secondary-500">Berlangsung</Text>
    </View>
  );
}

function BadgeStatusEnded({ status }) {
  return (
    <View className="w-[40%] bg-secondary-500 absolute top-0 right-0 px-2 py-1 m-2 rounded">
      <Text className="text-xs text-center font-semibold text-primary-500">Berakhir</Text>
    </View>
  );
}

export default function DonationCardFullWidth({ item }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: 'detail_donation', params: { donationId: item.id } })}
      className="justify-between" >
      <View className="relative">
        <Image source={{ uri: item.cover }} className="w-full h-[120px] rounded-lg" style={{ resizeMode: 'cover' }} />
        <Text className="text-sm mt-1 text-primary-500 font-bold">{item.title}</Text>
        {item.status == 'active' ? <BadgeStatusOngoing status={item.status} /> : <BadgeStatusEnded status={item.status} />}
      </View>
      <View className="w-[30%] bg-primary-500 px-2 py-1 mt-2 rounded">
        <Text className="text-xs text-center font-semibold text-secondary-500">Terkumpul: {item.current_amount}</Text>
      </View>
    </TouchableOpacity>
  );
}