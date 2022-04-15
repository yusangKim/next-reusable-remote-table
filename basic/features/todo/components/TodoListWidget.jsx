import React, { useState } from 'react';
import TodoListWithSearchForm from './TodoListWithSearchForm';

const TodoListWidget = ({ defaultFilters, completed }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    userId: defaultFilters?.userId,
    completed: completed?.completed,
  });

  return (
    <div className="border p-2">
      <div>TodoListWidget</div>
      <div>
        <TodoListWithSearchForm
          controlledPageIndex={pageIndex}
          controlledPageSize={pageSize}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          setFilters={setFilters}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default TodoListWidget;
