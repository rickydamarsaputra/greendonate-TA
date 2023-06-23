import { Entypo, FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DonationCard } from '../../components';
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
        organizations (id, name, address, contact)
        `).eq('id', donationId).single();
      if (getDonation.error) return console.log(getDonation.error);

      setDonation({ ...getDonation.data });
    }

    getUser();
    getDonation();
  }, []);

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
          <View className="flex-1 bg-secondary-500 px-2 py-2 rounded">
            <Text className="text-xs text-center font-semibold text-primary-500">Dibutuhkan: {donation?.required_amount}</Text>
          </View>
          <View className="flex-1 bg-primary-500 px-2 py-2 rounded">
            <Text className="text-xs text-center font-semibold text-secondary-500">Terkumpul: {donation?.current_amount}</Text>
          </View>
        </View>
        <View className="relative mb-4">
          <View className="w-full h-[10px] bg-gray-300 rounded"></View>
          <View
            style={{ width: `${(donation?.current_amount / donation?.required_amount) * 100}%` }}
            className="h-[10px] absolute bg-primary-500 rounded"></View>
        </View>
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

        {user?.role == 'donatur' && (
          <TouchableOpacity
            onPress={() => router.push({ pathname: 'make_donation', params: { donationPostId: donation.id } })}
            className="w-full py-4 mt-10 rounded-md bg-primary-600">
            <Text className="text-md text-white text-center font-semibold">Donasi sekarang</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}