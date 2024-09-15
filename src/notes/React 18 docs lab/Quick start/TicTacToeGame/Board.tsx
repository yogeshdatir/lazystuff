import Box, { TOnClickHandle } from './Box';
import { TBoardValuesType } from './TicTacToe';

type Props = {
  rowSize: number;
  onClickHandle: TOnClickHandle;
  boardValues: TBoardValuesType;
} & React.HTMLAttributes<HTMLDivElement>;

const Board = ({ rowSize, onClickHandle, boardValues, ...rest }: Props) => {
  return (
    <div {...rest} className="board">
      {boardValues.map((_, boxIndex) => {
        return (
          <Box
            key={boxIndex}
            rowSize={rowSize}
            onClickHandle={onClickHandle}
            boardValues={boardValues}
            boxIndex={boxIndex}
          />
        );
      })}
    </div>
  );
};

export default Board;
