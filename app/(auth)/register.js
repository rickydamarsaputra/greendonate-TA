import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Entypo, Octicons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Formik } from 'formik';
import supabase from '../../lib/supabase';
import * as ImagePicker from 'expo-image-picker';
import ErrorInputMessage from '../../components/ErrorInputMessage';
import RegisterYupSchema from '../../schema/RegisterYupSchema';
import { decode } from 'base64-arraybuffer';
import slug from 'slug';

export default function register() {
  const router = useRouter();
  const { enterAs } = useLocalSearchParams();
  const [securePassword, setSecurePassword] = useState(true);
  const [image, setImage] = useState(null);

  const handleRegister = async (values) => {
    const userRegister = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (userRegister.error) return console.log(userRegister.error);

    const storage = await supabase.storage.from('public').upload(`avatar/${slug(values.fullname, '_')}.png`, decode(image.base64), {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/png'
    });
    if (storage.error) return console.log(storage.error);

    const storageGetUrl = await supabase.storage.from('public').getPublicUrl(storage.data.path);
    if (storageGetUrl.error) return console.log(storageGetUrl.error);

    const user = await supabase.from('users').insert([{
      id: userRegister.data.user.id,
      avatar_img: storageGetUrl.data.publicUrl,
      organization_id: null,
      fullname: values.fullname,
      address: values.address,
      contact: values.phone_number,
      role: enterAs,
      is_active: true,
    }]);
    if (user.error) return console.log(user.error);

    if (enterAs == 'organization') return router.replace({ pathname: 'org_register' });
    router.replace({ pathname: 'main' });
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
      });
    }
  };

  return (
    <View className="flex-1 px-4">
      <Stack.Screen options={{ headerTitle: 'Daftar' }} />
      <Text className="text-xl font-bold text-gray-800 mt-5">Masuk untuk menikmati{'\n'}kemudahan berdonasi</Text>
      <Formik
        validationSchema={RegisterYupSchema}
        initialValues={{
          fullname: '',
          address: '',
          phone_number: '',
          email: '',
          password: '',
        }}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="relative self-center mt-2">
              <Image
                source={!image ? require('../../assets/v2/default-avatar.png') : { uri: image.uri }}
                className="w-[100px] h-[100px] rounded-full"
              />
              <TouchableOpacity
                className="w-[40px] h-[40px] absolute -bottom-2 -right-2 justify-center items-center rounded-full bg-primary-500"
                onPress={pickImage}
              >
                <Octicons name="upload" size={21} color="white" />
              </TouchableOpacity>
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Nama Lengkap</Text>
              <TextInput
                onChangeText={handleChange('fullname')}
                value={values.fullname}
                className="border-b border-gray-500" placeholder="Masukkan nama lengkap anda" />
              {errors.fullname && touched.fullname ? <ErrorInputMessage message={errors.fullname} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Alamat</Text>
              <TextInput
                onChangeText={handleChange('address')}
                value={values.address}
                className="border-b border-gray-500" placeholder="Masukkan alamat anda" />
              {errors.address && touched.address ? <ErrorInputMessage message={errors.address} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Nomor Hp</Text>
              <TextInput
                onChangeText={handleChange('phone_number')}
                value={values.phone_number}
                keyboardType="numeric"
                className="border-b border-gray-500" placeholder="Masukkan nomor hp anda" />
              {errors.phone_number && touched.phone_number ? <ErrorInputMessage message={errors.phone_number} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Email</Text>
              <TextInput
                onChangeText={handleChange('email')}
                value={values.email}
                className="border-b border-gray-500" placeholder="Masukkan email anda" />
              {errors.email && touched.email ? <ErrorInputMessage message={errors.email} /> : null}
            </View>
            <View className="relative mt-4">
              <Text className="text-gray-500">Password</Text>
              <TextInput
                onChangeText={handleChange('password')}
                value={values.password}
                className="border-b border-gray-500" placeholder="Masukkan password anda" secureTextEntry={securePassword} />
              <TouchableOpacity className="absolute right-0 top-5"
                onPress={() => setSecurePassword(!securePassword)}
              >
                <Entypo name={`${securePassword ? 'eye-with-line' : 'eye'}`} size={18} color="gray" />
              </TouchableOpacity>
              {errors.password && touched.password ? <ErrorInputMessage message={errors.password} /> : null}
            </View>
            <TouchableOpacity
              className="py-4 rounded-md bg-primary-600 mt-10"
              onPress={handleSubmit}>
              <Text className="text-md text-white text-center font-semibold">Lanjutkan</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-2 space-x-1">
              <Text className="text-gray-500 font-medium">Sudah punya akun?</Text>
              <Link href={{ pathname: 'org_register' }} className="text-primary-500 font-medium">Masuk</Link>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}
