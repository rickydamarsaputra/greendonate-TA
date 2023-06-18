import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DonationCard } from '../../components';
import supabase from '../../lib/supabase';

export default function detailOrganization() {
  const router = useRouter();
  const { organizationId } = useLocalSearchParams();
  const [organization, setOrganization] = useState(null);
  const [donations, setDonations] = useState(null);

  useEffect(() => {
    async function getOrganizationAndDonations() {
      const getOrganization = await supabase.from('organizations')
        .select().eq('id', organizationId).single();
      if (getOrganization.error) return console.log(getOrganization.error);

      const getDonations = await supabase.from('donation_posts')
        .select().eq('organization_id', organizationId);
      if (getDonations.error) return console.log(getDonations.error);
      console.log(getDonations);

      setOrganization({ ...getOrganization.data });
      setDonations([...getDonations.data.map((res) => ({
        id: res.id,
        title: res.name,
        current_amount: res.current_amount,
        cover: res.banner_img,
        status: res.status
      }))]);
    }

    getOrganizationAndDonations();
  }, []);

  return (
    <View className="relative flex-1 bg-gray-100 px-4">
      <Tabs.Screen
        options={{
          headerTitle: organization?.name,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="my-5"
      >
        <Image
          source={{ uri: organization?.banner_img }}
          className="w-full h-[200px] rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm text-justify text-gray-500 mt-4">
          {organization?.desc}
        </Text>
        <Text className="text-lg text-primary-500 font-bold my-4">
          Informasi Organisasi
        </Text>
        <View className="flex-row items-center space-x-2 mb-1">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <FontAwesome name="map-marker" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {organization?.address}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2 mb-1">
          <View className="w-[25px] h-[25px] justify-center items-center rounded-full bg-primary-500">
            <Entypo name="old-phone" size={14} color="white" />
          </View>
          <Text className="text-sm text-gray-600">
            {organization?.contact}
          </Text>
        </View>

        {/* LIST DONATION */}
        <View className="flex-row items-center justify-between mt-10">
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
          {donations?.map((item) => <DonationCard key={item.id} item={item} />)}
        </ScrollView>
        {/* LIST DONATION */}
      </ScrollView>
    </View>
  );
}