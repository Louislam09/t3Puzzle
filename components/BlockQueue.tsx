import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import DraggableBlock from "./DraggableBlock";
import { PropName, useGameContext } from "@/contexts/GameProvider";
import Block from "@/classes/Block";

interface BlockQueueProps {
  nextBlocks: number[];
  onDragStart: (blockType: number) => void;
  onDrop: any;
}

const BlockQueue: React.FC<BlockQueueProps> = ({ onDragStart, onDrop }) => {
  const { cellSize, blockShapes, nextBlocksObject } = useGameContext();
  const {
    one: blocksOne,
    two: blocksTwo,
    three: blocksThree,
  } = nextBlocksObject;

  const [queueBlocks, setQueueBlocks] = useState<Block[]>([]);
  const [queueBlocksTwo, setQueueBlocksTwo] = useState<Block[]>([]);
  const [queueBlocksThree, setQueueBlocksThree] = useState<Block[]>([]);

  const createBlocks = (blocks: number[], propName: PropName) => {
    return blocks.map((block, index) => {
      const blockShape = blockShapes[block];
      const blockColor = blockShape.color;
      blockShape.color = blockColor;
      blockShape.queue = propName;
      const element = (
        <DraggableBlock
          key={index}
          blockIndex={index}
          blockShape={blockShape}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />
      );
      blockShape.setElement(block, element);
      return blockShape;
    });
  };

  useEffect(() => {
    setQueueBlocks(createBlocks(blocksOne, PropName.one));
  }, [blocksOne]);

  useEffect(() => {
    setQueueBlocksTwo(createBlocks(blocksTwo, PropName.two));
  }, [blocksTwo]);

  useEffect(() => {
    setQueueBlocksThree(createBlocks(blocksThree, PropName.three));
  }, [blocksThree]);

  return (
    <View style={[styles.row, { height: cellSize * 4 }]}>
      {queueBlocks[0] ? (
        <View style={styles.cell}>{queueBlocks[0].getElement()}</View>
      ) : (
        <View style={{}} />
      )}
      {queueBlocksTwo[0] ? (
        <View style={[styles.cell, { marginHorizontal: cellSize }]}>
          {queueBlocksTwo[0].getElement()}
        </View>
      ) : (
        <View style={{}} />
      )}
      {queueBlocksThree[0] ? (
        <View style={styles.cell}>{queueBlocksThree[0].getElement()}</View>
      ) : (
        <View style={{}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    backgroundColor: "transparent",
  },
});

export default BlockQueue;
