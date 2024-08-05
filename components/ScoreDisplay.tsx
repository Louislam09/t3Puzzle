import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./Themed";
import { useGameContext } from "@/contexts/GameProvider";
import { useScore } from "@/contexts/ScoreProvider";

interface ScoreDisplayProps {}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({}) => {
  const scorer = useScore();
  const score = scorer.score;

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
