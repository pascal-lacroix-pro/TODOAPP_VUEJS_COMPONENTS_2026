import { reactive, computed } from "vue";
import DB from "@/services/DB";

// DATA
const todos = reactive([]);

const notCompletedCount = computed(
  () => todos.filter((todo) => !todo.completed).length
);

// INITIALISATION
const init = async (apiURL) => {
  DB.setApiURL(apiURL);
  todos.splice(todos.length, 0, ...(await DB.findAll()));
};

// MÉTHODES CRUD
const createItem = async (content) => {
  const todo = await DB.create(content);
  todos.push(todo);
};

// EXPOSITION
export const todosStore = reactive({
  todos,
  notCompletedCount,
  init,
  createItem,
});
