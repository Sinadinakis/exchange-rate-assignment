<script setup lang="ts">
import {ref} from "vue";
import {useExchange} from "@/composables/useExchange.ts";
import UiLoading from "@/components/UiComponents/UiLoading.vue";
const {error, isLoading} = useExchange()
const props = defineProps<{
  targetCurrency: string;
  exchangeRate: number | null;
}>();

const baseCurrency = ref("EUR") // Free tier requires EUR as base

</script>

<template>
  <div class="mt-6 px-4 bg-blue-50 rounded-lg">
    <UiLoading :is-loading="isLoading" />
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="exchangeRate && !isLoading" class="text-lg font-semibold">
      <label class="block mb-2">Exchange Rates (Base: {{ baseCurrency }})</label>
      1 {{ baseCurrency }} = {{ exchangeRate.toFixed(6) }} {{ props.targetCurrency }}
    </div>
    <div v-else class="text-gray-500">No exchange rate data available</div>
  </div>
</template>

<style scoped>

</style>
