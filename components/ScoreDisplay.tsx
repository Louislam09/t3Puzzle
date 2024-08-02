import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "./Themed";

interface ScoreDisplayProps {
  score: number;
  highScore: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, highScore }) => {
  return (
    <View style={styles.container}>
      <Text>ScoreDisplay</Text>
      {/* <Text style={styles.text}>Score: {score}</Text>
      <Text style={styles.text}>High Score: {highScore}</Text> */}
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
