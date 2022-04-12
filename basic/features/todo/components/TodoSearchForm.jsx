import React, { useState } from 'react';

const TodoSearchForm = ({ searchFilter, setSearchFilter }) => {
  const [id, setId] = useState('');
  const [completed, setCompleted] = useState('');

  return (
    <div className="border p-2 flex gap-5">
      <input
        type={'text'}
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="User Id"
        className={'border-2 border-solid border-gray-300 text-l p-1'}
      />
      <select
        value={completed}
        onChange={(e) => setCompleted(e.target.value)}
        className={'border-2 border-solid border-gray-300'}
      >
        <option value="">None</option>
        <option value={true}>True</option>
        <option value={false}>False</option>
      </select>
      <button
        onClick={(e) => {
          const filters = [];
          if (id) {
            filters.push(`userId:${id}`);
          }
          if (completed !== '') {
            filters.push(`completed:${completed}`);
          }
          setSearchFilter(filters.join(','));
        }}
        className={'border-2 border-solid border-blue-500 w-20 rounded'}
      >
        검색
      </button>
    </div>
  );
};

export default TodoSearchForm;
