import { BOX_DIMENSION, TBoardValuesType } from './TicTacToe';

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
};

const Box = ({ rowSize, onClickHandle, boardValues, boxIndex }: Props) => {
  return (
    <button
      className="box"
      style={{ height: `${BOX_DIMENSION}px`, flex: `0 0 ${100 / rowSize}%` }}
      onClick={(event) => onClickHandle(event, boxIndex)}
    >
      {boardValues?.[boxIndex] ?? boxIndex}
    </button>
  );
};

export default Box;
