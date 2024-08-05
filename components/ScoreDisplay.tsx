import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "./Themed";
import { useGameContext } from "@/contexts/GameProvider";

interface ScoreDisplayProps {
  score: number;
  highScore: number;
  nextBlocks: any[];
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  highScore,
  nextBlocks,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Score: {score}</Text>
      <Text style={styles.text}>High Score: {highScore}</Text>
      <Text style={styles.text}>Remaining Block: {nextBlocks.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#000033",
    borderWidth: 2,
    borderColor: "#4444FF90",
    width: "100%",
    marginBottom: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default ScoreDisplay;
