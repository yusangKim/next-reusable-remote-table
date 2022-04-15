import qs from 'qs';
import axios from 'axios';

// export async function fetchTodoList(page, per_page = 10) {
//   const params = { page, per_page };
//   const queryString = qs.stringify(params);
//   return await axios.get(`/api/todos?${queryString}`);
// }

export async function fetchTodoList(
  page,
  per_page = 10,
  filters = {},
  sortBy = []
) {
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
  if (sortBy.length > 0) {
    params.sort = `${sortBy[0].id}:${sortBy[0].desc ? 'desc' : 'asc'}`;
  }
  const queryString = qs.stringify(params);
  return await axios.get(`/api/todos?${queryString}`);
}
