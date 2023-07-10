import { Octicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import OrgRegisterYupSchema from '../../schema/OrgRegisterYupSchema';
import ErrorInputMessage from '../../components/ErrorInputMessage';
import supabase from '../../lib/supabase';
import slug from 'slug';
import { decode } from 'base64-arraybuffer';

export default function orgSetting() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [organization, setOrganization] = useState({
    name: '',
    address: '',
    contact: '',
    desc: '',
  });

  const handleUpdateOrganization = async (values) => {
    const currentUserLogin = await supabase.auth.getUser();
    if (currentUserLogin.error) return router.replace({ pathname: '/' });

    const user = await supabase.from('users')
      .select()
      .eq('id', currentUserLogin.data.user.id)
      .single();
    if (user.error) return console.log(user.error);

    if (image.base64) {
      const storage = await supabase.storage.from('public').upload(`avatar/${slug(values.name, '_')}_${(Math.random() * 1000)}.png`, decode(image.base64), {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/png'
      });
      if (storage.error) return console.log(storage.error);

      const storageGetUrl = await supabase.storage.from('public').getPublicUrl(storage.data.path);
      if (storageGetUrl.error) return console.log(storageGetUrl.error);

      const updateOrganization = await supabase.from('organizations').update({
        name: values.name,
        address: values.address,
        contact: values.contact,
        desc: values.desc,
        banner_img: storageGetUrl.data.publicUrl,
      }).eq('id', user.data.organization_id);
      if (updateOrganization.error) return console.log(updateOrganization.error);
    } else {
      const updateOrganization = await supabase.from('organizations').update({
        name: values.name,
        address: values.address,
        contact: values.contact,
        desc: values.desc,
      }).eq('id', user.data.organization_id).select();
      if (updateOrganization.error) return console.log(updateOrganization.error);
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
    async function getOrganization() {
      const currentUserLogin = await supabase.auth.getUser();
      if (currentUserLogin.error) return router.replace({ pathname: '/' });

      const user = await supabase.from('users').select('*').eq('id', currentUserLogin.data.user.id).single();
      if (user.error) return console.log(user.error);

      const { data, error } = await supabase.from('organizations')
        .select()
        .eq('id', user.data.organization_id).single();
      if (error) return console.log(error);

      setOrganization({
        name: data.name,
        address: data.address,
        contact: data.contact,
        desc: data.desc,
      });
      setImage({
        uri: data.banner_img,
        base64: null,
      });
    }

    getOrganization();
  }, []);

  return (
    <View className="flex-1 px-4">
      <Stack.Screen options={{ headerTitle: 'Ubah Data Organisasi' }} />
      <Formik
        enableReinitialize={true}
        validationSchema={OrgRegisterYupSchema}
        initialValues={{
          name: organization.name,
          address: organization.address,
          contact: organization.contact,
          desc: organization.desc,
        }}
        onSubmit={handleUpdateOrganization}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="relative mt-5">
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
                multiline={true}
                className="border-b border-gray-500 mt-1" placeholder="Masukkan deskripsi organisasi" />
              {errors.desc && touched.desc ? <ErrorInputMessage message={errors.desc} /> : null}
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              className="py-4 rounded-md bg-primary-600 mt-10">
              <Text className="text-md text-white text-center font-semibold">Ubah data</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}