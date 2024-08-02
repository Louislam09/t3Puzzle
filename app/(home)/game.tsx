import BlockQueue from "@/components/BlockQueue";
import GameBoard from "@/components/GameBoard";
import ScoreDisplay from "@/components/ScoreDisplay";
import {
  Block,
  BLOCK_SIZE,
  BLOCKS,
  BOARD_ROWS_COLS,
  createEmptyBoard,
  generateNextBlocks,
} from "@/constants/GameProps";
import { useGameContext } from "@/contexts/GameProvider";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  PanResponder,
  useWindowDimensions,
} from "react-native";

export default function Game() {
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  // const [board, setBoard] = useState<number[][]>(
  //   createEmptyBoard(BOARD_ROWS_COLS)
  // );
  const [nextBlocks, setNextBlocks] = useState<number[]>(generateNextBlocks());
  const [currentBlock, setCurrentBlock] = useState<Block | null>(null);
  // const [blockPosition, setBlockPosition] = useState<{
  //   row: number;
  //   col: number;
  // } | null>(null);
  useEffect(() => {
    setNextBlocks(generateNextBlocks());
  }, []);

  const handleDragStart = (blockType: number) => {
    console.log({ blockType });
    setCurrentBlock(BLOCKS[blockType]);
  };

  const [board, setBoard] = useState<number[][]>(
    Array(BOARD_ROWS_COLS).fill(Array(BOARD_ROWS_COLS).fill(0))
  );
  const getBoardPosition = (x: number, y: number) => {
    const row = Math.floor(Math.abs(y) / BLOCK_SIZE);
    const col = Math.floor(Math.abs(x) / BLOCK_SIZE);
    return { row, col };
  };

  const canPlaceBlock = (
    board: number[][],
    blockShape: number[][],
    row: number,
    col: number
  ) => {
    for (let i = 0; i < blockShape.length; i++) {
      for (let j = 0; j < blockShape[i].length; j++) {
        if (blockShape[i][j] === 1) {
          const boardRow = row + i;
          const boardCol = col + j;

          if (
            boardRow < 0 ||
            boardRow >= board.length ||
            boardCol < 0 ||
            boardCol >= board[0].length ||
            board[boardRow][boardCol] !== 0
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placeBlock = (
    board: number[][],
    blockShape: number[][],
    row: number,
    col: number
  ) => {
    const newBoard = [...board];
    for (let i = 0; i < blockShape.length; i++) {
      for (let j = 0; j < blockShape[i].length; j++) {
        if (blockShape[i][j] === 1) {
          newBoard[row + i][col + j] = blockShape[i][j];
        }
      }
    }
    return newBoard;
  };

  const handleBlockDrop = (
    blockType: number,
    position: { x: number; y: number }
  ) => {
    const { row, col } = getBoardPosition(position.x, position.y);
    const blockShape = BLOCKS[blockType];
    console.log(row, col, blockShape);

    // if (canPlaceBlock(board, blockShape, row, col)) {
    //   const newBoard = placeBlock(board, blockShape, row, col);
    //   setBoard(newBoard);
    // } else {
    //   console.log("Block cannot be placed at the given position");
    // }
  };

  return (
    <View style={styles.container}>
      <ScoreDisplay score={score} highScore={highScore} />
      <View style={styles.gameArea}>
        <GameBoard board={board} />
        <BlockQueue
          nextBlocks={nextBlocks}
          onDragStart={handleDragStart}
          onDrop={handleBlockDrop}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  gameArea: {
    width: "100%",
    alignItems: "center",
    gap: 15,
    justifyContent: "space-between",
  },
});
