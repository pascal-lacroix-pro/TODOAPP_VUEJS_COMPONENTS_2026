<script setup>
const props = defineProps({
  isLoading: { type: Boolean, required: true },
});
</script>
<template>
  <div
    class="h-screen w-screen bg-slate-600 text-slate-200 flex justify-center items-center fixed top-0 left-0"
    v-if="isLoading"
  >
    Chargement en cours...
  </div>
</template>
