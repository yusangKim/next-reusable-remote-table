import qs from "qs";
import axios from "axios";

export async function fetchTodoList(page, per_page = 10) {
  const params = { page, per_page };
  const queryString = qs.stringify(params);
  return await axios.get(`/api/todos?${queryString}`);
}
