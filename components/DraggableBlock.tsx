import Block from "@/classes/Block";
import { useGameContext } from "@/contexts/GameProvider";
import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

interface DraggableBlockProps {
  blockShape: Block;
  onDragStart: any;
  onDrop: any;
  blockIndex: any;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  blockShape,
  onDragStart,
  onDrop,
  blockIndex,
}) => {
  const defaultScale = 0.7;
  const pan: any = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(defaultScale)).current;
  const { cellSize, setCurrentBlock } = useGameContext();
  const elementRef = useRef<View>(null);

  const startAnimation = () => {
    pan.setValue({ x: 0, y: 0 });
    Animated.spring(scale, {
      toValue: 1.1,
      useNativeDriver: false,
    }).start();
  };

  const endAnimation = () => {
    Animated.spring(scale, {
      toValue: defaultScale,
      useNativeDriver: false,
    }).start();
  };

  const initPos = () => {
    Animated.timing(pan, {
      toValue: { ...pan, x: 0, y: 0 },
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x?._value,
          y: pan.y?._value - 100,
        });
        startAnimation();
        onDragStart(blockShape);
      },
      onPanResponderMove: (_, gestureState) => {
        // const snappedY = Math.round(gestureState.dy / cellSize) * cellSize;
        // const snappedX = Math.round(gestureState.dx / cellSize) * cellSize;
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(_, { dx: gestureState.dx, dy: gestureState.dy });
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        const snappedX = Math.round(pan.x._value / cellSize) * cellSize;
        const snappedY = Math.round(pan.y._value / cellSize) * cellSize;

        Animated.spring(pan, {
          toValue: { x: snappedX, y: snappedY },
          useNativeDriver: false,
        }).start();

        elementRef.current?.measure((fx, fy, width, height, px, py) => {
          const canMove = onDrop(blockShape, { x: px, y: py }, blockIndex);
          if (!canMove) {
            initPos();
          }
        });
        endAnimation();
      },
    })
  ).current;

  const renderBlockShape = () => {
    const template = blockShape.template;
    const color = blockShape.color;
    return template.map((row, rowIndex) => (
      <View key={rowIndex} style={[styles.row, {}]}>
        {row.map((cell: any, cellIndex: any) => (
          <View
            key={cellIndex}
            style={[
              styles.cell,
              {
                backgroundColor: cell ? color : "transparent",
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

const styles = StyleSheet.create({
  blockContainer: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  cell: {},
});

export default DraggableBlock;
