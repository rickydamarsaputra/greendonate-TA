import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DonationCardFullWidth } from '../../components';
import supabase from '../../lib/supabase';

export default function donation() {
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
    async function getDonations() {
      const currentUserLogin = await supabase.auth.getUser();
      if (currentUserLogin.error) return router.replace({ pathname: '/' });

      const currentUser = await supabase.from('users').select('*').eq('id', currentUserLogin.data.user.id).single();
      if (currentUser.error) return console.log(currentUser.error);

      if (currentUser.data.role == 'organization') {
        const { data, error } = await supabase.from('donation_posts')
          .select(`id, name, banner_img, current_amount, status`)
          .in('status', ['active', 'not_active'])
          .eq('organization_id', currentUser.data.organization_id)
          .limit(4)
          .order('created_at', { ascending: false });
        if (error) return console.log(error.message);

        setDonations([...data.map((res) => ({
          id: res.id,
          title: res.name,
          current_amount: res.current_amount,
          cover: res.banner_img,
          status: res.status
        }))]);
      } else {
        const { data, error } = await supabase.from('donation_posts')
          .select(`id, name, banner_img, current_amount, status`)
          .in('status', ['active', 'not_active'])
          .limit(4)
          .order('created_at', { ascending: false });
        if (error) return console.log(error.message);

        setDonations([...data.map((res) => ({
          id: res.id,
          title: res.name,
          current_amount: res.current_amount,
          cover: res.banner_img,
          status: res.status
        }))]);
      }
    }

    getDonations();
  }, []);

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