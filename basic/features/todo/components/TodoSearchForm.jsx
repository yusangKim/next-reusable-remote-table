import React, { useState } from 'react';

const TodoSearchForm = ({ searchFilter, setSearchFilter }) => {
  const [id, setId] = useState('');

  return (
    <div className="border p-2 flex gap-5">
      <input
        type={'text'}
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="User Id"
        className={'border-2 border-solid border-gray-300 text-l p-1'}
      />
      <button
        onClick={(e) => {
          const filters = [];
          if (id) {
            filters.push(`userId:${id}`);
          }
          setSearchFilter(filters.join('|'));
        }}
      >
        검색
      </button>
    </div>
  );
};

export default TodoSearchForm;
