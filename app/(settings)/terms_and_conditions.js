import { Tabs } from 'expo-router';
import { View, Text, ScrollView, Image } from 'react-native';

export default function termsAndConditions() {
  return (
    <ScrollView
      className="flex-1 bg-gray-100 px-4"
      showsVerticalScrollIndicator={false}
    >
      <Tabs.Screen
        options={{
          headerTitle: 'Syarat dan Ketentuan',
        }}
      />

      <Text className="text-lg text-primary-500 font-bold mt-4">Syarat dan Ketentuan GreenDonate</Text>
      <Text className="leading-5 text-justify text-gray-500 mt-2">
        Pengguna Greendonate diharapkan membaca, memahami, dan setuju dengan Syarat dan Ketentuan ini sebelum menggunakan aplikasi. Greendonate berhak untuk memperbarui atau mengubah Syarat dan Ketentuan ini tanpa pemberitahuan sebelumnya. Pengguna diharapkan memeriksa Syarat dan Ketentuan secara berkala untuk memastikan bahwa mereka tetap mematuhi peraturan yang berlaku.
      </Text>
      <Text className="leading-5 text-justify text-gray-800 mt-4">1. Penerimaan Donasi:</Text>
      <Text className="leading-5 text-justify text-gray-500 ml-4">
        a. Greendonate hanya menerima donasi barang bekas yang masih layak pakai dan memiliki nilai serta manfaat bagi penerima. {'\n'}b. Donatur bertanggung jawab untuk memberikan informasi yang akurat dan jelas mengenai kondisi barang yang akan didonasikan. {'\n'}c. Greendonate berhak menolak donasi yang tidak memenuhi persyaratan atau tidak sesuai dengan kebijakan penerima donasi.
      </Text>
      <Text className="leading-5 text-justify text-gray-800 mt-4">2. Pencarian Penerima Donasi:</Text>
      <Text className="leading-5 text-justify text-gray-500 ml-4">
        a. Greendonate menyediakan fitur pencarian yang memungkinkan pengguna untuk mencari penerima donasi berdasarkan kategori barang, wilayah, atau jenis organisasi. {'\n'}b. Informasi tentang penerima donasi ditampilkan untuk memberikan gambaran yang jelas mengenai kebutuhan dan tujuan donasi.
      </Text>
      <Text className="leading-5 text-justify text-gray-800 mt-4">3. Pelacakan Donasi:</Text>
      <Text className="leading-5 text-justify text-gray-500 ml-4">
        a. Greendonate memberikan fitur pelacakan donasi yang memungkinkan pengguna untuk memantau status dan penggunaan barang bekas yang telah didonasikan. {'\n'}b. Greendonate berusaha memberikan pembaruan yang akurat dan tepat waktu kepada pengguna mengenai penerimaan dan penggunaan donasi.
      </Text>
      <Text className="leading-5 text-justify text-gray-800 mt-4">4. Tanggung Jawab Pengguna:</Text>
      <Text className="leading-5 text-justify text-gray-500 ml-4">
        a. Pengguna Greendonate bertanggung jawab atas kebenaran informasi yang diberikan dan akibat dari donasi yang mereka berikan. {'\n'}b. Pengguna diharapkan mengikuti aturan dan peraturan yang berlaku dalam melakukan donasi, serta menghormati hak-hak dan privasi penerima donasi.
      </Text>
      <Text className="leading-5 text-justify text-gray-800 mt-4">5. Penggunaan Data Pribadi:</Text>
      <Text className="leading-5 text-justify text-gray-500 ml-4">
        a. Greendonate akan melindungi data pribadi pengguna sesuai dengan kebijakan privasi yang berlaku. {'\n'}b. Greendonate dapat menggunakan data pribadi pengguna untuk kepentingan internal, termasuk pembaruan informasi donasi dan pengembangan layanan.
      </Text>
      <Text className="leading-5 text-justify text-gray-800 mt-4">6. Penolakan Tanggung Jawab:</Text>
      <Text className="leading-5 text-justify text-gray-500 ml-4 mb-4">
        a. Greendonate tidak bertanggung jawab atas kerugian atau kerusakan yang timbul akibat penggunaan aplikasi atau kesalahan informasi yang diberikan. {'\n'}b. Greendonate tidak bertanggung jawab atas ketidaksesuaian donasi dengan harapan atau kebutuhan penerima donasi.
      </Text>
    </ScrollView>
  );
}