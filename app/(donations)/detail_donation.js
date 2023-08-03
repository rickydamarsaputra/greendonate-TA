import { Entypo, FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DonationCard, StoryCard } from '../../components';
import supabase from '../../lib/supabase';

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

export default function detailDonation() {
  const router = useRouter();
  const { donationId } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [donation, setDonation] = useState(null);
  const [donations, setDonations] = useState([]);
  const [stories, setStories] = useState([]);

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
      const getDonation = await supabase.from('donation_posts')
        .select(`
        id,
        name,
        desc,
        required_amount,
        current_amount,
        banner_img,
        goods_criteria,
        status,
        ended_at,
        organizations (id, name, address, contact)
        `).eq('id', donationId).single();
      if (getDonation.error) return console.log(getDonation.error);

      const { data, error } = await supabase.from('donations')
        .select(`
        id,
        post_id,
        delivery_img,
        awb,
        courier,
        created_at,
        donation_posts (name)
        `).eq('post_id', getDonation.data.id)
        .order('created_at', { ascending: false });
      if (error) return console.log(error.message);


      setDonation({ ...getDonation.data });
      setDonations([...data.map((res) => ({
        id: res.id,
        cover: res.delivery_img,
        title: res.awb,
        courier: res.courier,
        donation_to: getDonation.data.name,
        created_at: moment(res.created_at).fromNow(),
      }))]);
    }

    async function getStories() {
      const { data, error } = await supabase.from('donations')
        .select(`
        id, 
        user_id, 
        post_id, 
        desc, 
        is_show_name,
        created_at,
        users (id, fullname)
        `).eq('post_id', donationId)
        .limit(4)
        .order('created_at', { ascending: false });
      if (error) return console.log(error.message);

      setStories([...data.map((res) => ({
        id: res.id,
        content: res.desc,
        is_show_name: res.is_show_name,
        author: res.users.fullname,
        created_at: moment(res.created_at).fromNow(),
      }))]);
    }

    getUser();
    getDonation();
    getStories();
  }, []);

  const handleAcceptProgramDonation = async () => {
    const { data, error } = await supabase.from('donation_posts')
      .update({ status: 'active' }).eq('id', donationId).select();
    if (error) return console.log(error);

    console.log(data);
    return router.back();
  }

  const handleRejectProgramDonation = async () => {
    const { data, error } = await supabase.from('donation_posts')
      .update({ status: 'reject' }).eq('id', donationId).select();
    if (error) return console.log(error);

    console.log(data);
    return router.back();
  }

  return (
    <View className="relative flex-1 bg-gray-100 px-4">
      <Tabs.Screen
        options={{
          headerTitle: donation?.name.substring(0, 20),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="my-5"
      >
        <View className="relative">
          <Image source={{ uri: donation?.banner_img }} className="w-full h-[200px] rounded-lg" style={{ resizeMode: 'cover' }} />
          <Text className="text-sm mt-1 text-primary-500 font-bold">{donation?.title}</Text>
          {donation?.status == 'active' ? <BadgeStatusOngoing status={donation?.status} /> : <BadgeStatusEnded status={donation?.status} />}
        </View>
        <View className="flex-row space-x-2 mb-4">
          <View className="flex-1 bg-primary-500 px-2 py-2 rounded">
            <Text className="text-xs font-semibold text-secondary-500">
              Berakhir pada {moment(donation?.ended_at).format('LL')}
            </Text>
          </View>
        </View>
        {/* <View className="flex-row space-x-2 mb-4">
          <View className="flex-1 bg-secondary-500 px-2 py-2 rounded">
            <Text className="text-xs text-center font-semibold text-primary-500">Dibutuhkan: {donation?.required_amount}</Text>
          </View>
          <View className="flex-1 bg-primary-500 px-2 py-2 rounded">
            <Text className="text-xs text-center font-semibold text-secondary-500">Terkumpul: {donation?.current_amount}</Text>
          </View>
        </View> */}
        {/* <View className="relative mb-4">
          <View className="w-full h-[20px] bg-gray-300 rounded"></View>
          <View
            style={{ width: `${Math.round((donation?.current_amount / donation?.required_amount) * 100)}%` }}
            className="h-[20px] absolute bg-primary-500 rounded">
            <Text className="text-xs text-white font-semibold text-center mt-[1px]">
              {Math.round((donation?.current_amount / donation?.required_amount) * 100)}%
            </Text>
          </View>
        </View> */}
        <Text className="text-lg text-primary-500 font-bold">
          Deskripsi Program Donasi
        </Text>
        <Text className="text-sm text-justify text-gray-500">
          {donation?.desc}
        </Text>
        <Text className="text-lg text-primary-500 font-bold mt-4">
          Informasi Organisasi
        </Text>
        <View className="flex-row items-center space-x-2 my-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <Octicons name="organization" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {donation?.organizations?.name}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2 mb-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <FontAwesome name="map-marker" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {donation?.organizations?.address}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2 mb-2">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <Entypo name="old-phone" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {donation?.organizations?.contact}
          </Text>
        </View>
        <Text className="text-lg text-primary-500 font-bold mt-4">
          Kriteria Barang Donasi
        </Text>
        <Text className="text-sm text-justify text-gray-500">
          {donation?.goods_criteria}
        </Text>

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
            {stories?.map((item) => <StoryCard key={item.id} item={item} />)}
          </View>
        </ScrollView>
        {/* LIST STORY */}

        {user?.role == 'organization' && (
          <>
            {/* LIST DONATION */}
            <View className="flex-row items-center justify-between mt-10">
              <Text className="text-lg text-primary-500 font-bold">Kumpulan Donasi</Text>
            </View>
            <ScrollView
              className="mt-2"
              showsHorizontalScrollIndicator={false}
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
          </>
        )}

        {(user?.role == 'donatur' && donation?.status == 'active') && (
          <TouchableOpacity
            onPress={() => router.push({ pathname: 'make_donation', params: { donationPostId: donation.id } })}
            className="w-full py-4 mt-10 rounded-md bg-primary-600">
            <Text className="text-md text-white text-center font-semibold">Donasi sekarang</Text>
          </TouchableOpacity>
        )}

        {(user?.role == 'admin' && donation?.status == 'pending') && (
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={() => handleAcceptProgramDonation()}
              className="flex-1 py-4 mt-10 rounded-md bg-primary-600">
              <Text className="text-md text-white text-center font-semibold">Terima postingan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleRejectProgramDonation()}
              className="flex-1 py-4 mt-10 rounded-md bg-red-600">
              <Text className="text-md text-white text-center font-semibold">Tolak postingan</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}