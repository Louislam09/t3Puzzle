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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      {/* <Text style={{ fontSize: 24 }}>Home Screen</Text> */}
      <TouchableOpacity
        onPress={() => {
          resetGame();
          initBoard();
          router.push("/Game");
        }}
        style={{
          backgroundColor: "red",
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
          paddingHorizontal: 15,
        }}
      >
        <Text style={{ fontSize: 24, textTransform: "uppercase" }}>Start</Text>
      </TouchableOpacity>
      {/* <Redirect href={"/game"} /> */}
    </View>
  );
}
