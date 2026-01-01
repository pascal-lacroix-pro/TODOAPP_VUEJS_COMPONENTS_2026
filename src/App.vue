<script setup>
import AppHeader from "@/components/AppHeader.vue";
import TodoList from "@/components/todolist/TodoList.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <AppHeader />

  <main class="w-full max-w-xl mt-8 bg-slate-200 rounded-xl">
    <TodoList apiURL="https://68ad9556a0b85b2f2cf3e1b0.mockapi.io" />
  </main>

  <AppFooter />
</template>

<style scoped></style>
