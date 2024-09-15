import { createContext, useContext, useState } from 'react';
import { TBoardValuesType, TGameResult } from './TicTacToe';

/*
Good reference: https://kentcdodds.com/blog/how-to-use-react-context-effectively
*/

export type TGameContext = {
  rowSize: number;
  setRowSize: React.Dispatch<React.SetStateAction<number>>;
  result: TGameResult;
  setResult: React.Dispatch<React.SetStateAction<TGameResult>>;
  boardValues: TBoardValuesType;
  setBoardValues: React.Dispatch<React.SetStateAction<TBoardValuesType>>;
  gameReset: (rowSizeInput: number) => void;
};

type Props = {
  children: React.ReactNode;
};

const GameContext = createContext<TGameContext | null>(null);

export const INITIAL_RESULT = {
  winnerIndex: -1,
  winningCombo: [],
};

export default function GameContextProvider({ children }: Props) {
  const [rowSize, setRowSize] = useState<number>(3);
  const [boardValues, setBoardValues] = useState<TBoardValuesType>([
    ...Array(rowSize * rowSize),
  ]);
  const [result, setResult] = useState<TGameResult>(INITIAL_RESULT);

  const gameReset = (rowSizeInput: number) => {
    setRowSize(rowSizeInput);
    setResult(INITIAL_RESULT);
    setBoardValues([...Array(rowSizeInput * rowSizeInput)]);
  };

  const GameContextState: TGameContext = {
    rowSize,
    setRowSize,
    result,
    setResult,
    boardValues,
    setBoardValues,
    gameReset,
  };

  return (
    <GameContext.Provider value={GameContextState}>
      {children}
    </GameContext.Provider>
  );
}

// To use context with error handling

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error('useGameContext must be used within a GameContextProvider');
  }
  return context;
}
