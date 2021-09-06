/* eslint-disable react/jsx-key */
import React, { useCallback, useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

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
  } = props;

  const instance = useTable(
    {
      columns,
      data: data ?? [],
      initialState: { pageIndex: 0 },
      manualPagination: true,
      manualSortBy: true,
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
    state: { pageIndex, pageSize },
  } = instance;

  const gotoPage = useCallback((page) => {
    setControlledPage(page);
  }, []);
  // const nextPage = useCallback(() => {
  //   console.log("nextPage", { pageIndex });
  //   setControlledPage(pageIndex + 1);
  // }, [pageIndex]);
  const nextPage = () => {
    console.log("nextPage", { pageIndex });
    setControlledPage(pageIndex + 1);
  };
  const previousPage = useCallback(() => {
    setControlledPage(pageIndex - 1);
  }, [pageIndex]);
  const setPageSize = useCallback(
    (newPageSize) => {
      setControlledPageSize(newPageSize);
      if (pageSize !== newPageSize) {
        setControlledPage(0);
      }
    },
    [pageSize, setControlledPage, setControlledPageSize]
  );

  return (
    <div className="border p-2">
      <div>RemoteTable</div>
      <pre>
        {JSON.stringify(
          { pageIndex, pageSize, controlledPageIndex, controlledPageSize },
          null,
          2
        )}
      </pre>
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
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
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
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
                  Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
                  results
                </td>
              )}
            </tr>
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()}>{">"}</button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
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
