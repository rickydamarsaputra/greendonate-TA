import { Text, View } from "react-native";

export default function ErrorInputMessage({ message }) {
  return (
    <View>
      <Text className="text-red-500">{message}</Text>
    </View>
  );
}