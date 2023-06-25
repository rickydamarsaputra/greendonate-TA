import { Octicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import OrgRegisterYupSchema from '../../schema/OrgRegisterYupSchema';
import ErrorInputMessage from '../../components/ErrorInputMessage';
import supabase from '../../lib/supabase';
import slug from 'slug';
import { decode } from 'base64-arraybuffer';
import UserMakeDonationYupSchema from '../../schema/UserMakeDonationYupSchema';
import { BINDERBYTE_API_KEY } from "@env";

export default function makeDonation() {
  const router = useRouter();
  const { donationPostId } = useLocalSearchParams();
  const [image, setImage] = useState(null);
  const [showName, setShowName] = useState(true);
  const [courier, setCourier] = useState('sicepat');

  const [toggles, setToggles] = useState([
    {
      title: 'Tampilkan',
      is_active: true,
    },
    {
      title: 'Sembunyikan',
      is_active: false,
    },
  ]);
  const [couriers, setCouriers] = useState([
    {
      code: 'sicepat',
      title: 'SiCepat',
      is_active: true,
    },
    {
      code: 'jne',
      title: 'JNE Express',
      is_active: false,
    },
    {
      code: 'jet',
      title: 'JET Express',
      is_active: false,
    },
  ]);

  const handleUserMakeDonation = async (values) => {
    const checkValidAwb = await fetch(`https://api.binderbyte.com/v1/track?api_key=${BINDERBYTE_API_KEY}&courier=${courier}&awb=${values.resi}`)
      .then(res => res.json());
    if (checkValidAwb.status != 200) {
      Alert.alert('kurir/resi yang anda masukkan tidak valid!');
      return console.log(checkValidAwb.message);
    }

    const storage = await supabase.storage.from('public').upload(`donation_delivery/${slug(values.resi, '_')}.png`, decode(image.base64), {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/png',
    });
    if (storage.error) return console.log(storage.error);

    const storageGetUrl = await supabase.storage.from('public').getPublicUrl(storage.data.path);
    if (storageGetUrl.error) return console.log(storageGetUrl.error);

    const currentUserLogin = await supabase.auth.getUser();
    if (currentUserLogin.error) return console.log(currentUserLogin.error);

    const createDonation = await supabase.from('donations').insert({
      user_id: currentUserLogin.data.user.id,
      post_id: donationPostId,
      delivery_img: storageGetUrl.data.publicUrl,
      awb: values.resi,
      courier: courier,
      desc: values.desc,
      is_show_name: showName,
      status: 'pending',
    }).select().single();
    if (createDonation.error) return console.log(createDonation.error);

    router.push({ pathname: 'main' });
    // console.log(showName, courier, values, donationPostId);
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
      <Stack.Screen options={{ headerTitle: 'Donasi Sekarang' }} />
      <Formik
        validationSchema={UserMakeDonationYupSchema}
        enableReinitialize={true}
        initialValues={{
          resi: '',
          desc: '',
        }}
        onSubmit={handleUserMakeDonation}
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
              <Text className="text-gray-500">Tampilkan Nama Pendonasi</Text>
              <View className="flex-row space-x-2 mt-1">
                {toggles.map((toogle, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setToggles([...toggles.map((tog) => ({
                        title: tog.title,
                        is_active: tog.title == toogle.title ? true : false
                      }))]);
                      setShowName(toogle == 'Tampilkan' ? true : false);
                    }}
                    style={{ backgroundColor: toogle.is_active ? '#12674a' : '#d1d5db' }}
                    className="flex-1 px-4 py-2 rounded">
                    <Text
                      style={{ color: toogle.is_active ? '#ffffff' : '#6b7280' }}
                      className="text-xs text-center font-semibold">{toogle.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Pilih Kurir Pengiriman</Text>
              <View className="flex-row space-x-2 mt-1">
                {couriers.map((courier, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setCouriers([...couriers.map((tog) => ({
                        code: tog.code,
                        title: tog.title,
                        is_active: tog.title == courier.title ? true : false
                      }))]);
                      setCourier(courier.code);
                    }}
                    style={{ backgroundColor: courier.is_active ? '#12674a' : '#d1d5db' }}
                    className="flex-1 px-4 py-2 rounded">
                    <Text
                      style={{ color: courier.is_active ? '#ffffff' : '#6b7280' }}
                      className="text-xs text-center font-semibold">{courier.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Resi Pengiriman</Text>
              <TextInput
                onChangeText={handleChange('resi')}
                value={values.resi}
                className="border-b border-gray-500" placeholder="Masukkan resi pengiriman" />
              {errors.resi && touched.resi ? <ErrorInputMessage message={errors.resi} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Tuliskan doa dan berikan dukungan</Text>
              <TextInput
                onChangeText={handleChange('desc')}
                value={values.desc}
                style={{ height: 100, textAlignVertical: 'top' }}
                numberOfLines={10}
                multiline={true}
                className="border-b border-gray-500 mt-1" placeholder="Tuliskan doa untuk penggalang donasi atau dirimu sendiri disini, Biarkan doa kamu bisa dilihat dan memberikan semangat ke #kawanhijau lainya." />
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