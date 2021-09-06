import React from "react";
import RemoteTable from "../../remote-table/RemoteTable";

const TodoRemoteTable = (props) => {
  const debug = true;
  const {
    columns,
    data,
    loading,
    controlledPageCount,
    controlledPageIndex,
    controlledPageSize,
    setPageIndex,
    setPageSize,
  } = props;
  return (
    <div className="border p-2">
      <div>TodoRemoteTable</div>
      {debug && <pre>{JSON.stringify(props, null, 2)}</pre>}
      <div>
        <RemoteTable
          columns={columns}
          data={data}
          loading={loading}
          controlledPageCount={controlledPageCount}
          controlledPageIndex={controlledPageIndex}
          controlledPageSize={controlledPageSize}
          setControlledPage={setPageIndex}
          setControlledPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default TodoRemoteTable;
