import React from "react";
import RenderItem from "../RenderItem";

const TableRow = ({ row, columns, onActionClick }) => {
  return (
    <tr>
      {columns.map((col, index) => (
        <td key={index} className="text-nowrap text-[1rem] p-4">
          {col.render ? (
            col.render(row[col.dataIndex], row)
          ) : (
            <RenderItem type={col.type} value={row[col.dataIndex]} />
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
