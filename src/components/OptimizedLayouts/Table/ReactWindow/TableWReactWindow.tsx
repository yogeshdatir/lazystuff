import { VariableSizeGrid as Grid } from 'react-window';
import { makeData } from '../makeData';
import { useState } from 'react';
import './styles.css';
// These item sizes are arbitrary.
// Yours should be based on the content of the item.
const columnWidths = new Array(1000)
  .fill(true)
  .map(() => 75 + Math.round(Math.random() * 50));
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));

const Cell = ({ columnIndex, data, rowIndex, style }: any) => {
  const cellAccessor = Object.keys(data[rowIndex])[columnIndex];
  // Access the data source using the "data" prop:
  const item = !Array.isArray(data[rowIndex][cellAccessor])
    ? data[rowIndex][cellAccessor]
    : '';

  return (
    <div
      className={
        columnIndex % 2
          ? rowIndex % 2 === 0
            ? 'GridItemOdd'
            : 'GridItemEven'
          : rowIndex % 2
          ? 'GridItemOdd'
          : 'GridItemEven'
      }
      style={style}
    >
      {item} {rowIndex},{columnIndex}
    </div>
  );
};

const TableWReactWindow = () => {
  const [data, setData] = useState(() => makeData(100, 5, 3));
  console.log({ data });

  return (
    <Grid
      className="Grid"
      columnCount={Object.keys(data[0]).length}
      columnWidth={(index) => columnWidths[index]}
      height={900}
      rowCount={data.length}
      rowHeight={(index) => rowHeights[index]}
      width={600}
      itemData={data}
    >
      {Cell}
    </Grid>
  );
};

export default TableWReactWindow;
