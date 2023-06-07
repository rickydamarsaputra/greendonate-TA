import { Link, Stack, useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

export default function register() {
  const [securePassword, setSecurePassword] = useState(true);
  const router = useRouter();

  return (
    <View className="flex-1 px-4">
      <Stack.Screen options={{ headerTitle: 'Daftar' }} />
      <Text className="text-xl font-bold text-gray-800 mt-5">Masuk untuk menikmati{'\n'}kemudahan berdonasi</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-4">
          <Text className="text-gray-500">Nama Lengkap</Text>
          <TextInput className="border-b border-gray-500" placeholder="Masukkan nama lengkap anda" />
        </View>
        <View className="mt-4">
          <Text className="text-gray-500">Alamat</Text>
          <TextInput className="border-b border-gray-500" placeholder="Masukkan alamat anda" />
        </View>
        <View className="mt-4">
          <Text className="text-gray-500">Nomor Hp</Text>
          <TextInput className="border-b border-gray-500" placeholder="Masukkan nomor hp anda" />
        </View>
        <View className="mt-4">
          <Text className="text-gray-500">Email</Text>
          <TextInput className="border-b border-gray-500" placeholder="Masukkan email anda" />
        </View>
        <View className="relative mt-4">
          <Text className="text-gray-500">Password</Text>
          <TextInput className="border-b border-gray-500" placeholder="Masukkan password anda" secureTextEntry={securePassword} />
          <TouchableOpacity className="absolute right-0 top-5"
            onPress={() => setSecurePassword(!securePassword)}
          >
            <Entypo name={`${securePassword ? 'eye-with-line' : 'eye'}`} size={18} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="py-4 rounded-md bg-primary-600 mt-10"
          onPress={() => router.push('org_register')}>
          <Text className="text-md text-white text-center font-semibold">Lanjutkan</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center mt-2 space-x-1">
          <Text className="text-gray-500 font-medium">Sudah punya akun?</Text>
          <Link href={{ pathname: 'login' }} className="text-primary-500 font-medium">Masuk</Link>
        </View>
      </ScrollView>
    </View>
  );
}