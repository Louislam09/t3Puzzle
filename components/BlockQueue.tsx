import React from "react";
import { View, StyleSheet } from "react-native";
import DraggableBlock from "./DraggableBlock";
import { BLOCK_SIZE } from "@/constants/GameProps";
import { useGameContext } from "@/contexts/GameProvider";

interface BlockQueueProps {
  nextBlocks: number[];
  onDragStart: (blockType: number) => void;
  onDrop: (
    blockType: number,
    position: {
      x: number;
      y: number;
    }
  ) => void;
}

const rows = 5;

const BlockQueue: React.FC<BlockQueueProps> = ({
  nextBlocks,
  onDragStart,
  onDrop,
}) => {
  const { rowNumber, cellSize } = useGameContext();
  return (
    <View style={[styles.container, { height: cellSize * 4 }]}>
      {nextBlocks?.map((blockType, index) => (
        <DraggableBlock
          key={index}
          blockType={blockType}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#000033",
    borderWidth: 2,
    borderColor: "#4444FF90",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    // height: rows * BLOCK_SIZE,
  },
});

export default BlockQueue;
