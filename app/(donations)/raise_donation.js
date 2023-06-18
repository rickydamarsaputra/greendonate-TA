import { Entypo } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import supabase from '../../lib/supabase';

export default function raiseDonation() {
  const router = useRouter();
  const [donations, setDonations] = useState([]);
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

  useEffect(() => {
    async function getDonationPost() {
      const currentUserLogin = await supabase.auth.getUser();
      if (currentUserLogin.error) return console.log(currentUserLogin.error);

      const user = await supabase.from('users')
        .select()
        .eq('id', currentUserLogin.data.user.id)
        .single();
      if (user.error) return console.log(user.error);

      const { data, error } = await supabase.from('donation_posts')
        .select()
        .eq('organization_id', user.data.organization_id).order('created_at', { ascending: false });
      if (error) return console.log(error);

      setDonations([...data.map((res) => ({
        id: res.id,
        title: res.name,
        cover: res.banner_img,
      }))]);
    }

    getDonationPost();
  }, []);

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
        {donations?.map((item) => (
          <View key={item.id} className="bg-white shadow shadow-black/50 rounded-lg" >
            <Image source={{ uri: item.cover }} className="w-full h-[120px] rounded-tl-lg rounded-tr-lg" style={{ resizeMode: 'cover' }} />
            <Text className="text-sm p-2 text-primary-500 font-bold">{item.title}</Text>
          </View>
        ))}
      </ScrollView>
      {/* LIST DONATION */}

      <TouchableOpacity
        onPress={() => router.push({ pathname: 'create_donation' })}
        className="w-[50px] h-[50px] absolute justify-center items-center right-5 bottom-5 rounded-full bg-primary-600 mb-2">
        {/* <Text className="text-md text-white text-center font-semibold">Buat Donasi</Text> */}
        <Entypo name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}