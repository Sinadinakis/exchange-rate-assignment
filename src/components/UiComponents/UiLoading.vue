<script setup lang="ts">
withDefaults(defineProps<{
    isLoading: boolean;
  }>(),{ isLoading: false });
</script>

<template>
  <div v-if="isLoading" class="text-center py-4">
    <div
      class="inline-block animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
  </div>
</template>

<style scoped>

</style>
