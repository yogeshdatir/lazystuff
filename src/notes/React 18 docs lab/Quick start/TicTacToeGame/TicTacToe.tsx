import { useState } from 'react';
import Board from './Board';
import './TicTacToe.styles.css';
import { TIndices } from './Box';

export type TBoardType = string[][];

const TicTacToe = () => {
  const boardSize = 3;
  const charsUsed = ['X', 'O'];
  const [playerTurn, setPlayerTurn] = useState<1 | 0>(0);
  const [boardValues, setBoardValues] = useState<TBoardType>([]);

  const onClickHandle = (
    event: React.MouseEvent<HTMLButtonElement>,
    indices: TIndices
  ) => {
    event.preventDefault();
    const { rowIndex, columnIndex } = indices;
    const updatedBoardValues = [...boardValues];
    if (!updatedBoardValues?.[rowIndex]) updatedBoardValues[rowIndex] = [];
    updatedBoardValues[rowIndex][columnIndex] = charsUsed[playerTurn];
    setBoardValues([...updatedBoardValues]);
    setPlayerTurn((prevPlayer) => (prevPlayer === 1 ? 0 : 1));
  };

  return (
    <Board
      boardSize={boardSize}
      onClickHandle={onClickHandle}
      boardValues={boardValues}
    />
  );
};

export default TicTacToe;
