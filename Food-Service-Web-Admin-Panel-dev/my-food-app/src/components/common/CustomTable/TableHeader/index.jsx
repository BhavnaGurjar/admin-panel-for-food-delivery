const TableHeader = ({ columns }) => {
  return (
    <tr>
      {columns.map((col, index) => (
        <th key={index} className="text-nowrap py-3 px-2">
          {col.title}
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
