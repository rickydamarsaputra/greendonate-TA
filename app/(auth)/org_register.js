import { Octicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import OrgRegisterYupSchema from '../../schema/OrgRegisterYupSchema';
import ErrorInputMessage from '../../components/ErrorInputMessage';
import supabase from '../../lib/supabase';
import slug from 'slug';
import { decode } from 'base64-arraybuffer';

export default function orgRegister() {
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleRegister = async (values) => {
    const storage = await supabase.storage.from('public').upload(`org_banner/${slug(values.name, '_')}.png`, decode(image.base64), {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/png',
    });
    if (storage.error) return console.log(storage.error);

    const storageGetUrl = await supabase.storage.from('public').getPublicUrl(storage.data.path);
    if (storageGetUrl.error) return console.log(storageGetUrl.error);

    const organization = await supabase.from('organizations').insert({
      name: values.name,
      address: values.address,
      contact: values.contact,
      desc: values.desc,
      banner_img: storageGetUrl.data.publicUrl,
    }).select().single();
    if (organization.error) return console.log(organization.error);

    const currentUserLogin = await supabase.auth.getUser();

    const updateUser = await supabase.from('users')
      .update({ organization_id: organization.data.id })
      .eq('id', currentUserLogin.data.user.id)
      .select()
    if (updateUser.error) return console.log(updateUser.error);
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
    <View className="flex-1 px-4 my-5">
      <Stack.Screen options={{ headerTitle: 'Daftarkan Organisasi Anda' }} />
      <Formik
        validationSchema={OrgRegisterYupSchema}
        initialValues={{
          name: '',
          address: '',
          contact: '',
          desc: '',
        }}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="relative mt-2">
              <Image
                source={!image ? require('../../assets/v2/default-asset.png') : { uri: image.uri }}
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
              <TextInput
                onChangeText={handleChange('name')}
                value={values.name}
                className="border-b border-gray-500" placeholder="Masukkan nama organisasi" />
              {errors.name && touched.name ? <ErrorInputMessage message={errors.name} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Alamat</Text>
              <TextInput
                onChangeText={handleChange('address')}
                value={values.address}
                className="border-b border-gray-500" placeholder="Masukkan alamat organisasi" />
              {errors.address && touched.address ? <ErrorInputMessage message={errors.address} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Kontak</Text>
              <TextInput
                onChangeText={handleChange('contact')}
                value={values.contact}
                keyboardType="numeric"
                className="border-b border-gray-500" placeholder="Masukkan nomor organisasi" />
              {errors.contact && touched.contact ? <ErrorInputMessage message={errors.contact} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Deskripsi</Text>
              <TextInput
                onChangeText={handleChange('desc')}
                value={values.desc}
                style={{ height: 100, textAlignVertical: 'top' }}
                numberOfLines={10}
                className="border-b border-gray-500 mt-1" placeholder="Masukkan deskripsi organisasi" />
              {errors.desc && touched.desc ? <ErrorInputMessage message={errors.desc} /> : null}
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              className="py-4 rounded-md bg-primary-600 mt-10">
              <Text className="text-md text-white text-center font-semibold">Lanjutkan</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}