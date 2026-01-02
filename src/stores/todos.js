import { reactive, computed, ref } from "vue";
import DB from "@/services/DB";

// DATA
const todos = reactive([]);

const filter = ref("all");
const isLoading = ref(true);

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
  isLoading.value = false;
};

// MÉTHODES CRUD
// createItem(content)
// event: on-submit-add-form
const createItem = async (content) => {
  isLoading.value = true;
  const todo = await DB.create(content);
  todos.push(todo);
  isLoading.value = false;
};

// deleteOneById(id)
// event: @on-delete
const deleteOneById = async (id) => {
  isLoading.value = true;
  await DB.deleteOneById(id);
  todos.splice(
    todos.findIndex((todo) => todo.id === id),
    1
  );
  isLoading.value = false;
};

const updateOne = async (todo) => {
  isLoading.value = true;
  await DB.updateOne(todo);
  isLoading.value = false;
};

// EXPOSITION
export const todosStore = reactive({
  isLoading,
  filteredTodos,
  filter,
  notCompletedCount,
  init,
  setFilter,
  createItem,
  deleteOneById,
  updateOne,
});
