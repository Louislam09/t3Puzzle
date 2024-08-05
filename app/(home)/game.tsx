import Block from "@/classes/Block";
import BlockQueue from "@/components/BlockQueue";
import GameBoard from "@/components/GameBoard";
import ScoreDisplay from "@/components/ScoreDisplay";
import { Text } from "@/components/Themed";
import { BLOCKS, BlockType, getColor } from "@/constants/GameProps";
import { useGameContext } from "@/contexts/GameProvider";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Colors from "@/constants/Colors";
import { useScore } from "@/contexts/ScoreProvider";

export default function Game() {
  const { cellSize, removeFromQueue, board, setBoard } = useGameContext();

  const scorer = useScore();

  const handleDragStart = (blockType: number) => {
    // setCurrentBlock?.(blockType);
  };

  const getBoardPosition = (x: number, y: number) => {
    const initY = 178;
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

  // const checkAndUpdateBoard = () => {
  //   const newBoard = [...board];
  //   const emptyBlockValue = 0;
  //   const highlightColor = "#4444FF30";
  //   let lineCompleted = false;

  //   for (let i = 0; i < newBoard.length; i++) {
  //     const colItems = newBoard[i];
  //     const rowItems = newBoard.map((row) => row[i]);
  //     const isColFilled = colItems.every((block) => block.value);
  //     const isRowFilled = rowItems.every((block) => block.value);
  //     lineCompleted = isRowFilled || isColFilled;

  //     if (isColFilled) {
  //       scorer.completeLine();
  //       colItems.forEach((block) =>
  //         block.setColor(highlightColor, emptyBlockValue)
  //       );
  //     }
  //     if (isRowFilled) {
  //       scorer.completeLine();
  //       rowItems.forEach((block) =>
  //         block.setColor(highlightColor, emptyBlockValue)
  //       );
  //     }
  //   }

  //   if (!lineCompleted) {
  //     scorer.resetCombo();
  //   }
  // };

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
      // checkAndUpdateBoard();
    } else {
      console.log("Block cannot be placed at the given position");
    }
    return canMove;
  };

  return (
    <View style={styles.container}>
      <ScoreDisplay />
      <View style={styles.gameArea}>
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
  },
  gameArea: {
    width: "100%",
    alignItems: "center",
    gap: 15,
    justifyContent: "space-between",
  },
});
