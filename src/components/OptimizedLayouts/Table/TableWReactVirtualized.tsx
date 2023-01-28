import React, { Component, FC } from "react";
import {
  AutoSizer as _AutoSizer,
  AutoSizerProps,
  Column as _Column,
  ColumnProps,
  Table as _Table,
  TableProps,
} from "react-virtualized";
import "react-virtualized/styles.css";

const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>;
const Column = _Column as unknown as FC<ColumnProps>;
const Table = _Table as unknown as FC<TableProps>;

interface Props {}

export const getTableData = () => {
  let list: any = [];
  for (let i = 0; i < 10000; i++) {
    list.push({ name: `${i} Brian Vaughn`, description: "Software engineer" });
  }
  return list;
};

const TableWReactVirtualized = (props: Props) => {
  let list: any = getTableData();
  return (
    <div style={{ height: 400 }}>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={width}
            height={height}
            headerHeight={50}
            rowHeight={50}
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}
          >
            <Column label="Name" dataKey="name" width={200} />
            <Column width={300} label="Description" dataKey="description" />
            <Column label="Name" dataKey="name" width={200} />
            <Column width={300} label="Description" dataKey="description" />
          </Table>
        )}
      </AutoSizer>
    </div>
  );
};

export default TableWReactVirtualized;
