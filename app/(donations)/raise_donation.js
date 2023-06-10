import { Tabs } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function raiseDonation() {
  const donations = [
    {
      id: 1,
      title: 'Sedekah untuk bencana Tsunami di aceh',
      current_amount: 10,
      cover: require('../../assets/default-banner.png'),
      status: 'Berlangsung',
    },
    {
      id: 2,
      title: 'Bencana gunung berapi di jawa timur',
      current_amount: 20,
      cover: require('../../assets/default-banner.png'),
      status: 'Berakhir',
    },
    {
      id: 3,
      title: 'Sedekah untuk bencana Tsunami di aceh',
      current_amount: 10,
      cover: require('../../assets/default-banner.png'),
      status: 'Berlangsung',
    },
    {
      id: 4,
      title: 'Bencana gunung berapi di jawa timur',
      current_amount: 20,
      cover: require('../../assets/default-banner.png'),
      status: 'Berakhir',
    },
    {
      id: 5,
      title: 'Sedekah untuk bencana Tsunami di aceh',
      current_amount: 10,
      cover: require('../../assets/default-banner.png'),
      status: 'Berlangsung',
    },
    {
      id: 6,
      title: 'Bencana gunung berapi di jawa timur',
      current_amount: 20,
      cover: require('../../assets/default-banner.png'),
      status: 'Berakhir',
    }
  ];

  return (
    <View className="relative flex-1 bg-gray-100 px-4">
      <Tabs.Screen
        options={{
          headerTitle: 'Galang Donasi',
        }}
      />

      {/* LIST DONATION */}
      <ScrollView
        className="my-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {donations.map((item) => (
          <View key={item.id} className="bg-white shadow shadow-black/50 rounded-lg" >
            <Image source={item.cover} className="w-full h-[120px] rounded-tl-lg rounded-tr-lg" style={{ resizeMode: 'cover' }} />
            <Text className="text-sm p-2 text-primary-500 font-bold">{item.title}</Text>
          </View>
        ))}
      </ScrollView>
      {/* LIST DONATION */}

      <TouchableOpacity className="w-1/2 absolute self-center bottom-5 py-4 rounded-md bg-primary-600 mb-2">
        <Text className="text-md text-white text-center font-semibold">Buat Donasi</Text>
      </TouchableOpacity>
    </View>
  );
}