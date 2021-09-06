import React, { useState, useEffect } from "react";
import TodoListWithSearchForm from "./TodoListWithSearchForm";

const TodoListWidget = () => {
  // const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);

  return (
    <div className="border p-2">
      <div>TodoListWidget</div>
      <pre>{JSON.stringify({ pageIndex, pageSize }, null, 2)}</pre>
      <div>
        <TodoListWithSearchForm
          // controlledPageCount={pageCount}
          controlledPageIndex={pageIndex}
          controlledPageSize={pageSize}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          // setPageCount={setPageCount}
        />
      </div>
    </div>
  );
};

export default TodoListWidget;
