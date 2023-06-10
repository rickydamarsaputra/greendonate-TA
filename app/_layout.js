import { Stack, useRouter } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#12674a' },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Entypo name="chevron-thin-left" size={24} color="white" />
          </TouchableOpacity>
        )
      }}
    >
      <Stack.Screen name="main" options={{ headerShown: false }} />
    </Stack>
  );
};