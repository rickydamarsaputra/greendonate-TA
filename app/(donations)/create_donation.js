import { AntDesign, FontAwesome, Octicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import ErrorInputMessage from '../../components/ErrorInputMessage';
import supabase from '../../lib/supabase';
import slug from 'slug';
import { decode } from 'base64-arraybuffer';
import CreateDonationPostYupSchema from '../../schema/CreateDonationPostYupSchema';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function createDonation() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  // const [proposal, setProposal] = useState(null);

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

    const admin = await supabase.from('users').select().eq('role', 'admin').single();
    if (admin.error) return console.log(admin.error);

    const donationPost = await supabase.from('donation_posts').insert({
      organization_id: user.data.organization_id,
      name: values.name,
      desc: values.desc,
      // required_amount: values.required_amount,
      goods_criteria: values.goods_criteria,
      banner_img: storageGetUrl.data.publicUrl,
      status: 'Menunggu Validasi Organisasi',
      ended_at: date,
    });
    if (donationPost.error) return console.log(donationPost.error);

    const notification = await supabase.from('notifications').insert({
      user_id: user.data.id,
      role: user.data.role,
      message: `Berhasil membuat postingan donasi ${values.name}, menunggu validasi admin`
    }).single();
    if (notification.error) return console.log(notification.error);

    const notificationToAdmin = await supabase.from('notifications').insert({
      user_id: admin.data.id,
      role: admin.data.role,
      message: 'Postingan donasi baru, menunggu validasi'
    }).single();
    if (notificationToAdmin.error) return console.log(notificationToAdmin.error);

    console.log(notification.data);
    router.push({ pathname: 'raise_donation' });
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

  // const pickProposal = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await DocumentPicker.getDocumentAsync({
  //     copyToCacheDirectory: false
  //   });

  //   if (result.type != 'cancel') {
  //     const base64File = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
  //     console.log(base64File);

  //     setProposal({
  //       filename: result.name,
  //       uri: result.uri,
  //       base64: base64File
  //     });
  //   }
  // };

  return (
    <View className="flex-1 px-4 mb-5">
      <Stack.Screen options={{ headerTitle: 'Buat Donasi' }} />
      <Formik
        enableReinitialize={true}
        validationSchema={CreateDonationPostYupSchema}
        initialValues={{
          name: '',
          desc: '',
          // required_amount: '',
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
              <Text className="text-gray-500">Nama Program Donasi</Text>
              <TextInput
                onChangeText={handleChange('name')}
                value={values.name}
                className="border-b border-gray-500" placeholder="Masukkan nama program donasi" />
              {errors.name && touched.name ? <ErrorInputMessage message={errors.name} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Deskripsi Program Donasi</Text>
              <TextInput
                onChangeText={handleChange('desc')}
                value={values.desc}
                style={{ height: 100, textAlignVertical: 'top' }}
                numberOfLines={10}
                multiline={true}
                className="border-b border-gray-500 mt-1" placeholder="Masukkan deskripsi program donasi" />
              {errors.desc && touched.desc ? <ErrorInputMessage message={errors.desc} /> : null}
            </View>
            {/* <View className="mt-4">
              <Text className="text-gray-500">Jumlah Barang</Text>
              <TextInput
                onChangeText={handleChange('required_amount')}
                value={values.required_amount}
                keyboardType="numeric"
                numberOfLines={2}
                multiline={true}
                className="border-b border-gray-500 py-1" placeholder="Masukkan jumlah barang yang dibutuhkan dalam program donasi" />
              {errors.required_amount && touched.required_amount ? <ErrorInputMessage message={errors.required_amount} /> : null}
            </View> */}
            <View className="mt-4">
              <Text className="text-gray-500">Kriteria Barang Donasi</Text>
              <TextInput
                onChangeText={handleChange('goods_criteria')}
                value={values.goods_criteria}
                style={{ height: 100, textAlignVertical: 'top' }}
                numberOfLines={10}
                multiline={true}
                className="border-b border-gray-500" placeholder="Masukkan kriteria barang donasi" />
              {errors.goods_criteria && touched.goods_criteria ? <ErrorInputMessage message={errors.goods_criteria} /> : null}
            </View>
            <View className="mt-4">
              <Text className="text-gray-500">Tanggal Program Donasi Berakhir</Text>
              <View className="flex-row items-center space-x-2 mt-2">
                <TouchableOpacity
                  onPress={() => setDatePicker(true)}
                  className="w-[40px] h-[40px] justify-center items-center rounded-full bg-primary-500"
                >
                  <FontAwesome name="calendar-o" size={21} color="white" />
                </TouchableOpacity>
                <Text className="text-gray-800">{moment(date).format('D/M/Y')}</Text>
                {datePicker && (
                  <DateTimePicker
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    minimumDate={new Date()}
                    onChange={(event, value) => {
                      setDate(value);
                      setDatePicker(false);
                    }}
                  />
                )}
              </View>
            </View>
            {/* <View className="mt-4">
              <Text className="text-gray-500">Upload Proposal Program Donasi</Text>
              <View className="flex-row items-center space-x-2 mt-2">
                <TouchableOpacity
                  className="w-[40px] h-[40px] justify-center items-center rounded-full bg-primary-500"
                  onPress={pickProposal}
                >
                  <AntDesign name="addfile" size={21} color="white" />
                </TouchableOpacity>
                <Text className="text-gray-800">{proposal?.filename}</Text>
              </View>
            </View> */}
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