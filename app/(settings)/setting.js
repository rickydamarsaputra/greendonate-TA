import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Entypo, Octicons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import supabase from '../../lib/supabase';
import * as ImagePicker from 'expo-image-picker';
import ErrorInputMessage from '../../components/ErrorInputMessage';
import { decode } from 'base64-arraybuffer';
import slug from 'slug';
import UpdateUserYupSchema from '../../schema/UpdateUserYupSchema';

export default function setting() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({
    fullname: '',
    address: '',
    phone_number: '',
  });

  const handleUpdateUser = async (values) => {
    const currentUserLogin = await supabase.auth.getUser();
    if (currentUserLogin.error) return router.replace({ pathname: '/' });

    if (image.base64) {
      const storage = await supabase.storage.from('public').upload(`avatar/${slug(values.fullname, '_')}_${(Math.random() * 1000)}.png`, decode(image.base64), {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/png'
      });
      if (storage.error) return console.log(storage.error);

      const storageGetUrl = await supabase.storage.from('public').getPublicUrl(storage.data.path);
      if (storageGetUrl.error) return console.log(storageGetUrl.error);

      const updateUser = await supabase.from('users').update({
        fullname: values.fullname,
        address: values.address,
        contact: values.phone_number,
        avatar_img: storageGetUrl.data.publicUrl,
      }).eq('id', currentUserLogin.data.user.id).select();
      if (updateUser.error) return console.log(updateUser.error);
    } else {
      const updateUser = await supabase.from('users').update({
        fullname: values.fullname,
        address: values.address,
        contact: values.phone_number,
      }).eq('id', currentUserLogin.data.user.id).select();
      if (updateUser.error) return console.log(updateUser.error);
    }

    router.back();
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
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

  useEffect(() => {
    async function getUser() {
      const currentUserLogin = await supabase.auth.getUser();
      if (currentUserLogin.error) return router.replace({ pathname: '/' });

      const { data, error } = await supabase.from('users').select('*').eq('id', currentUserLogin.data.user.id).single();
      if (error) return console.log(error);

      setUser({
        fullname: data.fullname,
        address: data.address,
        phone_number: data.contact,
      });
      setImage({
        uri: data.avatar_img,
        base64: null,
      });
    }

    getUser();
  }, []);

  return (
    <View className="flex-1 px-4">
      <Stack.Screen options={{ headerTitle: 'Ubah Data Pengguna' }} />
      <Formik
        enableReinitialize={true}
        validationSchema={UpdateUserYupSchema}
        initialValues={{
          fullname: user.fullname,
          address: user.address,
          phone_number: user.phone_number,
        }}
        onSubmit={handleUpdateUser}
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
            <TouchableOpacity
              className="py-4 rounded-md bg-primary-600 mt-10"
              onPress={handleSubmit}>
              <Text className="text-md text-white text-center font-semibold">Ubah data</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}
