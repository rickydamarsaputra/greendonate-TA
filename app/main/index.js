import { Link, Tabs } from 'expo-router';
import { Octicons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DonationCard, OrgCard, StoryCard } from '../../components';

export default function main() {
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
    }
  ];

  const organization = [
    {
      id: 1,
      title: 'PMI Surabaya',
      cover: require('../../assets/default-banner.png'),
    },
    {
      id: 2,
      title: 'Rumah Zakat',
      cover: require('../../assets/default-banner.png'),
    },
    {
      id: 3,
      title: 'Cinta Dakwah Indonesia',
      cover: require('../../assets/default-banner.png'),
    },
  ];

  const stories = [
    {
      id: 1,
      content: 'semoga bantuan ini dapat bermanfaat untuk penerimanya, dan untuk saya semoga bisa diberikan kelancaran dan kemudahan dalam penyelesaian kuliah, semoga bisa sidang tahun ini, semoga bisa lulus kuliah secepatnya, Aamiin Aamiin InsyaAllah',
      author: 'Ricky Damar Saputra',
      created_at: '8 menit yang lalu',
    },
    {
      id: 2,
      content: 'Ya Allah semoga MUSIBAH ANGIN PUTING BELIUNG yang menimpa Pesantren Yatim ini cepat terbangun kembali. Amiin',
      author: 'Kawan Hijau',
      created_at: '2 menit yang lalu',
    },
    {
      id: 3,
      content: 'INFAQ YATIM ini semoga bermanfaat buat biaya makan dan biaya hidup semua YATIM. Semoga banyak yg membantu amiin.',
      author: 'Kawan Hijau',
      created_at: '8 menit yang lalu',
    },
    {
      id: 4,
      content: 'Bismillah Semoga berkah & bermanfaat',
      author: 'Bambang Heriawan',
      created_at: '2 menit yang lalu',
    },
  ];

  return (
    <View className="flex-1 bg-gray-100">
      <Tabs.Screen
        options={{
          headerTitle: '',
          headerLeft: () => (
            <Image source={require('../../assets/default-avatar.png')} className="w-10 h-10 bg-white rounded-full ml-4" />
          ),
          headerRight: () => (
            <Text className="text-white mr-4">Ricky Damar Saputra</Text>
          ),
        }}
      />

      <ScrollView className="px-4 mt-5" showsVerticalScrollIndicator={false}>
        {/* LIST DONATION */}
        <View className="flex-row items-center justify-between">
          <Text className="text-lg text-primary-500 font-bold">Mulai Berbagi Kebaikan</Text>
          <TouchableOpacity>
            <Link href={''} className="text-xs text-gray-500">Lihat Lainnya</Link>
          </TouchableOpacity>
        </View>
        <ScrollView
          className="mt-2"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        >
          {donations.map((item) => <DonationCard key={item.id} item={item} />)}
        </ScrollView>
        {/* LIST DONATION */}

        {/* LIST ORGANIZATION */}
        <View className="flex-row items-center justify-between mt-10">
          <Text className="text-lg text-primary-500 font-bold">Organisasi Yang Terdaftar</Text>
          <TouchableOpacity>
            <Link href={''} className="text-xs text-gray-500">Lihat Lainnya</Link>
          </TouchableOpacity>
        </View>
        <ScrollView
          className="mt-2"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        >
          {organization.map((item) => <OrgCard key={item.id} item={item} />)}
        </ScrollView>
        {/* LIST ORGANIZATION */}

        {/* LIST STORY */}
        <View className="flex-row items-center justify-between mt-10">
          <Text className="text-lg text-primary-500 font-bold">Cerita Kawan Hijau</Text>
          <TouchableOpacity>
            <Link href={''} className="text-xs text-gray-500">Lihat Lainnya</Link>
          </TouchableOpacity>
        </View>
        <ScrollView
          className="mt-2 mb-3"
          showsHorizontalScrollIndicator={false}
        >
          <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
            {stories.map((item) => <StoryCard key={item.id} item={item} />)}
          </View>
        </ScrollView>
        {/* LIST STORY */}
      </ScrollView>
    </View>
  );
}