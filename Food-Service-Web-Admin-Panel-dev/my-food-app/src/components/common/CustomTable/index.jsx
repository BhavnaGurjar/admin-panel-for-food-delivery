import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import "./style.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const CustomTable = ({ columns, data, width }) => {
  const [activeRow, setActiveRow] = useState(null);

  const handleActionClick = (rowIndex) => {
    setActiveRow(rowIndex === activeRow ? null : rowIndex);
  };

  return (
    <div className={`custom-table overflow-auto`} style={{ width: width }}>
      <table className="border-none">
        <thead>
          <TableHeader columns={columns} />
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              row={row}
              columns={columns}
              isActive={rowIndex === activeRow}
              onActionClick={() => handleActionClick(rowIndex)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
