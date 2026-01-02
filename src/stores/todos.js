import { reactive, computed, ref } from "vue";
import DB from "@/services/DB";

// DATA
const todos = reactive([]);

const filter = ref("all");

const filteredTodos = computed(() => {
  if (filter.value === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (filter.value === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
});

const notCompletedCount = computed(
  () => todos.filter((todo) => !todo.completed).length
);

const setFilter = (data) => {
  console.log(data);
  filter.value = data;
};

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

const updateOne = async (todo) => {
  await DB.updateOne(todo);
};

// EXPOSITION
export const todosStore = reactive({
  filteredTodos,
  filter,
  notCompletedCount,
  init,
  setFilter,
  createItem,
  deleteOneById,
  updateOne,
});
