import { useState } from 'react';
import { useGameContext } from './GameContext';

const RowSizeInput = () => {
  const { gameReset } = useGameContext();
  const [rowSizeInput, setRowSizeInput] = useState<number>(3);

  const updateRowSizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowSizeInput(Number(e.target.value));
  };

  const updateGameSize = () => {
    gameReset(rowSizeInput);
  };

  return (
    <div className="rowSizeForm">
      <input
        name="rowSizeInput"
        value={rowSizeInput}
        type="number"
        onChange={updateRowSizeInput}
      />
      <button onClick={updateGameSize}>Set Game Size</button>
    </div>
  );
};

export default RowSizeInput;
