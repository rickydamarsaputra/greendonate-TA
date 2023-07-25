import { Tabs, useFocusEffect, useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import supabase from '../../lib/supabase';
import { useEffect, useState } from 'react';

export default function inbox() {
  const router = useRouter();
  const [notification, setNotification] = useState([]);

  // useEffect(() => {
  //   async function getNotification() {
  //     const currentUserLogin = await supabase.auth.getUser();
  //     if (currentUserLogin.error) return router.replace({ pathname: '/' });

  //     const user = await supabase.from('users')
  //       .select()
  //       .eq('id', currentUserLogin.data.user.id)
  //       .single();
  //     if (user.error) return console.log(user.error);

  //     const { data, error } = await supabase.from('notifications')
  //       .select()
  //       .eq('user_id', user.data.id);
  //     if (error) return console.log(error.message);

  //     setNotification([...data.map((res) => ({
  //       id: res.id,
  //       message: res.message
  //     }))]);

  //     // console.log(data);
  //   }

  //   getNotification();
  // }, [notification]);

  useFocusEffect(() => {
    async function getNotification() {
      const currentUserLogin = await supabase.auth.getUser();
      if (currentUserLogin.error) return router.replace({ pathname: '/' });

      const user = await supabase.from('users')
        .select()
        .eq('id', currentUserLogin.data.user.id)
        .single();
      if (user.error) return console.log(user.error);

      const { data, error } = await supabase.from('notifications')
        .select()
        .eq('user_id', user.data.id);
      if (error) return console.log(error.message);

      setNotification([...data.map((res) => ({
        id: res.id,
        message: res.message
      }))]);

      // console.log(data);
    }

    getNotification();
  });

  return (
    <View className="flex-1 bg-gray-100 px-4">
      <Tabs.Screen
        options={{
          headerTitle: 'Pesan',
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="my-6 space-y-4">
        {notification?.map((item) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: 'notification', params: { message: item.message } })}
            key={item.id} className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3">
            <Text className="font-medium text-gray-500">{item.message}</Text>
            <AntDesign name="right" size={18} color="#4C5155" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View >
  );
}