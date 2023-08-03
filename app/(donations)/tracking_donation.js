import { Entypo, Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DonationCard, StoryCard } from '../../components';
import supabase from '../../lib/supabase';
import Timeline from 'react-native-timeline-flatlist';
import { BINDERBYTE_API_KEY } from "@env";


export default function trackingDonation() {
  const router = useRouter();
  const { donationId } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [donation, setDonation] = useState(null);
  const [donationPost, setDonationPost] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [tracking, setTracking] = useState(null);

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

  const handleAcceptDonation = async () => {
    const { data, error } = await supabase.from('donations')
      .update({ status: 'Di Terima' }).eq('id', donationId).select();
    if (error) return console.log(error);

    const updateCurrentAmountDonationPost = await supabase.from('donation_posts')
      .update({ current_amount: (donationPost.current_amount + 1) }).eq('id', donationPost.id).select();
    if (updateCurrentAmountDonationPost.error) return console.log(updateCurrentAmountDonationPost.error);

    const notificationToDonatur = await supabase.from('notifications').insert({
      user_id: donation.users.id,
      role: donation.users.role,
      message: 'Donasi anda di terima organisasi, silahkan lanjutkan untuk pengiriman donasi ke organisasi'
    }).single();
    if (notificationToDonatur.error) return console.log(notificationToDonatur.error);

    console.log(data);
    return router.back();
  }

  const handleRejectDonation = async () => {
    const { data, error } = await supabase.from('donations')
      .update({ status: 'Di Tolak' }).eq('id', donationId).select();
    if (error) return console.log(error);

    const notificationToDonatur = await supabase.from('notifications').insert({
      user_id: donation.users.id,
      role: donation.users.role,
      message: 'Donasi anda di tolak organisasi, dikarnakan belum memenuhi persyaratan keriteria barang donasi'
    }).single();
    if (notificationToDonatur.error) return console.log(notificationToDonatur.error);

    console.log(data);
    return router.back();
  }

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

    async function getDonation() {
      const { data, error } = await supabase.from('donations')
        .select(`
        delivery_img,
        user_id,
        post_id,
        awb,
        courier,
        desc,
        is_show_name,
        status,
        created_at,
        users(id, role),
        donation_posts(name, organizations(name))
        `).eq('id', donationId).single();
      if (error) return console.log(error);
      console.log(data);

      const donationPost = await supabase.from('donation_posts').select().eq('id', data.post_id).single();
      if (donationPost.error) return console.log(donationPost.error);

      const response = await fetch(`https://api.binderbyte.com/v1/track?api_key=${BINDERBYTE_API_KEY}&courier=${data?.courier}&awb=${data?.awb}`)
        .then(res => res.json());
      if (response.status != 200) return console.log(response.message);

      console.log(data);

      setDonation(data);
      setDonationPost(donationPost.data);
      setTimeline([...response.data.history.map((res, index) => ({
        title: res.date,
        description: res.desc,
        circleColor: index == 0 ? '#12674a' : '#64748b',
      }))]);
      setTracking(response.data);
    }

    getUser();
    getDonation();
  }, []);

  return (
    <View className="relative flex-1 bg-gray-100 px-4">
      <Tabs.Screen
        options={{
          headerTitle: donation?.awb,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        className="my-5"
      >
        <View className="relative">
          <Image source={{ uri: donation?.delivery_img }} className="w-full h-[200px] rounded-lg" style={{ resizeMode: 'cover' }} />
        </View>
        <Text className="text-lg text-primary-500 font-bold mt-4">
          Informasi Donasi
        </Text>
        <View className="flex-row items-center space-x-2 my-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <Octicons name="organization" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {donation?.donation_posts?.organizations?.name}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2 mb-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <MaterialCommunityIcons name="post-outline" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {donation?.donation_posts?.name}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2 mb-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <MaterialIcons name="date-range" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {moment(donation?.created_at).format('D MMMM Y, h:mm')} WIB
          </Text>
        </View>
        <View className="flex-row items-center space-x-2 mb-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <MaterialCommunityIcons name="list-status" size={14} color="white" />
          </View>
          <Text className="text-xs capitalize bg-primary-500 text-white px-2 rounded pb-[2px]">
            {donation?.status}
          </Text>
        </View>
        <View className="flex-row items-start space-x-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <MaterialCommunityIcons name="hands-pray" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {donation?.desc}
          </Text>
        </View>
        <Text className="text-lg text-primary-500 font-bold mt-4">
          Tracking Pengiriman Donasi
        </Text>
        <View className="flex-row items-center space-x-2 my-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <FontAwesome5 name="ticket-alt" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {donation?.awb}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2 mb-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <FontAwesome5 name="truck-loading" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {couriers.filter((courier) => courier.code == donation?.courier)[0]?.title}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2 mb-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <FontAwesome name="map-marker" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {tracking?.detail?.destination}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2 mb-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <Feather name="user" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {tracking?.detail?.receiver}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2 mb-4">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <MaterialCommunityIcons name="list-status" size={14} color="white" />
          </View>
          <Text className="text-xs capitalize bg-primary-500 text-white px-2 rounded pb-[2px]">
            {tracking?.summary?.status}
          </Text>
        </View>
        <Timeline
          data={timeline}
          showTime={false}
          titleStyle={{ fontSize: 12 }}
          descriptionStyle={{ fontSize: 14 }}
          circleStyle={{ alignSelf: 'flex-start' }}
          lineColor='#cbd5e1'
        />

        {(user?.role == 'organization' && tracking?.summary?.status == 'DELIVERED' && donation?.status == 'Menunggu Validasi Organisasi') && (
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={() => handleAcceptDonation()}
              className="flex-1 py-4 mt-10 rounded-md bg-primary-600">
              <Text className="text-md text-white text-center font-semibold">Terima donasi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleRejectDonation()}
              className="flex-1 py-4 mt-10 rounded-md bg-red-600">
              <Text className="text-md text-white text-center font-semibold">Tolak donasi</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}