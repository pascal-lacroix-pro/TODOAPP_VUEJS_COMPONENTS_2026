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
// createItem(content)
// event: on-submit-add-form
const createItem = async (content) => {
  const todo = await DB.create(content);
  todos.push(todo);
};

// deleteOneById(id)
// event: @on-delete
const deleteOneById = async (id) => {
  await DB.deleteOneById(id);
  todos.splice(
    todos.findIndex((todo) => todo.id === id),
    1
  );
};

// EXPOSITION
export const todosStore = reactive({
  todos,
  notCompletedCount,
  init,
  createItem,
  deleteOneById,
});
