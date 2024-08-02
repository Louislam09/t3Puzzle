import { Text, View } from "@/components/Themed";
import { Redirect, useRouter } from "expo-router";
import { Button, TouchableOpacity } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => router.push("/game")}
        style={{ backgroundColor: "red", padding: 10, marginVertical: 10 }}
      >
        <Text style={{ fontSize: 20 }}>Start</Text>
      </TouchableOpacity>
      <Redirect href={"/game"} />
    </View>
  );
}
