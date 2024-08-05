import { BlockType } from "@/constants/GameProps";
import { useGameContext } from "@/contexts/GameProvider";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import BlockQueue from "./BlockQueue";
import Colors from "@/constants/Colors";

interface GameBoardProps {}

const GameBoard: React.FC<GameBoardProps> = ({}) => {
  const boardRef = useRef<View>(null);
  const { boardWidth } = useGameContext();
  const { board } = useGameContext();

  return (
    <View ref={boardRef} style={[styles.blockContainer, { width: boardWidth }]}>
      {board?.map((row, rowIndex) => (
        <View key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <View
              style={{ borderWidth: 1, borderColor: "#ffffff59" }}
              key={cellIndex}
            >
              {cell?.getElement()}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  blockContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ffffff59",
    borderWidth: 1,
    borderColor: "#6295e669",
  },
});

export default GameBoard;
