import Block from "@/classes/Block";
import { View } from "@/components/Themed";
import {
  BLOCKS,
  BlockType,
  createEmptyBoard,
  generateNextBlocks,
  getColor,
} from "@/constants/GameProps";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useWindowDimensions } from "react-native";

type NextBlockObject = {
  one: number[];
  two: number[];
  three: number[];
};

export enum PropName {
  one = "one",
  two = "two",
  three = "three",
}

const initState = {
  boardWidth: 0,
  cellSize: 0,
  rowNumber: 0,
  currentBlock: new Block(0, 0, [], 0, "white"),
  board: [[new Block(0, 0, [], 0, "white")]],
  nextBlocks: [] as number[],
  oldBlocks: [],
  nextBlocksObject: { one: [], two: [], three: [] } as NextBlockObject,
  blockShapes: [new Block(0, 0, [], 0, "white")],
  setCurrentBlock: (value: Block) => {},
  randomBlocks: () => {
    return [0];
  },
  removeFromQueue: (index: number, propName: PropName) => {},
  setBoard: (value: any) => {},
};

type GameContextProps = typeof initState;

export const GameContext = createContext<GameContextProps>(initState);

type GameAction =
  | { type: "SET_CURRENT_BLOCK"; payload: Block }
  | { type: "SET_RANDOM_BLOCKS"; payload: number[] }
  | { type: "REMOVE_BLOCK_FROM_QUEUE"; payload: number }
  | { type: "SET_BOARD"; payload: Block[][] };

const gameReducer = (
  state: GameContextProps,
  action: GameAction
): GameContextProps => {
  switch (action.type) {
    case "SET_BOARD":
      return {
        ...state,
        board: action.payload,
      };
    case "SET_CURRENT_BLOCK":
      return {
        ...state,
        currentBlock: action.payload,
      };
    case "SET_RANDOM_BLOCKS":
      return {
        ...state,
        nextBlocks: action.payload,
      };
    case "REMOVE_BLOCK_FROM_QUEUE":
      return {
        ...state,
        nextBlocks: [...state.nextBlocks.toSpliced(action.payload, 1)],
      };

    default:
      return state;
  }
};

const createShapes = (size: number) => {
  return BLOCKS.map(
    (block, index) => new Block(index, 0, block, size, getColor(index))
  );
};

const GameProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(gameReducer, initState);
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const GAME_WIDTH = SCREEN_WIDTH;
  const NUMBERS_ROWS = 9;
  const CELL_SIZE = SCREEN_WIDTH / NUMBERS_ROWS;
  const blockShapes = createShapes(CELL_SIZE);
  const [nextBlocks, setNextBlocks] = useState<number[]>([]);

  const [nextBlocksObject, setNextBlocksObject] = useState<NextBlockObject>({
    one: [],
    two: [],
    three: [],
  });

  const removeFromQueue = useCallback((index: number, propName: PropName) => {
    setNextBlocksObject((prev) => {
      const newBlocks = [...prev[propName]];
      newBlocks.splice(index, 1);
      return {
        ...prev,
        [propName]: newBlocks,
      };
    });
  }, []);

  const addRandomBlocks = useCallback((count: number) => {
    setNextBlocksObject((prev) => {
      return {
        one: !prev.one.length
          ? Array.from({ length: count }, () =>
              Math.floor(Math.random() * BLOCKS.length)
            )
          : prev.one,
        two: !prev.two.length
          ? Array.from({ length: count }, () =>
              Math.floor(Math.random() * BLOCKS.length)
            )
          : prev.two,
        three: !prev.three.length
          ? Array.from({ length: count }, () =>
              Math.floor(Math.random() * BLOCKS.length)
            )
          : prev.three,
      };
    });
  }, []);

  // useEffect(() => {
  //   addRandomBlocks(1);
  // }, []);

  useEffect(() => {
    const { one, three, two } = nextBlocksObject;
    const shouldAdd = !one.length || !two.length || !three.length;

    if (shouldAdd) {
      addRandomBlocks(1);
    }
  }, [nextBlocksObject]);

  const randomBlocks = useCallback(() => {
    const newBlocks = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * BLOCKS.length)
    );
    return newBlocks;
  }, []);

  const initBoard = () => {
    const _board = createEmptyBoard(NUMBERS_ROWS);
    let rows = [];
    for (let row = 0; row < _board.length; row++) {
      const cols = [];
      const colElements = _board[row];
      for (let col = 0; col < colElements.length; col++) {
        const shape = new Block(col, row, BLOCKS[0], CELL_SIZE, "#4444FF30");
        cols.push(shape);
      }
      rows.push(cols);
    }
    setBoard(rows);
  };

  useEffect(() => {
    initBoard();
  }, []);

  const setBoard = (value: any) => {
    dispatch({ type: "SET_BOARD", payload: value });
  };

  const setCurrentBlock = (value: Block) => {
    dispatch({ type: "SET_CURRENT_BLOCK", payload: value });
  };

  const contextState = {
    ...state,
    boardWidth: GAME_WIDTH,
    cellSize: CELL_SIZE,
    rowNumber: NUMBERS_ROWS,
    setCurrentBlock,
    randomBlocks,
    setBoard,
    blockShapes,
    initBoard,
    nextBlocks,
    nextBlocksObject,
    removeFromQueue,
    addRandomBlocks,
  };

  return (
    <GameContext.Provider value={contextState}>{children}</GameContext.Provider>
  );
};

export const useGameContext = (): GameContextProps => {
  const state = useContext(GameContext);
  return state;
};

export default GameProvider;
