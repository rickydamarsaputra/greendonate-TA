import { Tabs } from 'expo-router';
import { Text, ScrollView, Image } from 'react-native';

export default function about() {
  return (
    <ScrollView
      className="flex-1 bg-gray-100 px-4"
      showsVerticalScrollIndicator={false}
    >
      <Tabs.Screen
        options={{
          headerTitle: 'Tentang GreenDonate',
        }}
      />

      <Image source={require('../../assets/logo-rounded.png')} className="w-[75px] h-[75px] mt-4 self-center" />
      <Text className="text-lg text-primary-500 font-bold mt-4">Platform donasi yang mendukung{'\n'}konsep Zero Waste</Text>
      <Text className="leading-5 text-justify text-gray-500 mt-2">
        Greendonate adalah aplikasi mobile yang memfasilitasi donasi barang bekas dan mendukung konsep zero waste di Indonesia. Aplikasi ini bertujuan untuk meningkatkan kesadaran masyarakat tentang pentingnya mengurangi limbah dengan memberikan platform yang mudah diakses dan terpercaya untuk mendonasikan barang bekas yang masih dapat digunakan. Dengan antarmuka yang intuitif dan fitur pencarian yang canggih, Greendonate memudahkan pengguna dalam mencari penerima donasi di sekitar mereka. Selain itu, aplikasi ini juga menawarkan fitur pelacakan donasi, memberikan transparansi kepada pengguna mengenai penggunaan barang bekas mereka. Melalui Greendonate, diharapkan masyarakat Indonesia dapat aktif berpartisipasi dalam mengurangi limbah dan menciptakan lingkungan yang lebih bersih dan berkelanjutan.
      </Text>
      <Text className="leading-5 text-justify text-gray-500 mt-4">
        Dengan Greendonate, mengurangi limbah dan menerapkan konsep zero waste menjadi lebih mudah dan efisien. Aplikasi ini memungkinkan pengguna untuk dengan cepat dan efektif mendonasikan barang-barang bekas yang masih memiliki nilai dan manfaat kepada mereka yang membutuhkannya. Dengan adanya Greendonate, diharapkan kesadaran masyarakat tentang pentingnya konsep zero waste dalam mengurangi produksi limbah akan meningkat. Aplikasi ini juga membantu mengatasi tantangan kurangnya platform donasi barang bekas yang dapat diakses oleh masyarakat. Dengan demikian, Greendonate berperan dalam menciptakan lingkungan yang lebih sehat, mempromosikan ekonomi berkelanjutan, dan memberikan kesempatan kepada setiap orang untuk berkontribusi dalam mengurangi limbah.
      </Text>
    </ScrollView>
  );
}