import React, { useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import "./grid.scss";


function Grid(props) {
    const {columns, data, manualSortBy, handleSortingChange} = props;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: {sortBy}
    } = useTable({ columns, data, manualSortBy, disableSortRemove: true },useSortBy );

    useEffect(() => {
        handleSortingChange(sortBy);
      }, [handleSortingChange, sortBy]);

    return (
        <div>
            <table {...getTableProps()} className="table">
                <thead className="header">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="header_row">
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="header_column" style={{width: column.width}}>
                                    {column.render('Header')}
                                    <span className="sort_icon">
                                        {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="body">
                    {rows.map(
                        (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="table_row">
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className="body_column">
                                        {cell.render('Cell')}
                                    </td>))}
                            </tr>
                        )}
                    )}
                </tbody>
            </table>
        </div>
  );
}

export default Grid;
