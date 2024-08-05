//   const addRandomBlocksTwo = useCallback(
//     (count: number, set: React.Dispatch<React.SetStateAction<number[]>>) => {
//       const newBlocks = Array.from({ length: count }, () =>
//         Math.floor(Math.random() * BLOCKS.length)
//       );
//       set((prevBlocks) => [...prevBlocks, ...newBlocks]);
//     },
//     []
//   );

//   useEffect(() => {
//     if (nextBlocksTwo.length === 0) {
//       addRandomBlocks(1, setNextBlocksTwo);
//     }
//   }, [nextBlocksTwo, addRandomBlocks]);

// const addRandomBlocks = useCallback(
//   (count: number, set: React.Dispatch<React.SetStateAction<number[]>>) => {
//     const newBlocks = Array.from({ length: count }, () =>
//       Math.floor(Math.random() * BLOCKS.length)
//     );
//     set((prevBlocks) => [...prevBlocks, ...newBlocks]);
//   },
//   []
// );

// useEffect(() => {
//   if (nextBlocks.length === 0) {
//     addRandomBlocks(1, setNextBlocks);
//   }
// }, [nextBlocks, addRandomBlocks]);

// -----------
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { View, StyleSheet, TouchableOpacity } from "react-native";
// import DraggableBlock from "./DraggableBlock"; // Import DraggableBlock
// import { PropName, useGameContext } from "@/contexts/GameProvider";
// import { BLOCKS, BlockType, getColor } from "@/constants/GameProps";
// import Block from "@/classes/Block";

// interface BlockQueueProps {
//   nextBlocks: number[];
//   onDragStart: (blockType: number) => void;
//   onDrop: any;
// }

// const BlockQueue: React.FC<BlockQueueProps> = ({ onDragStart, onDrop }) => {
//   const { cellSize, blockShapes, nextBlocksObject } = useGameContext();
//   const {
//     one: blocksOne,
//     two: blocksTwo,
//     three: blocksThree,
//   } = nextBlocksObject;
//   const [queueBlocks, setQueueBlocks] = useState<typeof blockShapes>([]);
//   const [queueBlocksTwo, setQueueBlocksTwo] = useState<typeof blockShapes>([]);
//   const [queueBlocksThree, setQueueBlocksThree] = useState<typeof blockShapes>(
//     []
//   );
//   console.log(nextBlocksObject);

//   const [queueBlockOne] = queueBlocks as Block[];
//   const [queueBlockTwo] = queueBlocksTwo as Block[];
//   const [queueBlockThree] = queueBlocksThree as Block[];

//   useEffect(() => {
//     const blocks = blocksOne.map((block, index) => {
//       const blockShape = blockShapes[block];
//       const blockColor = blockShape.color;
//       blockShape.color = blockColor;
//       blockShape.queue = PropName.one;
//       const element = (
//         <DraggableBlock
//           key={index}
//           blockIndex={index}
//           blockShape={blockShape}
//           onDragStart={onDragStart}
//           onDrop={onDrop}
//         />
//       );
//       blockShape.setElement(block, element);
//       return blockShape;
//     });

//     setQueueBlocks(blocks);
//   }, [blocksOne]);
//   useEffect(() => {
//     const blocks = blocksTwo.map((block, index) => {
//       const blockShape = blockShapes[block];
//       const blockColor = blockShape.color;
//       blockShape.color = blockColor;
//       blockShape.queue = PropName.two;
//       const element = (
//         <DraggableBlock
//           key={index}
//           blockIndex={index}
//           blockShape={blockShape}
//           onDragStart={onDragStart}
//           onDrop={onDrop}
//         />
//       );
//       blockShape.setElement(block, element);
//       return blockShape;
//     });

//     setQueueBlocksTwo(blocks);
//   }, [blocksTwo]);
//   useEffect(() => {
//     const blocks = blocksThree.map((block, index) => {
//       const blockShape = blockShapes[block];
//       const blockColor = blockShape.color;
//       blockShape.color = blockColor;
//       blockShape.queue = PropName.three;
//       const element = (
//         <DraggableBlock
//           key={index}
//           blockIndex={index}
//           blockShape={blockShape}
//           onDragStart={onDragStart}
//           onDrop={onDrop}
//         />
//       );
//       blockShape.setElement(block, element);
//       return blockShape;
//     });

//     setQueueBlocksThree(blocks);
//   }, [blocksThree]);

//   return (
//     <View style={[styles.row, { height: cellSize * 4 }]}>
//       {queueBlockOne && (
//         <View style={{ marginLeft: cellSize }}>
//           {queueBlockOne.getElement()}
//         </View>
//       )}
//       {queueBlockTwo && (
//         <View style={{ marginLeft: cellSize }}>
//           {queueBlockTwo.getElement()}
//         </View>
//       )}
//       {queueBlockThree && (
//         <View style={{ marginLeft: cellSize }}>
//           {queueBlockThree.getElement()}
//         </View>
//       )}

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#000033",
//     borderWidth: 2,
//     borderColor: "#4444FF90",
//     width: "100%",
//   },
//   row: {
//     width: "100%",
//     flexDirection: "row",
//     borderColor: "#2a6f3c",
//     // justifyContent: "space-between",
//   },
//   cell: {
//     borderColor: "#4444FF90",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default BlockQueue;
