/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';

const RemoteTable = (props) => {
  const {
    columns,
    data,
    loading,
    controlledPageCount,
    controlledPageIndex,
    controlledPageSize,
    setControlledPage,
    setControlledPageSize,
    setSort,
  } = props;

  const instance = useTable(
    {
      columns,
      data: data ?? [],
      initialState: { pageIndex: 0 },
      manualPagination: true,
      manualSortBy: true, //이 옵션이 켜져있으면 자동으로 정렬하지 않음, 외부에서 정렬을 원하면(ex 서버)이 옵션을 true로 설정해야함
      pageCount: controlledPageCount,
      useControlledState: (state) => {
        return useMemo(
          () => ({
            ...state,
            pageIndex: controlledPageIndex ?? 0,
            pageSize: controlledPageSize ?? 10,
          }),
          [state, controlledPageIndex, controlledPageSize]
        );
      },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    state: { pageIndex, pageSize, sortBy },
  } = instance;

  const gotoPage = useCallback(
    (page) => {
      setControlledPage(page);
    },
    [setControlledPage]
  );
  const nextPage = useCallback(() => {
    setControlledPage(pageIndex + 1);
  }, [pageIndex, setControlledPage]);
  const previousPage = useCallback(() => {
    setControlledPage(pageIndex - 1);
  }, [pageIndex, setControlledPage]);

  const [inputSort, setInputSort] = useState('');

  const handleSort = (sortBy) => {
    if (sortBy.length === 0) {
      setSort('');
    } else {
      for (let i = 0; i < sortBy.length; i++) {
        setInputSort(`${sortBy[i].id}:${sortBy[i].desc ? 'asc' : 'desc'}`);
      }
      setSort(inputSort);
    }
  };

  useEffect(() => {
    handleSort(sortBy);
    console.log(inputSort);
  }, [setSort, sortBy]);

  return (
    <div className="border p-2">
      <div>RemoteTable</div>
      <div className="p-4 border">
        <h1 className="text-xl">RemoteTable</h1>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(
                      column.sortable && column.getSortByToggleProps()
                    )}
                    // onClick={() => handleSort(column)}
                  >
                    {column.render('Header')}
                    <span>
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
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
            <tr>
              {loading ? (
                // Use our custom loading state to show a loading indicator
                <td colSpan="10000">Loading...</td>
              ) : (
                <td colSpan="10000">
                  Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                  results
                </td>
              )}
            </tr>
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()}>{'>'}</button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              setControlledPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RemoteTable;
