import { Link, Stack } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

export default function login() {
  const [securePassword, setSecurePassword] = useState(true);

  return (
    <View className="flex-1 px-4">
      <Stack.Screen options={{ headerTitle: 'Masuk' }} />
      <Text className="text-xl font-bold text-gray-800 mt-5">Masuk untuk menikmati{'\n'}kemudahan berdonasi</Text>
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
        className="py-4 rounded-md bg-primary-600 mt-10">
        <Text className="text-md text-white text-center font-semibold">Lanjutkan</Text>
      </TouchableOpacity>
      <View className="flex-row justify-center mt-2 space-x-1">
        <Text className="text-gray-500 font-medium">Belum punya akun?</Text>
        <Link href={{ pathname: 'register' }} className="text-primary-500 font-medium">Daftar</Link>
      </View>
    </View>
  );
}