import React from "react";
import { getTableData } from "./TableWReactVirtualized";

interface Props {}

const HTMLTable = (props: Props) => {
  let list: any = getTableData();
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {list.map((person: any) => {
            return (
              <tr>
                <td>{person.name}</td>
                <td>{person.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HTMLTable;
