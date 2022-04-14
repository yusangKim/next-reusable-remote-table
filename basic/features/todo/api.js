import qs from 'qs';
import axios from 'axios';

// export async function fetchTodoList(page, per_page = 10) {
//   const params = { page, per_page };
//   const queryString = qs.stringify(params);
//   return await axios.get(`/api/todos?${queryString}`);
// }

export async function fetchTodoList(page, per_page = 10, filters = {}, sort) {
  let params = { page, per_page };

  let filterResult = '';
  if (filters.userId) {
    filterResult += `userId:${filters.userId}`;
    params.filters = filterResult;
  }
  if (filters.completed) {
    filterResult += `,completed:${filters.completed}`;
    params.filters = filterResult;
  }
  if (sort.length !== '') {
    params = { ...params, sort };
  }
  const queryString = qs.stringify(params);
  return await axios.get(`/api/todos?${queryString}`);
}
