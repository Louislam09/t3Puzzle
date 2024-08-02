import { BLOCK_SIZE, BOARD_ROWS_COLS } from "@/constants/GameProps";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import { Text } from "./Themed";
import { useGameContext } from "@/contexts/GameProvider";

interface GameBoardProps {
  board: number[][];
}

const RenderCell = ({ rowIndex, cellIndex, cellSize, cell, board }: any) => {
  const elementRef = useRef<TouchableOpacity>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePress = () => {
    elementRef.current?.measure((fx, fy, width, height, px, py) => {
      // fx, fy are relative to the parent
      // px, py are relative to the screen
      console.log("RenderCell", { fx, fy, px, py, width, height });
      setPosition({ x: px, y: py });
    });
  };

  return (
    <TouchableOpacity ref={elementRef} onPress={handlePress}>
      <View
        style={[
          styles.cell,
          {
            backgroundColor: cell ? getColor(cell) : "transparent",
            width: cellSize,
            height: cellSize,
          },
        ]}
      >
        {/* {board.length - 1 === rowIndex && (
          <Text>{`${rowIndex} , ${cellIndex}`}</Text>
        )} */}
      </View>
    </TouchableOpacity>
  );
};

const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  const boardRef = useRef<View>(null);
  const { cellSize, boardWidth } = useGameContext();

  return (
    <View ref={boardRef} style={[styles.container, { width: boardWidth }]}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <RenderCell
              key={`${rowIndex}-${cellIndex}`}
              {...{ rowIndex, cellIndex, cellSize, cell, board }}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const getColor = (value: number): string => {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
  ];
  return colors[value - 1] || "#FFFFFF";
};

const styles = StyleSheet.create({
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
