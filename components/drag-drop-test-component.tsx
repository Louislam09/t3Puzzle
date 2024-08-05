import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const gridSize = 10;
const cellSize = width / gridSize;

const generateNewPiece = () => {
  const pieces = [
    [
      [1, 1],
      [1, 0],
    ], // L-shaped
    [[1, 1, 1]], // I-shaped
    [
      [1, 1],
      [1, 1],
    ], // O-shaped
  ];
  const index = Math.floor(Math.random() * pieces.length);
  return pieces[index];
};

const App = () => {
  const [grid, setGrid] = useState(
    Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(0))
  );
  const [pieces, setPieces] = useState([
    { piece: generateNewPiece(), pan: new Animated.ValueXY(), placed: false },
    { piece: generateNewPiece(), pan: new Animated.ValueXY(), placed: false },
    { piece: generateNewPiece(), pan: new Animated.ValueXY(), placed: false },
  ]);
  const gridRef = useRef(null);
  const [gridLayout, setGridLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.measure((x, y, width, height, pageX, pageY) => {
        setGridLayout({ x: pageX, y: pageY, width, height });
      });
    }
  }, [gridRef.current]);

  const handleDrop = (pieceIndex, gestureState) => {
    const piece = pieces[pieceIndex].piece;

    const dropX =
      Math.round((gestureState.moveX - gridLayout.x) / cellSize) * cellSize;
    const dropY =
      Math.round((gestureState.moveY - gridLayout.y) / cellSize) * cellSize;

    const gridX = Math.floor(dropX / cellSize);
    const gridY = Math.floor(dropY / cellSize);

    if (
      gridX < 0 ||
      gridY < 0 ||
      gridX + piece[0].length > gridSize ||
      gridY + piece.length > gridSize
    ) {
      return;
    }

    const updatedGrid = grid.map((row) => row.slice());

    let canPlace = true;

    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[row].length; col++) {
        if (piece[row][col] === 1) {
          if (updatedGrid[gridY + row][gridX + col] === 1) {
            canPlace = false;
            break;
          }
        }
      }
      if (!canPlace) break;
    }

    if (canPlace) {
      for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
          if (piece[row][col] === 1) {
            updatedGrid[gridY + row][gridX + col] = 1;
          }
        }
      }

      setGrid(updatedGrid);
      setPieces(
        pieces.map((p, i) => (i === pieceIndex ? { ...p, placed: true } : p))
      );

      if (pieces.every((p) => p.placed || p.piece === piece)) {
        setPieces([
          {
            piece: generateNewPiece(),
            pan: new Animated.ValueXY(),
            placed: false,
          },
          {
            piece: generateNewPiece(),
            pan: new Animated.ValueXY(),
            placed: false,
          },
          {
            piece: generateNewPiece(),
            pan: new Animated.ValueXY(),
            placed: false,
          },
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: 0</Text>
      <View
        ref={gridRef}
        style={styles.grid}
        onLayout={() => {
          if (gridRef.current) {
            gridRef.current.measure((x, y, width, height, pageX, pageY) => {
              setGridLayout({ x: pageX, y: pageY, width, height });
            });
          }
        }}
      >
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <View
                key={cellIndex}
                style={[styles.cell, cell === 1 && styles.filledCell]}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.pieces}>
        {pieces.map((item, index) => {
          if (item.placed) return null;

          const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
              item.pan.setOffset({
                x: item.pan.x._value,
                y: item.pan.y._value,
              });
              item.pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event(
              [null, { dx: item.pan.x, dy: item.pan.y }],
              { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gesture) => {
              item.pan.flattenOffset();
              handleDrop(index, gesture);
            },
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.piece,
                { transform: item.pan.getTranslateTransform() },
              ]}
              {...panResponder.panHandlers}
            >
              {item.piece.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((cell, cellIndex) => (
                    <View
                      key={cellIndex}
                      style={[styles.cell, cell === 1 && styles.filledCell]}
                    />
                  ))}
                </View>
              ))}
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282c34",
  },
  score: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
  },
  grid: {
    width: gridSize * cellSize,
    height: gridSize * cellSize,
    backgroundColor: "#000000",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: cellSize,
    height: cellSize,
    borderWidth: 1,
    borderColor: "#333333",
  },
  filledCell: {
    backgroundColor: "#ff5722",
  },
  pieces: {
    flexDirection: "row",
    marginTop: 20,
  },
  piece: {
    margin: 10,
  },
});

export default App;
