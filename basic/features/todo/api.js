import qs from 'qs';
import axios from 'axios';

// export async function fetchTodoList(page, per_page = 10) {
//   const params = { page, per_page };
//   const queryString = qs.stringify(params);
//   return await axios.get(`/api/todos?${queryString}`);
// }

export async function fetchTodoList(page, per_page = 10, filters) {
  let params = { page, per_page };
  if (filters !== '') {
    params = { ...params, filters };
  }
  const queryString = qs.stringify(params);
  return await axios.get(`/api/todos?${queryString}`);
}
