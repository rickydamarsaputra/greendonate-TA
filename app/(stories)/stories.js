import { Tabs } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { StoryCardFull } from '../../components';

export default function stories() {
  const stories = [
    {
      id: 1,
      content: 'semoga bantuan ini dapat bermanfaat untuk penerimanya, dan untuk saya semoga bisa diberikan kelancaran dan kemudahan dalam penyelesaian kuliah, semoga bisa sidang tahun ini, semoga bisa lulus kuliah secepatnya, Aamiin Aamiin InsyaAllah',
      author: 'Ricky Damar Saputra',
      created_at: '8 menit yang lalu',
    },
    {
      id: 2,
      content: 'Ya Allah semoga MUSIBAH ANGIN PUTING BELIUNG yang menimpa Pesantren Yatim ini cepat terbangun kembali. Amiin',
      author: 'Kawan Hijau',
      created_at: '2 menit yang lalu',
    },
    {
      id: 3,
      content: 'INFAQ YATIM ini semoga bermanfaat buat biaya makan dan biaya hidup semua YATIM. Semoga banyak yg membantu amiin.',
      author: 'Kawan Hijau',
      created_at: '8 menit yang lalu',
    },
    {
      id: 4,
      content: 'Bismillah Semoga berkah & bermanfaat',
      author: 'Bambang Heriawan',
      created_at: '2 menit yang lalu',
    },
    {
      id: 5,
      content: 'semoga bantuan ini dapat bermanfaat untuk penerimanya, dan untuk saya semoga bisa diberikan kelancaran dan kemudahan dalam penyelesaian kuliah, semoga bisa sidang tahun ini, semoga bisa lulus kuliah secepatnya, Aamiin Aamiin InsyaAllah',
      author: 'Ricky Damar Saputra',
      created_at: '8 menit yang lalu',
    },
    {
      id: 6,
      content: 'Ya Allah semoga MUSIBAH ANGIN PUTING BELIUNG yang menimpa Pesantren Yatim ini cepat terbangun kembali. Amiin',
      author: 'Kawan Hijau',
      created_at: '2 menit yang lalu',
    },
    {
      id: 7,
      content: 'INFAQ YATIM ini semoga bermanfaat buat biaya makan dan biaya hidup semua YATIM. Semoga banyak yg membantu amiin.',
      author: 'Kawan Hijau',
      created_at: '8 menit yang lalu',
    },
    {
      id: 8,
      content: 'Bismillah Semoga berkah & bermanfaat',
      author: 'Bambang Heriawan',
      created_at: '2 menit yang lalu',
    },
  ];

  return (
    <View className="relative flex-1 bg-gray-100 px-4">
      <Tabs.Screen
        options={{
          headerTitle: 'Cerita Kawan Hijau',
        }}
      />

      {/* LIST STORY */}
      <ScrollView
        className="my-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {stories.map((item) => <StoryCardFull key={item.id} item={item} />)}
      </ScrollView>
      {/* LIST STORY */}
    </View>
  );
}