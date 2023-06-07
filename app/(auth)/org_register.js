import { Stack } from 'expo-router';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function orgRegister() {
  return (
    <View className="flex-1 px-4">
      <Stack.Screen options={{ headerTitle: 'Daftarkan Organisasi Anda' }} />
      <Text className="text-xl font-bold text-gray-800 mt-5">Mulai donasi untuk kurangi limbah dengan Zero Waste</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-4">
          <Text className="text-gray-500">Nama</Text>
          <TextInput className="border-b border-gray-500" placeholder="Masukkan nama organisasi" />
        </View>
        <View className="mt-4">
          <Text className="text-gray-500">Alamat</Text>
          <TextInput className="border-b border-gray-500" placeholder="Masukkan alamat organisasi" />
        </View>
        <View className="mt-4">
          <Text className="text-gray-500">Kontak</Text>
          <TextInput className="border-b border-gray-500" placeholder="Masukkan nomor organisasi" />
        </View>
        <View className="mt-4">
          <Text className="text-gray-500">Deskripsi</Text>
          <TextInput className="border-b border-gray-500" placeholder="Masukkan deskripsi organisasi" />
        </View>
        <TouchableOpacity className="py-4 rounded-md bg-primary-600 mt-10">
          <Text className="text-md text-white text-center font-semibold">Lanjutkan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}