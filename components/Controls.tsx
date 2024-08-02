import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onRotate: () => void;
  onDrop: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  onMoveLeft,
  onMoveRight,
  onRotate,
  onDrop,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMoveLeft} style={styles.button}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onMoveRight} style={styles.button}>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRotate} style={styles.button}>
        <Ionicons name="refresh" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDrop} style={styles.button}>
        <Ionicons name="arrow-down" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#000033",
    borderWidth: 2,
    borderColor: "#4444FF90",
  },
  button: {
    padding: 10,
    backgroundColor: "#4444FF90",
    borderRadius: 5,
  },
});

export default Controls;
