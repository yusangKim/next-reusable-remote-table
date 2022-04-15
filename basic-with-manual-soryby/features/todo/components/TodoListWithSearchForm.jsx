import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchTodoList } from '../api';
import TodoRemoteTable from './TodoRemoteTable';
import TodoSearchForm from './TodoSearchForm';

const TodoListWithSearchForm = (props) => {
  const {
    controlledPageIndex: pageIndex,
    controlledPageSize: pageSize,
    setPageIndex,
    setPageSize,
    setFilters,
    filters,
    sortBy,
    setSortBy,
  } = props;

  const [pageCount, setPageCount] = useState(0);

  const fetchData = useCallback(async ({ queryKey }) => {
    console.log(filters);
    const [_key, { pageIndex, pageSize, filters, sortBy }] = queryKey;
    const page = pageIndex + 1;
    const response = await fetchTodoList(page, pageSize, filters, sortBy);
    // console.log(response.data);
    return response.data;
  }, []);

  const { isLoading, data } = useQuery(
    ['todos', { pageIndex, pageSize, filters, sortBy }],
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
      <TodoSearchForm filters={filters} setFilters={setFilters} />
      <TodoRemoteTable
        loading={isLoading}
        data={data?.data ?? []}
        controlledPageCount={pageCount}
        controlledPageIndex={pageIndex}
        controlledPageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
};

export default TodoListWithSearchForm;
