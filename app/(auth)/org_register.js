import { Octicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function orgRegister() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 px-4">
      <Stack.Screen options={{ headerTitle: 'Daftarkan Organisasi Anda' }} />
      <Text className="text-xl font-bold text-gray-800 mt-5">Mulai donasi untuk kurangi limbah dengan Zero Waste</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative mt-2">
          <Image
            source={!image ? require('../../assets/v2/default-asset.png') : { uri: image }}
            className="w-full h-[200px] rounded-lg"
            resizeMode="cover"
          />
          <TouchableOpacity
            className="w-[40px] h-[40px] absolute bottom-2 right-2 justify-center items-center rounded-full bg-primary-500"
            onPress={pickImage}
          >
            <Octicons name="upload" size={21} color="white" />
          </TouchableOpacity>
        </View>
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