import { BOX_DIMENSION, TBoardValuesType, TGameResult } from './TicTacToe';

export type TBoxIndex = number;

export type TOnClickHandle = (
  event: React.MouseEvent<HTMLButtonElement>,
  boxIndex: TBoxIndex
) => void;

type Props = {
  rowSize: number;
  onClickHandle: TOnClickHandle;
  boardValues: TBoardValuesType;
  boxIndex: number;
  result: TGameResult;
};

const Box = ({
  rowSize,
  onClickHandle,
  boardValues,
  boxIndex,
  result,
}: Props) => {
  const { winningCombo } = result;
  const isWinningComboBox = checkWinningCombBox(winningCombo, boxIndex);

  return (
    <button
      className={`box ${isWinningComboBox ? 'won' : ''}`}
      style={{ height: `${BOX_DIMENSION}px`, flex: `0 0 ${100 / rowSize}%` }}
      onClick={(event) => onClickHandle(event, boxIndex)}
    >
      {boardValues?.[boxIndex]}
    </button>
  );
};

const checkWinningCombBox = (
  winningCombo: TGameResult['winningCombo'],
  boxIndex: TBoxIndex
) => {
  return winningCombo.includes(boxIndex);
};

export default Box;
