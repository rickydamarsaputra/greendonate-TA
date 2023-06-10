import { Tabs, useRouter } from 'expo-router';
import { FontAwesome, AntDesign, FontAwesome5, MaterialIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function account() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100 px-4">
      <Tabs.Screen
        options={{
          headerTitle: 'Akun',
        }}
      />

      <ScrollView className="my-6 space-y-4">
        {/* SETTING */}
        <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3">
          <View className="flex-row space-x-2 items-center">
            <FontAwesome name="gear" size={24} color="#4C5155" style={{ width: 30 }} />
            <Text className="font-medium text-gray-500">Pengaturan</Text>
          </View>
          <AntDesign name="right" size={18} color="#4C5155" />
        </TouchableOpacity>
        {/* SETTING */}

        {/* SETTING ORGANIZATION */}
        <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3">
          <View className="flex-row space-x-2 items-center">
            <Octicons name="organization" size={24} color="#4C5155" style={{ width: 30 }} />
            <Text className="font-medium text-gray-500">Pengaturan Organisasi</Text>
          </View>
          <AntDesign name="right" size={18} color="#4C5155" />
        </TouchableOpacity>
        {/* SETTING ORGANIZATION */}

        {/* MANAGE USERS */}
        <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3">
          <View className="flex-row space-x-2 items-center">
            <FontAwesome5 name="users-cog" size={24} color="#4C5155" style={{ width: 30 }} />
            <Text className="font-medium text-gray-500">Kelola Pengguna</Text>
          </View>
          <AntDesign name="right" size={18} color="#4C5155" />
        </TouchableOpacity>
        {/* MANAGE USERS */}

        {/* RAISE DONATIONS */}
        <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3">
          <View className="flex-row space-x-2 items-center">
            <MaterialCommunityIcons name="hand-coin" size={24} color="#4C5155" style={{ width: 30 }} />
            <Text className="font-medium text-gray-500">Galang Donasi</Text>
          </View>
          <AntDesign name="right" size={18} color="#4C5155" />
        </TouchableOpacity>
        {/* RAISE DONATIONS */}

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

        {/* LOG OUT */}
        <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3">
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