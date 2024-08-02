import { createContext, useContext } from "react";
import { useWindowDimensions } from "react-native";

type GameContextProps = {
  boardWidth: number;
  cellSize: number;
  rowNumber: number;
};

const initState = {
  boardWidth: 0,
  cellSize: 0,
  rowNumber: 0,
};

export const GameContext = createContext<GameContextProps>(initState);

const GameProvider = ({ children }: any) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const GAME_WIDTH = SCREEN_WIDTH;
  const NUMBERS_ROWS = 9;
  const CELL_SIZE = SCREEN_WIDTH / NUMBERS_ROWS;

  const contextState = {
    boardWidth: GAME_WIDTH,
    cellSize: CELL_SIZE,
    rowNumber: NUMBERS_ROWS,
  };

  return (
    <GameContext.Provider value={{ ...contextState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextProps => {
  const state = useContext(GameContext);
  return state;
};

export default GameProvider;
