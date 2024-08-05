import { Text, View } from "@/components/Themed";
import { useGameContext } from "@/contexts/GameProvider";
import { useScore } from "@/contexts/ScoreProvider";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Home() {
  const router = useRouter();
  const { initBoard, addRandomBlocks } = useGameContext() as any;
  const { resetGame } = useScore();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => {
          resetGame();
          initBoard();
          router.push("/game");
        }}
        style={{ backgroundColor: "red", padding: 10, marginVertical: 10 }}
      >
        <Text style={{ fontSize: 20 }}>Start</Text>
      </TouchableOpacity>
      {/* <Redirect href={"/game"} /> */}
    </View>
  );
}
