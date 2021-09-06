import axios from "axios";
import qs from "qs";
import React, { useState, useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import TodoRemoteTable from "./TodoRemoteTable";
import TodoSearchForm from "./TodoSearchForm";

export async function fetchTodoList(page, per_page = 10) {
  const params = { page, per_page };
  const queryString = qs.stringify(params);
  return await axios.get(`/api/todos?${queryString}`);
}

const TodoListWithSearchForm = (props) => {
  const {
    controlledPageIndex: pageIndex,
    controlledPageSize: pageSize,
    setPageIndex,
    setPageSize,
  } = props;

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        sortable: true,
      },
      {
        Header: "Title",
        accessor: "title",
        sortable: true,
      },
      {
        Header: "User",
        accessor: "userId",
        sortable: true,
      },
      {
        Header: "Completed",
        accessor: (d) => (d.completed ? "true" : "false"),
      },
    ],
    []
  );

  const [pageCount, setPageCount] = useState(0);

  // const fetchData = useCallback(
  //   async ({ queryKey }) => {
  //     const [_key, { pageIndex, pageSize, filter, sortBy }] = queryKey;
  //     console.log({ queryKey });
  //     const page = pageIndex + 1;
  //     const response = await fetchTodoList(page, pageSize, filter, sortBy);
  //     return response.data.data;
  //   },
  //   [sortBy, filter]
  // );
  const fetchData = useCallback(async ({ queryKey }) => {
    const [_key, { pageIndex, pageSize }] = queryKey;
    const page = pageIndex + 1;
    const response = await fetchTodoList(page, pageSize);
    return response.data.data;
  }, []);

  const { isLoading, data } = useQuery(
    ["todos", { pageIndex, pageSize }],
    fetchData,
    {
      onSuccess: (data) => {
        setPageCount(data?.pagination?.total_page);
      },
    }
  );

  return (
    <div className="border p-2">
      <div>TodoListWithSearchForm</div>
      <TodoSearchForm />
      <TodoRemoteTable
        columns={columns}
        loading={isLoading}
        data={data}
        controlledPageIndex={pageIndex}
        controlledPageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default TodoListWithSearchForm;
