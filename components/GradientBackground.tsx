import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientBackground = ({ children }: any) => {
  return (
    <LinearGradient
      colors={["#6295e690", "#6295e6", "#0f1561"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBackground;
