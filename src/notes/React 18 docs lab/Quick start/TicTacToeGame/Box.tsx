import { TBoardType } from './TicTacToe';

export type TIndices = {
  rowIndex: number;
  columnIndex: number;
};

export type TOnClickHandle = (
  event: React.MouseEvent<HTMLButtonElement>,
  indices: TIndices
) => void;

type Props = {
  onClickHandle: TOnClickHandle;
  boardValues: TBoardType;
  indices: TIndices;
};

const Box = ({ onClickHandle, boardValues, indices }: Props) => {
  const { rowIndex, columnIndex } = indices;

  return (
    <button className="box" onClick={(event) => onClickHandle(event, indices)}>
      {boardValues?.[rowIndex]?.[columnIndex] ?? ''}
    </button>
  );
};

export default Box;
