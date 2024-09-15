import Box, { TOnClickHandle } from './Box';
import { useGameContext } from './GameContext';
import { TBoardValuesType, TGameResult } from './TicTacToe';

type Props = {
  onClickHandle: TOnClickHandle;
} & React.HTMLAttributes<HTMLDivElement>;

const Board = ({ onClickHandle, ...rest }: Props) => {
  const { rowSize, boardValues, result } = useGameContext();

  return (
    <div {...rest}>
      {boardValues?.length > 0 &&
        boardValues.map((_, boxIndex) => {
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
