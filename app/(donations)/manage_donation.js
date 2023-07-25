import { Entypo } from '@expo/vector-icons';
import { Tabs, useFocusEffect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import supabase from '../../lib/supabase';

export default function manageDonation() {
  const router = useRouter();
  const [donations, setDonations] = useState([]);
  const status = {
    pending: {
      text: 'Menunggu Validasi Admin',
      color: '#eab308'
    },
    active: {
      text: 'Berlangsung',
      color: '#22c55e'
    },
    not_active: {
      text: 'Berakhir',
      color: '#ef4444'
    },
  }
  // const donations = [
  //   {
  //     id: 1,
  //     title: 'Sedekah untuk bencana Tsunami di aceh',
  //     current_amount: 10,
  //     cover: require('../../assets/default-banner.png'),
  //     status: 'Berlangsung',
  //   },
  //   {
  //     id: 2,
  //     title: 'Bencana gunung berapi di jawa timur',
  //     current_amount: 20,
  //     cover: require('../../assets/default-banner.png'),
  //     status: 'Berakhir',
  //   },
  //   {
  //     id: 3,
  //     title: 'Sedekah untuk bencana Tsunami di aceh',
  //     current_amount: 10,
  //     cover: require('../../assets/default-banner.png'),
  //     status: 'Berlangsung',
  //   },
  //   {
  //     id: 4,
  //     title: 'Bencana gunung berapi di jawa timur',
  //     current_amount: 20,
  //     cover: require('../../assets/default-banner.png'),
  //     status: 'Berakhir',
  //   },
  //   {
  //     id: 5,
  //     title: 'Sedekah untuk bencana Tsunami di aceh',
  //     current_amount: 10,
  //     cover: require('../../assets/default-banner.png'),
  //     status: 'Berlangsung',
  //   },
  //   {
  //     id: 6,
  //     title: 'Bencana gunung berapi di jawa timur',
  //     current_amount: 20,
  //     cover: require('../../assets/default-banner.png'),
  //     status: 'Berakhir',
  //   }
  // ];

  useFocusEffect(() => {
    async function getDonationPost() {
      const currentUserLogin = await supabase.auth.getUser();
      if (currentUserLogin.error) return console.log(currentUserLogin.error);

      const user = await supabase.from('users')
        .select()
        .eq('id', currentUserLogin.data.user.id)
        .single();
      if (user.error) return console.log(user.error);

      const { data, error } = await supabase.from('donation_posts')
        .select().eq('status', 'pending').order('created_at', { ascending: false });
      if (error) return console.log(error);

      setDonations([...data.map((res) => ({
        id: res.id,
        title: res.name,
        cover: res.banner_img,
        status: res.status,
      }))]);
    }

    getDonationPost();
  });

  return (
    <View className="relative flex-1 bg-gray-100 px-4">
      <Tabs.Screen
        options={{
          headerTitle: 'Kelola Donasi Organisasi',
        }}
      />

      {/* LIST DONATION */}
      <ScrollView
        className="my-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {donations?.map((item) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: 'detail_donation', params: { donationId: item.id } })}
            key={item.id} className="bg-white shadow shadow-black/50 rounded-lg" >
            <Image source={{ uri: item.cover }} className="w-full h-[120px] rounded-tl-lg rounded-tr-lg" style={{ resizeMode: 'cover' }} />
            <Text className="text-sm p-2 text-primary-500 font-bold">{item.title}</Text>
            <Text className="relative text-center text-xs mx-2 mb-2 p-1 text-white font-medium rounded-md"
              style={{ backgroundColor: status[item.status].color }}>
              {status[item.status].text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* LIST DONATION */}
    </View>
  );
}