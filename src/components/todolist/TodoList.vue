<script setup>
import { onMounted, reactive, computed } from "vue";

import DB from "@/services/DB";
import TodoListAddForm from "./TodoListAddForm.vue";
import TodoListFooter from "./TodoListFooter.vue";
import Todo from "./Todo.vue";

const props = defineProps({
  apiURL: { type: String, required: true },
});

const todos = reactive([]);

const notCompletedCount = computed(
  () => todos.filter((todo) => !todo.completed).length
);

const createItem = async (content) => {
  const todo = await DB.create(content);
  todos.push(todo);
};

const init = async (apiURL) => {
  DB.setApiURL(apiURL);
  todos.splice(todos.length, 0, ...(await DB.findAll()));
};

onMounted(() => {
  init(props.apiURL);
});
</script>
<template>
  <!-- CARD LISTE -->
  <section
    class="bg-slate-100 rounded-xl shadow ring-1 ring-slate-200/60 overflow-hidden"
    aria-labelledby="todo-heading"
  >
    <h2 id="todo-heading" class="sr-only">Todo list</h2>

    <TodoListAddForm @on-submit-add-form="createItem($event)" />

    <!-- LISTE DES TODOS -->
    <ul
      class="m-4 divide-y divide-slate-200 text-slate-500"
      role="list"
      aria-label="Todos"
    >
      <todo v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>

    <TodoListFooter :notCompletedCount="notCompletedCount" />
  </section>
</template>
