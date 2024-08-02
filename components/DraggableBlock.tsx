import React, { useRef } from "react";
import { View, StyleSheet, PanResponder, Animated } from "react-native";
import { BLOCKS } from "@/constants/GameProps";
import { useGameContext } from "@/contexts/GameProvider";

interface DraggableBlockProps {
  blockType: number;
  onDragStart: any;
  onDrop: (
    blockType: number,
    position: {
      x: number;
      y: number;
    }
  ) => void;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  blockType,
  onDragStart,
  onDrop,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const { cellSize } = useGameContext();
  const elementRef = useRef<View>(null);
  const GRID_SIZE = 43; // Define the grid size

  const startAnimation = () => {
    pan.setValue({ x: 0, y: 0 });
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const endAnimation = () => {
    Animated.spring(scale, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          // @ts-ignore
          x: pan.x._value,
          // @ts-ignore
          y: pan.y._value,
          // y: pan.y._value - 100,
        });
        startAnimation();
        onDragStart(blockType);
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        console.log("pan", pan);
        elementRef.current?.measure((fx, fy, width, height, px, py) => {
          // fx, fy are relative to the parent
          // px, py are relative to the screen
          console.log("DraggableBlock", { fx, fy, px, py, width, height });
        });
        // @ts-ignore
        onDrop(blockType, { x: pan.x._value, y: pan.y._value });
        endAnimation();
      },
    })
  ).current;

  const renderBlockShape = () => {
    const blockShape = BLOCKS[blockType];
    return blockShape.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, cellIndex) => (
          <View
            key={cellIndex}
            style={[
              styles.cell,
              {
                backgroundColor: cell ? getColor(blockType + 1) : "transparent",
                borderWidth: cell ? 1 : 0,
                width: cellSize,
                height: cellSize,
              },
            ]}
          />
        ))}
      </View>
    ));
  };

  return (
    <Animated.View
      ref={elementRef}
      style={[
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: scale },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.blockContainer}>{renderBlockShape()}</View>
    </Animated.View>
  );
};

const getColor = (value: number): string => {
  const colors = [
    "#E63946", // Rojo (Carmín)
    "#A8DADC", // Azul Claro (Aguamarina)
    "#1D3557", // Azul Oscuro (Prusia)
    "#F4A261", // Naranja (Melón)
    "#2A9D8F", // Verde (Jade)
    "#E9C46A", // Amarillo (Maíz)
    "#F3722C", // Naranja (Zanahoria)
    "#264653", // Azul Muy Oscuro (Pizarra)
  ];
  return colors[value - 1] || "#FFFFFF"; // Blanco por defecto
};

const styles = StyleSheet.create({
  blockContainer: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    // width: BLOCK_SIZE,
    // height: BLOCK_SIZE,
    borderWidth: 1,
    borderColor: "#4444FF50",
  },
});

export default DraggableBlock;
