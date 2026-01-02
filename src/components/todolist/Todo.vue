<script setup>
import { watch, ref } from "vue";

const props = defineProps({
  todo: { type: Object, required: true },
});

const isEditing = ref(false);

const emits = defineEmits(["onDelete", "onUpdate"]);

const emitOnDelete = () => {
  emits("onDelete", props.todo.id);
};

watch(
  () => props.todo,
  (newValue) => {
    emits("onUpdate", newValue);
  },
  { deep: true }
);
</script>
<template>
  <li class="px-4 py-3 sm:px-5" role="listitem">
    <div class="flex items-center gap-3" v-if="!isEditing">
      <!-- La ligne entière est cliquable via label -->
      <input
        :id="todo.id"
        type="checkbox"
        class="h-4 w-4 text-blue-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        v-model="todo.completed"
      />
      <label
        for="t1"
        class="flex-1 cursor-pointer"
        :class="{ 'line-through text-slate-400': todo.completed }"
        @dblclick="isEditing = true"
      >
        {{ todo.content }}
      </label>
      <button
        class="text-red-600/90 hover:text-red-700 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
        aria-label="Delete task"
        title="Delete"
        @click.prevent="emitOnDelete"
      >
        ✕
      </button>
    </div>
    <!-- Champ d'édition (masqué par défaut, visible en mode edit) -->
    <input
      type="text"
      v-model.lazy="todo.content"
      class="mt-2 w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      v-else
      @change="isEditing = false"
    />
  </li>
</template>
