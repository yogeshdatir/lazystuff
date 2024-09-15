import { useState } from 'react';
import Board from './Board';
import './TicTacToe.styles.css';
import { TBoxIndex } from './Box';

export const BOX_DIMENSION = 54;

export type TBoardValuesType = string[];

export type TGameResult = {
  winnerIndex: number;
  winningCombo: number[];
};

type Props = {
  rowSize?: number;
};

const TicTacToe = ({ rowSize = 3 }: Props) => {
  const boardSize = rowSize * rowSize;
  const charsUsed = ['X', 'O'];
  const [playerTurn, setPlayerTurn] = useState<1 | 0>(0);
  const [boardValues, setBoardValues] = useState<TBoardValuesType>([
    ...Array(boardSize),
  ]);
  const [result, setResult] = useState<TGameResult>({
    winnerIndex: -1,
    winningCombo: [],
  });
  const { winnerIndex, winningCombo } = result;
  const winner = charsUsed[winnerIndex];
  let winningCombos: number[][] = calculateWinningCombos(rowSize);

  const onClickHandle = (
    event: React.MouseEvent<HTMLButtonElement>,
    boxIndex: TBoxIndex
  ) => {
    event.preventDefault();

    if (winnerIndex > -1) return;

    const updatedBoardValues = [...boardValues];

    if (!updatedBoardValues?.[boxIndex]) {
      updatedBoardValues[boxIndex] = charsUsed[playerTurn];
      setBoardValues(updatedBoardValues);
      setPlayerTurn((prevPlayer) => (prevPlayer === 1 ? 0 : 1));
    }
    const newResult = checkWinner(updatedBoardValues, winningCombos, charsUsed);
    setResult(newResult);
  };

  return (
    <>
      <Board
        style={{
          width: `${rowSize * BOX_DIMENSION}px`,
        }}
        className={`board ${winner ? 'game-over' : 'game-in-progress'}`}
        rowSize={rowSize}
        onClickHandle={onClickHandle}
        boardValues={boardValues}
        result={result}
      />
      {winner && <p>{`${winner} is the winner.`}</p>}
    </>
  );
};

const calculateWinningCombos = (rowSize: number) => {
  const horizontalCombos: number[][] = [];
  const verticalCombos: number[][] = [];
  const diagonalCombos: number[][] = [[], []];

  [...Array(rowSize * rowSize)].forEach((_, index) => {
    const vertWinComboIndex = index % rowSize;

    if (!verticalCombos?.[vertWinComboIndex])
      verticalCombos[vertWinComboIndex] = [];
    verticalCombos[vertWinComboIndex].push(index);

    const horWinComboIndex = Math.floor(index / rowSize);

    if (!horizontalCombos?.[horWinComboIndex])
      horizontalCombos[horWinComboIndex] = [];
    horizontalCombos[horWinComboIndex].push(index);

    diagonalCombos[0][horWinComboIndex] =
      rowSize * horWinComboIndex + horWinComboIndex;

    diagonalCombos[1][horWinComboIndex] =
      rowSize * (horWinComboIndex + 1) - (horWinComboIndex + 1);
  });

  const winningCombos = [
    ...horizontalCombos,
    ...verticalCombos,
    ...diagonalCombos,
  ];

  return winningCombos;
};

const checkWinner = (
  boardValues: TBoardValuesType,
  winningCombos: number[][],
  charsUsed: string[]
) => {
  const [player0, player1] = charsUsed;
  let winnerCount: {
    [x: string]: number;
  } = {};
  let result: TGameResult = { winnerIndex: -1, winningCombo: [] };

  winningCombos.forEach((winningCombo) => {
    winnerCount = {
      [player0]: 0,
      [player1]: 0,
    };

    winningCombo.forEach((winningIndex) => {
      if (boardValues[winningIndex] === player0)
        winnerCount[player0] = winnerCount[player0] + 1;
      else if (boardValues[winningIndex] === player1)
        winnerCount[player1] = winnerCount[player1] + 1;
    });

    if (winnerCount[player0] === winningCombo.length) {
      result = { winnerIndex: 0, winningCombo: [...winningCombo] };
    }
    if (winnerCount[player1] === winningCombo.length) {
      result = { winnerIndex: 1, winningCombo: [...winningCombo] };
    }
  });
  return result;
};

export default TicTacToe;
