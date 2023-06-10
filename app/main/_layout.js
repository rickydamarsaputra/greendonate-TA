import { Tabs, useRouter } from "expo-router";
import { Entypo, Octicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default () => {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#12674a' },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Entypo name="chevron-thin-left" size={24} color="white" />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: '#105e43',
        tabBarStyle: {
          elevation: 0,
          shadowOffset: {
            width: 0, height: 0
          },
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
      }}
    >

      {/* MAIN ROUTE */}
      <Tabs.Screen name="index"
        options={{
          tabBarLabel: 'Donasi',
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={24} color={color} />
          ),
        }}
      />

      {/* MY DONATION ROUTE */}
      <Tabs.Screen name="my_donation"
        options={{
          headerLeft: null,
          tabBarLabel: 'Donasi Saya',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="donate" size={24} color={color} />
          ),
        }}
      />

      {/* INBOX ROUTE */}
      <Tabs.Screen name="inbox"
        options={{
          headerLeft: null,
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color }) => (
            <Octicons name="bell" size={24} color={color} />
          ),
        }}
      />

      {/* ACCOUNT ROUTE */}
      <Tabs.Screen name="account"
        options={{
          headerLeft: null,
          tabBarLabel: 'Akun',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}