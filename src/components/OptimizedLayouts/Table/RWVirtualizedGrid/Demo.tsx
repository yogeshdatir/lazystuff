import CustomVirtualGrid from './CustomVirtualGrid';

const generateRandomData = (rowsLen: number, colsLen: number) => {
  const columns = Array.from({ length: colsLen }, (_, index) => ({
    key: `column_${index}`,
    label: `Column ${index}`,
    width: 120,
  }));

  const rows = [];
  for (let i = 0; i < rowsLen; i++) {
    const row: any = { id: i }; // Add an ID to uniquely identify each row
    for (let j = 0; j < columns.length; j++) {
      row[`column_${j}`] = `Row ${i}, Col ${j}`;
    }
    rows.push(row);
  }
  return [rows, columns];
};

const Demo = () => {
  const [data, columns] = generateRandomData(200, 1000);

  return (
    <div>
      <h1>Virtual Grid Example</h1>
      <CustomVirtualGrid
        fixedColumnWidths={[150, 150, 150, 130]}
        height={800}
        width={1700}
        overscanRowCount={5}
        rowHeight={() => 30}
        headerHeight={30}
        rowCount={data.length}
        columns={columns}
        headerRenderer={(columnIndex: number) => {
          const column = columns[columnIndex];
          return column.label;
        }}
        cellRenderer={(columnIndex: number, rowIndex: number) => {
          const row = data[rowIndex];
          const columnKey = columns[columnIndex].key;
          return row[columnKey];
        }}
      />
    </div>
  );
};

export default Demo;
