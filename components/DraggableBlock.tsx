import Block from "@/classes/Block";
import { useGameContext } from "@/contexts/GameProvider";
import React, { useEffect, useRef } from "react";
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
  // const defaultScale = 0.6;
  const defaultScale = 2;
  const pan: any = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { cellSize } = useGameContext();
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
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(scale, {
      toValue: defaultScale,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    initPos();
  }, []);

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
                backgroundColor: cell ? "#000" : "transparent",
                borderWidth: cell ? 1 : 0,
                width: cellSize,
                height: cellSize,
                // borderColor: "#ffffff99",
                justifyContent: "center",
                alignItems: "center",
                // ---
                shadowColor: color,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 5,
              },
            ]}
          >
            {/* <View
              style={{
                backgroundColor: cell ? "#000" : "transparent",
                width: cellSize - 5,
                height: cellSize - 5,
              }}
            /> */}
          </View>
        ))}
      </View>
    ));
  };

  return (
    <Animated.View
      ref={elementRef}
      style={[
        styles.blockContainer,
        { opacity },
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
      {renderBlockShape()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  blockContainer: {
    marginHorizontal: 15,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    margin: 1,
    // backgroundColor: "#ffffff99",
  },
});

export default DraggableBlock;
