import Block from "@/classes/Block";
import BlockQueue from "@/components/BlockQueue";
import GameBoard from "@/components/GameBoard";
import ScoreDisplay from "@/components/ScoreDisplay";
import { useGameContext } from "@/contexts/GameProvider";
import { useScore } from "@/contexts/ScoreProvider";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";

export default function Game() {
  const { cellSize, removeFromQueue, board, setBoard } = useGameContext();

  const scorer = useScore();
  const gameAreaYRef = useRef<number>(0);

  const handleDragStart = (blockType: number) => {};

  const getBoardPosition = (x: number, y: number) => {
    const initY = gameAreaYRef.current;
    const col = Math.round(Math.abs(x) / cellSize);
    const row = Math.floor((y - initY) / cellSize);
    return { col, row };
  };

  const canPlaceBlock = (blockShape: Block, row: number, col: number) => {
    const template = blockShape.template;

    for (let blockRow = 0; blockRow < template.length; blockRow++) {
      for (let blockCol = 0; blockCol < template[blockRow].length; blockCol++) {
        if (template[blockRow][blockCol] === 1) {
          const boardRow = row + blockRow;
          const boardCol = col + blockCol;
          if (
            boardRow < 0 ||
            boardRow >= board.length ||
            boardCol < 0 ||
            boardCol >= board[0].length ||
            board[boardCol][boardRow].value !== 0
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placeBlock = (blockShape: Block, row: number, col: number) => {
    const template = blockShape.template;
    const color = blockShape.color;
    const newBoard = [...board];
    for (let blockRow = 0; blockRow < template.length; blockRow++) {
      for (let blockCol = 0; blockCol < template[blockRow].length; blockCol++) {
        if (template[blockRow][blockCol] === 1) {
          const boardRow = row + blockRow;
          const boardCol = col + blockCol;
          const current = newBoard[boardCol][boardRow];
          current.setColor(color);
          scorer.placeBlock();
        }
      }
    }
    return newBoard;
  };

  const handleBlockDrop = (
    blockShape: Block,
    position: { x: number; y: number },
    blockIndex: number
  ) => {
    const { row, col } = getBoardPosition(position.x, position.y);
    const canMove = canPlaceBlock(blockShape, row, col);
    if (canMove) {
      const newBoard = placeBlock(blockShape, row, col);
      setBoard(newBoard);
      removeFromQueue(blockIndex, blockShape.queue);
    } else {
      console.log("Block cannot be placed at the given position");
    }
    return canMove;
  };

  return (
    <View style={styles.container}>
      <ScoreDisplay />
      <View
        style={styles.gameArea}
        onLayout={(env) => {
          const pos = env.nativeEvent?.layout;
          gameAreaYRef.current = pos.y;
        }}
      >
        <GameBoard
          {...{
            onDragStart: handleDragStart,
            onDrop: handleBlockDrop,
          }}
        />
        <BlockQueue onDragStart={handleDragStart} onDrop={handleBlockDrop} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#000",
  },
  gameArea: {
    width: "100%",
    alignItems: "center",
    gap: 15,
    justifyContent: "space-between",
  },
});
