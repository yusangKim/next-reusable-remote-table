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
  } = props;

  const [pageCount, setPageCount] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');

  const fetchData = useCallback(async ({ queryKey }) => {
    const [_key, { pageIndex, pageSize, searchFilter }] = queryKey;
    const page = pageIndex + 1;
    const response = await fetchTodoList(page, pageSize, searchFilter);
    return response.data;
  }, []);

  const { isLoading, data } = useQuery(
    ['todos', { pageIndex, pageSize, searchFilter }],
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
      <TodoSearchForm
        searchfilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <TodoRemoteTable
        loading={isLoading}
        data={data?.data ?? []}
        controlledPageCount={pageCount}
        controlledPageIndex={pageIndex}
        controlledPageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default TodoListWithSearchForm;
