import BlockGameScorer from "@/classes/BlockGameScorer";
import React, { createContext, useContext, useState, useCallback } from "react";

interface ScoreContextType {
  score: number;
  combo: number;
  placeBlock: () => void;
  completeLine: () => void;
  resetGame: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [scorer] = useState(() => new BlockGameScorer());
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  const updateState = useCallback(() => {
    setScore(scorer.getScore());
    setCombo(scorer.getCombo());
  }, [scorer]);

  const placeBlock = useCallback(() => {
    scorer.placeBlock();
    updateState();
  }, [scorer, updateState]);

  const completeLine = useCallback(() => {
    scorer.completeLine();
    updateState();
  }, [scorer, updateState]);

  const resetGame = useCallback(() => {
    scorer.resetGame();
    updateState();
  }, [scorer, updateState]);

  const value = {
    score,
    combo,
    placeBlock,
    completeLine,
    resetGame,
  };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
};

export const useScore = (): ScoreContextType => {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};
