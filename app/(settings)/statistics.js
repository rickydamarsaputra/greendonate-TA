import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { ChartKit } from '../../components';
import { LineChart } from "react-native-chart-kit";
import supabase from '../../lib/supabase';
import moment from 'moment/moment';

export default function statistics() {
  const [currentYear, setCurrentYear] = useState(moment().format('Y'));
  const [donationsChartData, setDonationsChartData] = useState([
    {
      month: 'January',
      amount: 0,
    },
    {
      month: 'February',
      amount: 0,
    },
    {
      month: 'March',
      amount: 0,
    },
    {
      month: 'April',
      amount: 0,
    },
    {
      month: 'May',
      amount: 0,
    },
    {
      month: 'June',
      amount: 0,
    },
    {
      month: 'July',
      amount: 0,
    },
    {
      month: 'August',
      amount: 0,
    },
    {
      month: 'September',
      amount: 0,
    },
    {
      month: 'October',
      amount: 0,
    },
    {
      month: 'November',
      amount: 0,
    },
    {
      month: 'December',
      amount: 0,
    },
  ]);

  useEffect(() => {
    async function getDonationsChartData() {
      const { data, error } = await supabase.rpc('count_donations_at_month_and_group_by_with_year', { year: currentYear });
      if (error) return console.log(error.message);

      setDonationsChartData([...data]);
      console.log(data, currentYear);
    }

    getDonationsChartData();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-gray-100 px-4"
      showsVerticalScrollIndicator={false}
    >
      <Tabs.Screen
        options={{
          headerTitle: 'Statistika Greendonate',
        }}
      />

      <View className="mt-4">
        <Text className="text-lg text-primary-500 font-bold mb-2">Donasi Bulanan</Text>
        <ChartKit dataChart={donationsChartData} />
      </View>
      <View className="mt-4">
        <Text className="text-lg text-primary-500 font-bold mb-2">Pengguna Bulanan</Text>
        <ChartKit dataChart={donationsChartData} />
      </View>
    </ScrollView>
  );
}