import React, { useState } from 'react';

const TodoSearchForm = ({ searchFilter, setSearchFilter }) => {
  const [id, setId] = useState('');

  return (
    <div className="border p-2">
      <input type={'text'} value={id} onChange={(e) => setId(e.target.value)} />
      <button
        onClick={(e) => {
          const filters = [];
          if (id) {
            filters.push(`id:${id}`);
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
