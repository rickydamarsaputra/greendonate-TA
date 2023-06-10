import { useState } from 'react';
import { Link, Stack } from "expo-router";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

export default function index() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const contents = [
		{
			id: 1,
			title: 'Solusi Donasi Barang Bekas yang Efisien',
			subtitle: 'Mengubah donasi barang bekas menjadi efisien dan berkelanjutan untuk kebaikan bersama',
			image: require('../assets/onboarding/slide_1.png'),
		},
		{
			id: 2,
			title: 'Mengurangi Dampak Negatif dengan Konsep Zero Waste',
			subtitle: 'Menghentikan limbah, memulai perubahan. Konsep Zero Waste untuk mengurangi dampak negatif',
			image: require('../assets/onboarding/slide_2.png'),
		},
		{
			id: 3,
			title: 'Permudah Berbagi dengan Sesama',
			subtitle: 'Donasimu akan dikelola oleh organisasi yang tepat dan aman penyalurannya',
			image: require('../assets/onboarding/slide_3.png'),
		},
	];

	return (
		<View className="flex-1">
			<Stack.Screen options={{ headerShown: false }} />

			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				data={contents}
				onScroll={(e) => {
					const currentIndex = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
					setCurrentSlide(currentIndex);
				}}
				renderItem={({ item }) => (
					<ImageBackground source={item.image} className="relative flex-1 items-center justify-between w-screen">
						<Text className="text-4xl font-bold text-primary-600 mt-20 z-50">GreenDonate</Text>
						<View className="w-[90%] mb-10 z-50">
							<Text className="text-lg text-white text-center font-semibold">{item.title}</Text>
							<Text className="text-md text-white/80 text-center mt-2">{item.subtitle}</Text>
							<View className="flex-row justify-center space-x-1 my-5">
								{contents.map((_, index) => (
									<View key={index} className={`${index == currentSlide ? 'w-5 bg-primary-600' : 'w-3 bg-secondary-600'} h-3 transition-all duration-300 rounded-full`}></View>
								))}
							</View>
							<TouchableOpacity
								className="py-4 rounded-md bg-primary-600 mb-2">
								<Link href={{ pathname: 'login' }} className="text-md text-white text-center font-semibold">Mulai berdonasi!</Link>
							</TouchableOpacity>
							<TouchableOpacity className="py-4 rounded-md bg-secondary-600">
								<Link href={{ pathname: 'main' }} className="text-md text-primary-600 text-center font-semibold">Ingin membuka donasi?</Link>
							</TouchableOpacity>
						</View>
						<View className="absolute top-0 right-0 bottom-0 left-0 bg-black/50" />
					</ImageBackground>
				)} />
		</View>
	);
}
