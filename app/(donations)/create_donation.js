import { Octicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import ErrorInputMessage from '../../components/ErrorInputMessage';
import supabase from '../../lib/supabase';
import slug from 'slug';
import { decode } from 'base64-arraybuffer';
import CreateDonationPostYupSchema from '../../schema/CreateDonationPostYupSchema';

export default function createDonation() {
  const router = useRouter();
  const [image, setImage] = useState(null);

  const handleCreateDonationPost = async (values) => {
    const storage = await supabase.storage.from('public').upload(`donation_banner/${slug(values.name, '_')}.png`, decode(image.base64), {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/png',
    });
    if (storage.error) return console.log(storage.error);

    const storageGetUrl = await supabase.storage.from('public').getPublicUrl(storage.data.path);
    if (storageGetUrl.error) return console.log(storageGetUrl.error);

    const currentUserLogin = await supabase.auth.getUser();
    if (currentUserLogin.error) return console.log(currentUserLogin.error);

    const user = await supabase.from('users')
      .select()
      .eq('id', currentUserLogin.data.user.id)
      .single();
    if (user.error) return console.log(user.error);

    const donationPost = await supabase.from('donation_posts').insert({
      organization_id: user.data.organization_id,
      name: values.name,
      desc: values.desc,
      required_amount: values.required_amount,
      goods_criteria: values.goods_criteria,
      banner_img: storageGetUrl.data.publicUrl,
    });
    if (donationPost.error) return console.log(donationPost.error);

    router.push({ pathname: 'raise_donation' });
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
      <Stack.Screen options={{ headerTitle: 'Buat Donasi' }} />
      <Formik
        validationSchema={CreateDonationPostYupSchema}
        initialValues={{
          name: '',
          desc: '',
          required_amount: '',
          goods_criteria: '',
        }}
        onSubmit={handleCreateDonationPost}
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
                className="border-b border-gray-500" placeholder="Masukkan nama" />
              {errors.name && touched.name ? <ErrorInputMessage message={errors.name} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Deskripsi</Text>
              <TextInput
                onChangeText={handleChange('desc')}
                value={values.desc}
                style={{ height: 100, textAlignVertical: 'top' }}
                multiline={true}
                className="border-b border-gray-500 mt-1" placeholder="Masukkan deskripsi" />
              {errors.desc && touched.desc ? <ErrorInputMessage message={errors.desc} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Jumlah Barang Yang Dibutuhkan</Text>
              <TextInput
                onChangeText={handleChange('required_amount')}
                value={values.required_amount}
                keyboardType="numeric"
                className="border-b border-gray-500" placeholder="Masukkan jumlah barang yang dibutuhkan" />
              {errors.required_amount && touched.required_amount ? <ErrorInputMessage message={errors.required_amount} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Kriteria Barang</Text>
              <TextInput
                onChangeText={handleChange('goods_criteria')}
                value={values.goods_criteria}
                className="border-b border-gray-500" placeholder="Masukkan kriteria barang" />
              {errors.goods_criteria && touched.goods_criteria ? <ErrorInputMessage message={errors.goods_criteria} /> : null}
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