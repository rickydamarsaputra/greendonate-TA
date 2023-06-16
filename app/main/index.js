import { Link, Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DonationCard, OrgCard, StoryCard } from '../../components';
import supabase from '../../lib/supabase';

export default function main() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const currentUserLogin = await supabase.auth.getUser();
      if (currentUserLogin.error) return router.replace({ pathname: '/' });

      const { data, error } = await supabase.from('users').select('*').eq('id', currentUserLogin.data.user.id).single();
      if (error) return console.log(error);

      setUser({
        fullname: data.fullname,
        role: data.role,
        avatar_img: data.avatar_img,
      });
    }

    getUser();
  }, []);

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
            <View className="items-start space-y-1 ml-4">
              <Text className="font-medium capitalize text-white">{user?.fullname}</Text>
              <Text className="text-xs capitalize font-bold text-primary-500 bg-secondary-500 px-2 rounded-full">
                {user?.role}
              </Text>
            </View>
            // <View className="flex-row items-center space-x-2 ml-4">
            //   <Text className="font-medium text-white">Ricky Damar Saputra</Text>
            //   <Text className="text-xs font-bold text-primary-500 bg-secondary-500 px-2 rounded-full">Donatur</Text>
            // </View>
          ),
          headerRight: () => (
            <Image source={{ uri: user?.avatar_img }} className="w-10 h-10 bg-white rounded-full mr-4" />
          ),
        }}
      />

      <ScrollView className="px-4 mt-5" showsVerticalScrollIndicator={false}>
        {/* LIST DONATION */}
        <View className="flex-row items-center justify-between">
          <Text className="text-lg text-primary-500 font-bold">Mulai Berbagi Kebaikan</Text>
          <TouchableOpacity
            onPress={() => router.push({ pathname: 'donations' })}
          >
            <Text className="text-xs text-gray-500">Lihat Lainnya</Text>
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
          <TouchableOpacity
            onPress={() => router.push({ pathname: 'organization' })}
          >
            <Text className="text-xs text-gray-500">Lihat Lainnya</Text>
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
          <TouchableOpacity
            onPress={() => router.push({ pathname: 'stories' })}
          >
            <Text className="text-xs text-gray-500">Lihat Lainnya</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          className="mt-2 mb-5"
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