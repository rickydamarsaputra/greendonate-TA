import { View, Text, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";

export default function ChartKit() {
  return (
    <View>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100)
              ]
            }
          ]
        }}
        width="360" // from react-native
        height={220}
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            strokeWidth: "2",
          }
        }}
        bezier
        style={{
          borderRadius: 10
        }}
      />
    </View>
  );
}