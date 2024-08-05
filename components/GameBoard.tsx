import { BlockType } from "@/constants/GameProps";
import { useGameContext } from "@/contexts/GameProvider";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import BlockQueue from "./BlockQueue";

interface GameBoardProps {
  nextBlocks: number[];
  onDragStart: any;
  onDrop: any;
}

const GameBoard: React.FC<GameBoardProps> = ({
  nextBlocks,
  onDragStart,
  onDrop,
}) => {
  const boardRef = useRef<View>(null);
  const { boardWidth } = useGameContext();
  const { board } = useGameContext();

  return (
    <View ref={boardRef} style={[styles.blockContainer, { width: boardWidth }]}>
      {board?.map((row, rowIndex) => (
        <View key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <View key={cellIndex}>{cell?.getElement()}</View>
          ))}
        </View>
      ))}
      {/* <BlockQueue
        nextBlocks={nextBlocks}
        onDragStart={onDragStart}
        onDrop={onDrop}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  blockContainer: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    backgroundColor: "#000033",
    borderWidth: 2,
    borderColor: "#4444FF90",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    borderWidth: 1,
    borderColor: "#4444FF30",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GameBoard;
