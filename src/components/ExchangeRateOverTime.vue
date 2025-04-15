<script setup lang="ts">
import {useExchange} from "@/composables/useExchange.ts";
import UiLoading from "@/components/UiComponents/UiLoading.vue";

const props = defineProps<{
  targetCurrency: string;
}>();
const {error, isLoading, ratesOverTime} = useExchange()

</script>

<template>
  <div class="mt-6 px-4 bg-white shadow-md rounded-lg">
    <UiLoading :is-loading="isLoading" />
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="ratesOverTime && !isLoading">
      <h2 class="text-xl font-semibold mb-4">Exchange Rates Over Time</h2>
      <table class="w-full border-collapse border">
        <thead>
        <tr class="bg-gray-200">
          <th class="border p-2">Date</th>
          <th class="border p-2">Currency</th>
          <th class="border p-2">Rate</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="day in ratesOverTime" :key="day.date">
          <td class="border p-2">{{ day.date }}</td>
          <td class="border p-2">{{ props.targetCurrency }}</td>
          <td class="border p-2">{{ day.rates[props.targetCurrency] }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="w-full flex justify-center p-4">
      No exchange rate over time data available
    </div>
  </div>
</template>

<style scoped>

</style>
