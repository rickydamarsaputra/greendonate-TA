import { Tabs } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { OrgCardFull } from '../../components';

export default function organization() {
  const organization = [
    {
      id: 1,
      title: 'PMI Surabaya',
      cover: require('../../assets/default-banner.png'),
    },
    {
      id: 2,
      title: 'Rumah Zakat',
      cover: require('../../assets/default-banner.png'),
    },
    {
      id: 3,
      title: 'Cinta Dakwah Indonesia',
      cover: require('../../assets/default-banner.png'),
    },
    {
      id: 4,
      title: 'PMI Surabaya',
      cover: require('../../assets/default-banner.png'),
    },
    {
      id: 5,
      title: 'Rumah Zakat',
      cover: require('../../assets/default-banner.png'),
    },
    {
      id: 6,
      title: 'Cinta Dakwah Indonesia',
      cover: require('../../assets/default-banner.png'),
    },
  ];

  return (
    <View className="relative flex-1 bg-gray-100 px-4">
      <Tabs.Screen
        options={{
          headerTitle: 'Organisasi Yang Terdaftar',
        }}
      />

      {/* LIST ORGANIZATION */}
      <ScrollView
        className="my-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {organization.map((item) => <OrgCardFull key={item.id} item={item} />)}
      </ScrollView>
      {/* LIST ORGANIZATION */}
    </View>
  );
}