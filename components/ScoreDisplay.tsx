import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./Themed";

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
      <View style={styles.score}>
        <Text style={{ fontWeight: "bold" }}>SCORE</Text>
        <Text style={styles.text}>{`${score < 10 ? "0" + score : score}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    marginBottom: 10,
  },
  score: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default ScoreDisplay;
