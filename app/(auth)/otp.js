import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Formik } from 'formik';

export default function otp() {
  const router = useRouter();
  const { otpCode } = useLocalSearchParams();

  const handleOTP = async (values) => {
    const enterOTP = values.num1 + values.num2 + values.num3 + values.num4 + values.num5 + values.num6;

    if (enterOTP == otpCode) {
      router.replace({ pathname: 'main' });
    } else {
      Alert.alert('OTP yang anda masukkan salah');
    }
  }

  return (
    <View className="flex-1 px-4">
      <Stack.Screen options={{ headerTitle: `Masukkan OTP`, headerLeft: () => <></>, }} />

      <View className="flex-row">
        <Text className="text-xl font-bold text-gray-800 mt-5">Masuk OTP berikut </Text>
        <Text className="text-xl font-bold text-primary-500 mt-5">{otpCode}</Text>
      </View>

      <Formik
        initialValues={{
          num1: '',
          num2: '',
          num3: '',
          num4: '',
          num5: '',
          num6: '',
        }}
        onSubmit={handleOTP}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
            <View className="self-center flex-row space-x-4 mt-10">
              <TextInput
                onChangeText={handleChange('num1')}
                value={values.num1}
                keyboardType={'numeric'}
                maxLength={1}
                className="text-center border-b border-gray-500" />
              <TextInput
                onChangeText={handleChange('num2')}
                value={values.num2}
                keyboardType={'numeric'}
                maxLength={1}
                className="text-center border-b border-gray-500" />
              <TextInput
                onChangeText={handleChange('num3')}
                value={values.num3}
                keyboardType={'numeric'}
                maxLength={1}
                className="text-center border-b border-gray-500" />
              <TextInput
                onChangeText={handleChange('num4')}
                value={values.num4}
                keyboardType={'numeric'}
                maxLength={1}
                className="text-center border-b border-gray-500" />
              <TextInput
                onChangeText={handleChange('num5')}
                value={values.num5}
                keyboardType={'numeric'}
                maxLength={1}
                className="text-center border-b border-gray-500" />
              <TextInput
                onChangeText={handleChange('num6')}
                value={values.num6}
                keyboardType={'numeric'}
                maxLength={1}
                className="text-center border-b border-gray-500" />
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              className="py-4 rounded-md bg-primary-600 mt-10">
              <Text className="text-md text-white text-center font-semibold">Lanjutkan</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
