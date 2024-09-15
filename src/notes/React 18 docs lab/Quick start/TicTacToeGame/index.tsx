import GameContextProvider from './GameContext';
import TicTacToe from './TicTacToe';

const index = () => {
  return (
    <GameContextProvider>
      <TicTacToe />
    </GameContextProvider>
  );
};

export default index;
