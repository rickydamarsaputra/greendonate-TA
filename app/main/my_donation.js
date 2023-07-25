import { Tabs, useFocusEffect, useRouter } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import supabase from '../../lib/supabase';

export default function myDonation() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);

  const couriers = [
    {
      code: 'sicepat',
      title: 'SiCepat',
    },
    {
      code: 'jne',
      title: 'JNE Express',
    },
    {
      code: 'anteraja',
      title: 'AnterAja',
    },
  ];

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

    async function getUserDonations() {
      const currentUserLogin = await supabase.auth.getUser();
      if (currentUserLogin.error) return router.replace({ pathname: '/' });

      const { data, error } = await supabase.from('donations')
        .select(`
        id,
        post_id,
        delivery_img,
        awb,
        courier,
        created_at,
        donation_posts (name)
        `).eq('user_id', currentUserLogin.data.user.id)
        .order('created_at', { ascending: false });
      if (error) return console.log(error.message);

      setDonations([...data.map((res) => ({
        id: res.id,
        cover: res.delivery_img,
        title: res.awb,
        courier: res.courier,
        donation_to: res.donation_posts.name,
        created_at: moment(res.created_at).fromNow(),
      }))]);
    }

    getUser();
    getUserDonations();
  });

  return (
    <View className="flex-1 bg-white px-4">
      <Tabs.Screen
        options={{
          headerTitle: 'Donasi Saya',
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
            onPress={() => router.push({ pathname: 'tracking_donation', params: { donationId: item.id } })}
            key={item.id} className="bg-white shadow shadow-black/50 rounded-lg" >
            <Image source={{ uri: item.cover }} className="w-full h-[120px] rounded-tl-lg rounded-tr-lg" style={{ resizeMode: 'cover' }} />
            <Text className="text-sm p-2 text-primary-500 font-bold">
              {item.title} - {couriers.filter((courier) => courier.code == item.courier)[0].title}
            </Text>
            <Text className="text-xs px-2 pb-2 text-gray-500 font-semibold">
              {item.created_at}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* LIST DONATION */}
    </View>
  );
}