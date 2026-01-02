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

// AUTRES MÉTHODES
const setFilter = (data) => {
  console.log(data);
  filter.value = data;
};

const withLoading = async (func) => {
  isLoading.value = true;
  try {
    return await func();
  } finally {
    isLoading.value = false;
  }
};

// INITIALISATION
const init = async (apiURL) => {
  withLoading(async () => {
    DB.setApiURL(apiURL);
    todos.splice(todos.length, 0, ...(await DB.findAll()));
  });
};

// MÉTHODES CRUD
// createItem(content)
// event: on-submit-add-form
const createItem = async (content) => {
  withLoading(async () => {
    const todo = await DB.create(content);
    todos.push(todo);
  });
};

// deleteOneById(id)
// event: @on-delete
const deleteOneById = async (id) => {
  withLoading(async () => {
    await DB.deleteOneById(id);
    todos.splice(
      todos.findIndex((todo) => todo.id === id),
      1
    );
  });
};

const updateOne = async (todo) => {
  withLoading(async () => {
    await DB.updateOne(todo);
  });
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
