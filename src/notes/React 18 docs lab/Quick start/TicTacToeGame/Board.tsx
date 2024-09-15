import Box, { TOnClickHandle } from './Box';
import { TBoardValuesType, TGameResult } from './TicTacToe';

type Props = {
  rowSize: number;
  onClickHandle: TOnClickHandle;
  boardValues: TBoardValuesType;
  result: TGameResult;
} & React.HTMLAttributes<HTMLDivElement>;

const Board = ({
  rowSize,
  onClickHandle,
  boardValues,
  result,
  ...rest
}: Props) => {
  return (
    <div {...rest}>
      {boardValues.map((_, boxIndex) => {
        return (
          <Box
            key={boxIndex}
            rowSize={rowSize}
            onClickHandle={onClickHandle}
            boardValues={boardValues}
            boxIndex={boxIndex}
            result={result}
          />
        );
      })}
    </div>
  );
};

export default Board;
