import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { ChartKit } from '../../components';
import supabase from '../../lib/supabase';
import moment from 'moment/moment';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';

export default function statistics() {
  const [openYearFilter, setOpenYearFilter] = useState(false);
  const [currentYear, setCurrentYear] = useState(moment().format('Y'));
  const [filterYears, setFilterYears] = useState([]);
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
  const [usersChartData, setUsersChartData] = useState([
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
    async function getDonationsYears() {
      const { data, error } = await supabase.from('get_all_donation_years').select('*');
      if (error) return console.log(error.message);

      setFilterYears([...data.map((res) => ({
        label: res.year,
        value: res.year,
      }))]);

      // console.log(data);
    }

    getDonationsYears();
  }, []);

  useEffect(() => {
    async function getDonationsChartData() {
      const { data, error } = await supabase.rpc('count_donations_at_month_and_group_by_with_year', { year: currentYear });
      if (error) return console.log(error.message);

      setDonationsChartData([...donationsChartData.map(obj => data.find(o => o.month === obj.month) || obj)]);
      console.log(donationsChartData.map(obj => data.find(o => o.month === obj.month) || obj));
    }

    // async function getUsersChartData() {
    //   const { data, error } = await supabase.rpc('count_users_at_month_and_group_by_with_year', { year: currentYear });
    //   if (error) return console.log(error.message);

    //   setUsersChartData([...data]);
    //   console.log(data);
    // }

    getDonationsChartData();
    // getUsersChartData();
  }, [currentYear]);

  // useEffect(() => {
  //   console.log(currentYear);
  // }, [currentYear]);

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

      <View className="mt-4 z-[100]">
        <DropDownPicker
          open={openYearFilter}
          value={currentYear}
          items={filterYears}
          style={{ borderColor: '#12674a' }}
          setOpen={setOpenYearFilter}
          setValue={setCurrentYear}
          setItems={setFilterYears}
        />
      </View>

      <View className="mt-4">
        <Text className="text-lg text-primary-500 font-bold mb-2">
          Statistika Donasi Perbulan Pada Tahun {currentYear}
        </Text>

        {donationsChartData.map((data, index) => (
          <TouchableOpacity
            key={index} className="flex-row items-center justify-between bg-white rounded-lg shadow shadow-black/50 p-3 mb-4">
            <Text className="font-medium text-gray-500" numberOfLines={1}>
              {currentYear} {data.month} {data.amount} donasi
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* <View className="mt-4">
        <Text className="text-lg text-primary-500 font-bold mb-2">Donasi Bulanan</Text>
        <ChartKit dataChart={donationsChartData} />
      </View> */}
      {/* <View className="mt-4">
        <Text className="text-lg text-primary-500 font-bold mb-2">Pengguna Bulanan</Text>
        <ChartKit dataChart={usersChartData} />
      </View> */}
    </ScrollView>
  );
}