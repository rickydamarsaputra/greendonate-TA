import { Stack, useRouter } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useEffect } from "react";
import supabase from "../lib/supabase";

export default () => {
  const router = useRouter();
  useEffect(() => {
    async function getUser() {
      const currentUserLogin = await supabase.auth.getUser();
      if (!currentUserLogin.error) return router.replace({ pathname: 'main' });
    }

    getUser();
  }, []);

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