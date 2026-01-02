<script setup>
import { onMounted } from "vue";
import { todosStore } from "@/stores/todos";

import TodoListAddForm from "./TodoListAddForm.vue";
import TodoListFooter from "./TodoListFooter.vue";
import Todo from "./Todo.vue";
import Loader from "../Loader.vue";

const props = defineProps({
  apiURL: { type: String, required: true },
});

onMounted(() => {
  todosStore.init(props.apiURL);
});
</script>
<template>
  <Loader :isLoading="todosStore.isLoading" />

  <!-- CARD LISTE -->
  <section
    class="bg-slate-100 rounded-xl shadow ring-1 ring-slate-200/60 overflow-hidden"
    aria-labelledby="todo-heading"
  >
    <h2 id="todo-heading" class="sr-only">Todo list</h2>

    <TodoListAddForm @on-submit-add-form="todosStore.createItem($event)" />

    <!-- LISTE DES TODOS -->
    <ul
      class="m-4 divide-y divide-slate-200 text-slate-500"
      role="list"
      aria-label="Todos"
    >
      <todo
        v-for="todo in todosStore.filteredTodos"
        :key="todo.id"
        :todo="todo"
        @on-delete="todosStore.deleteOneById($event)"
        @on-update="todosStore.updateOne($event)"
      />
    </ul>

    <TodoListFooter
      :notCompletedCount="todosStore.notCompletedCount"
      :filter="todosStore.filter"
      @on-set-filter="todosStore.setFilter($event)"
    />
  </section>
</template>
