import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Formik } from 'formik';
import supabase from '../../lib/supabase';
import LoginYupSchema from '../../schema/LoginYupSchema';
import ErrorInputMessage from '../../components/ErrorInputMessage';

export default function login() {
  const router = useRouter();
  const { enterAs } = useLocalSearchParams();
  const [securePassword, setSecurePassword] = useState(true);

  const generateNumber = (n) => {
    let add = 1;
    let max = 12 - add;

    if (n > max) {
      return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    let min = max / 10;
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    return ("" + number).substring(add);
  }

  const handleLogin = async (values) => {
    const userLogin = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (userLogin.error) return Alert.alert(userLogin.error.message);

    router.replace({ pathname: 'otp', params: { otpCode: generateNumber(6) } });
  }

  return (
    <View className="flex-1 px-4">
      <Stack.Screen options={{ headerTitle: 'Masuk' }} />
      <Text className="text-xl font-bold text-gray-800 mt-5">Masuk untuk menikmati{'\n'}kemudahan berdonasi</Text>
      <Formik
        validationSchema={LoginYupSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
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
              onPress={handleSubmit}
              className="py-4 rounded-md bg-primary-600 mt-10">
              <Text className="text-md text-white text-center font-semibold">Lanjutkan</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-2 space-x-1">
              <Text className="text-gray-500 font-medium">Belum punya akun?</Text>
              <Link href={{ pathname: 'register', params: { enterAs } }} className="text-primary-500 font-medium">Daftar</Link>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}