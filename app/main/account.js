import { Tabs, useRouter } from 'expo-router';
import { FontAwesome, AntDesign, FontAwesome5, MaterialIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import supabase from '../../lib/supabase';
import { useEffect, useState } from 'react';

export default function account() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const handleSignOut = async () => {
    const userSignOut = await supabase.auth.signOut();
    if (userSignOut.error) return console.log(userSignOut.error);

    router.replace({ pathname: '/' });
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
      });
    }

    getUser();
  }, []);

  return (
    <View className="flex-1 bg-gray-100 px-4">
      <Tabs.Screen
        options={{
          headerTitle: 'Akun',
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="my-6 space-y-4"
      >
        {/* SETTING */}
        <TouchableOpacity
          className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3"
          onPress={() => router.push({ pathname: 'setting' })}
        >
          <View className="flex-row space-x-2 items-center">
            <FontAwesome name="gear" size={24} color="#4C5155" style={{ width: 30 }} />
            <Text className="font-medium text-gray-500">Ubah Data Pengguna</Text>
          </View>
          <AntDesign name="right" size={18} color="#4C5155" />
        </TouchableOpacity>
        {/* SETTING */}

        {/* SETTING ORGANIZATION */}
        {user?.role == 'organization' && (
          <TouchableOpacity
            className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3"
            onPress={() => router.push({ pathname: 'org_setting' })}
          >
            <View className="flex-row space-x-2 items-center">
              <Octicons name="organization" size={24} color="#4C5155" style={{ width: 30 }} />
              <Text className="font-medium text-gray-500">Ubah Data Organisasi</Text>
            </View>
            <AntDesign name="right" size={18} color="#4C5155" />
          </TouchableOpacity>
        )}
        {/* SETTING ORGANIZATION */}

        {/* GREENDONATE STATISTICS */}
        {user?.role == 'admin' && (
          <TouchableOpacity
            className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3"
            onPress={() => router.push({ pathname: 'statistics' })}>
            <View className="flex-row space-x-2 items-center">
              <FontAwesome name="bar-chart-o" size={24} color="#4C5155" style={{ width: 30 }} />
              <Text className="font-medium text-gray-500">Statistika Greendonate</Text>
            </View>
            <AntDesign name="right" size={18} color="#4C5155" />
          </TouchableOpacity>
        )}
        {/* GREENDONATE STATISTICS */}

        {/* MANAGE ORGANIZATION DONATION */}
        {user?.role == 'admin' && (
          <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3"
            onPress={() => router.push({ pathname: 'manage_donation' })}>
            <View className="flex-row space-x-2 items-center">
              <MaterialCommunityIcons name="hand-coin" size={24} color="#4C5155" style={{ width: 30 }} />
              <Text className="font-medium text-gray-500">Kelola Donasi Organisasi</Text>
            </View>
            <AntDesign name="right" size={18} color="#4C5155" />
          </TouchableOpacity>
        )}
        {/* MANAGE ORGANIZATION DONATION */}

        {/* RAISE DONATIONS */}
        {user?.role == 'organization' && (
          <TouchableOpacity
            className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3"
            onPress={() => router.push({ pathname: 'raise_donation' })}
          >
            <View className="flex-row space-x-2 items-center">
              <MaterialCommunityIcons name="hand-coin" size={24} color="#4C5155" style={{ width: 30 }} />
              <Text className="font-medium text-gray-500">Galang Donasi</Text>
            </View>
            <AntDesign name="right" size={18} color="#4C5155" />
          </TouchableOpacity>
        )}
        {/* RAISE DONATIONS */}

        {/* TERMS AND CONDITIONS */}
        <TouchableOpacity
          className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3"
          onPress={() => router.push({ pathname: 'terms_and_conditions' })}
        >
          <View className="flex-row space-x-2 items-center">
            <MaterialIcons name="rule" size={24} color="#4C5155" style={{ width: 30 }} />
            <Text className="font-medium text-gray-500">Syarat dan Ketentuan</Text>
          </View>
          <AntDesign name="right" size={18} color="#4C5155" />
        </TouchableOpacity>
        {/* TERMS AND CONDITIONS */}

        {/* ABOUT */}
        <TouchableOpacity
          className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3"
          onPress={() => router.push({ pathname: 'about' })}
        >
          <View className="flex-row space-x-2 items-center">
            <FontAwesome5 name="donate" size={24} color="#4C5155" style={{ width: 30 }} />
            <Text className="font-medium text-gray-500">Tentang GreenDonate</Text>
          </View>
          <AntDesign name="right" size={18} color="#4C5155" />
        </TouchableOpacity>
        {/* ABOUT */}

        {/* LOG OUT */}
        <TouchableOpacity
          className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3"
          onPress={handleSignOut}
        >
          <View className="flex-row space-x-2 items-center">
            <FontAwesome name="sign-out" size={24} color="#4C5155" style={{ width: 30 }} />
            <Text className="font-medium text-gray-500">Keluar</Text>
          </View>
          <AntDesign name="right" size={18} color="#4C5155" />
        </TouchableOpacity>
        {/* LOG OUT */}
      </ScrollView>
    </View>
  );
}