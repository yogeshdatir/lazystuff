import React from 'react';

export const getTableData = () => {
  let list: any = [];
  for (let i = 0; i < 10000; i++) {
    list.push({ name: `${i} Brian Vaughn`, description: 'Software engineer' });
  }
  return list;
};

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
