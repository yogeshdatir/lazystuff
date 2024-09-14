import Box, { TOnClickHandle } from './Box';
import { TBoardType } from './TicTacToe';

type Props = {
  boardSize: number;
  onClickHandle: TOnClickHandle;
  boardValues: TBoardType;
  rowIndex: number;
};

const Row = ({ boardSize, onClickHandle, boardValues, rowIndex }: Props) => {
  return (
    <div className="row">
      {[...Array(boardSize)].map((_, columnIndex) => (
        <Box
          key={columnIndex}
          onClickHandle={onClickHandle}
          boardValues={boardValues}
          indices={{ rowIndex, columnIndex }}
        />
      ))}
    </div>
  );
};

export default Row;
