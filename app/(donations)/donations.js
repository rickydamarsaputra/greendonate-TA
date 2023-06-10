import { Tabs } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { DonationCardFullWidth } from '../../components';

export default function donation() {
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
          headerTitle: 'Mulai Berbagi Kebaikan',
        }}
      />

      {/* LIST DONATION */}
      <ScrollView
        className="my-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {donations.map((item) => <DonationCardFullWidth key={item.id} item={item} />)}
      </ScrollView>
      {/* LIST DONATION */}
    </View>
  );
}