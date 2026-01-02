<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  notCompletedCount: { type: Number, required: true },
  filter: { type: String, required: true },
});

const emits = defineEmits(["onSetFilter"]);

const filter = ref(props.filter);

watch(
  () => filter.value,
  (newValue) => {
    emits("onSetFilter", newValue);
  }
);
</script>
<template>
  <!-- FOOTER DE LISTE -->
  <div
    class="border-t border-slate-300 bg-slate-300 px-4 py-3 sm:px-5 text-slate-600"
    role="contentinfo"
    aria-label="Todo list footer"
  >
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <!-- Compteur avec aria-live -->
      <p class="text-sm">
        <span
          id="items-left"
          class="font-medium"
          aria-live="polite"
          aria-atomic="true"
          >{{ notCompletedCount }}</span
        >
        item(s) left
      </p>

      <!-- Filtres -->
      <nav class="flex items-center gap-2" aria-label="Filters">
        <button
          class="w-24 px-3 py-1.5 text-sm rounded-full border border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-pressed="true"
          :class="{ 'bg-slate-400 text-slate-200': filter === 'all' }"
          @click.prevent="filter = 'all'"
        >
          All
        </button>
        <button
          class="w-24 px-3 py-1.5 text-sm rounded-full border border-slate-400 hover:bg-slate-400 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-pressed="false"
          :class="{ 'bg-slate-400 text-slate-200': filter === 'active' }"
          @click.prevent="filter = 'active'"
        >
          Active
        </button>
        <button
          class="w-24 px-3 py-1.5 text-sm rounded-full border border-slate-400 hover:bg-slate-400 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-pressed="false"
          :class="{ 'bg-slate-400 text-slate-200': filter === 'completed' }"
          @click.prevent="filter = 'completed'"
        >
          Completed
        </button>
      </nav>

      <!-- Action secondaire -->
      <div class="sm:ml-auto">
        <button
          class="text-sm text-slate-600 hover:text-slate-800 underline underline-offset-2 decoration-slate-300 hover:decoration-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          Clear completed
        </button>
      </div>
    </div>
  </div>
</template>
