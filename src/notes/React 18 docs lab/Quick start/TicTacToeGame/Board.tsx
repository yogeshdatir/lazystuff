import { TOnClickHandle } from './Box';
import Row from './Row';
import { TBoardType } from './TicTacToe';

type Props = {
  boardSize: number;
  onClickHandle: TOnClickHandle;
  boardValues: TBoardType;
};

const Board = ({ boardSize, onClickHandle, boardValues }: Props) => {
  return (
    <div className="board">
      {[...Array(boardSize)].map((_, rowIndex) => {
        return (
          <Row
            key={rowIndex}
            boardSize={boardSize}
            onClickHandle={onClickHandle}
            boardValues={boardValues}
            rowIndex={rowIndex}
          />
        );
      })}
    </div>
  );
};

export default Board;
