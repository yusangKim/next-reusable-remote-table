import React, { useState } from "react";
import TodoListWithSearchForm from "./TodoListWithSearchForm";

const TodoListWidget = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="border p-2">
      <div>TodoListWidget</div>
      <div>
        <TodoListWithSearchForm
          controlledPageIndex={pageIndex}
          controlledPageSize={pageSize}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default TodoListWidget;
