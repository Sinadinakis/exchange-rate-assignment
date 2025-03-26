<script setup lang="ts">
import {ref, watch, computed} from 'vue'
import {useExchange} from '@/composables/useExchange'
import ExchangeRateOverTime from "@/components/ExchangeRateOverTime.vue";
import ExchangeRatesBasedEU from "@/components/ExchangeRatesBasedEU.vue";
import UiLoading from "@/components/UiComponents/UiLoading.vue";

const targetCurrency = ref<string>('EUR')
const {rates, symbols, error, isLoading, getRates} = useExchange()
const baseCurrency = ref("EUR") // Free version requires EUR as base
type CurrencyCode = 'EUR' | 'USD' | 'GBP' | 'JPY'


const exchangeRate = computed<number | null>(() => {
  if (!rates.value || !targetCurrency.value) return null
  const rate = rates.value[baseCurrency.value as CurrencyCode]
  return rate ?? null
})

// Watch targetCurrency and refresh rates when it changes
watch(targetCurrency, (newCurrency) => {
  getRates(newCurrency)
})

// Initial load
getRates(targetCurrency.value)
</script>

<template>
  <div class="w-full mt-4 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold py-4">Currency Exchange Rates</h2>

    <div class="flex gap-2 mb-4">
      <select
        v-model="targetCurrency"
        class="flex-1 px-3 py-2 border rounded"
      >
        <option
          v-for="(symbol, index) in symbols"
          :key="index"
          :value="symbol"
        >
          {{ symbol }}
        </option>
      </select>

      <button
        @click="getRates(targetCurrency)"
        :disabled="isLoading"
        class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {{ isLoading ? 'Loading...' : 'Refresh' }}
      </button>
    </div>

    <UiLoading :is-loading="isLoading"/>
    <div v-if="error" class="p-3 bg-red-100 text-red-700 rounded mb-4">
      {{ error }} (showing mock data)
    </div>

    <div v-if="rates && !isLoading" class="space-y-2">
      <div
        v-for="(rate, currency) in rates"
        :key="currency"
        class="flex justify-between p-2 even:bg-gray-50"
      >
        <span class="font-medium">{{ currency }}</span>
        <span>{{ rate.toFixed(6) }}</span>
      </div>
    </div>

    <!-- Display Exchange Rate -->
    <div class="grid grid-cols-2 gap-4">
      <ExchangeRatesBasedEU :targetCurrency="targetCurrency" :exchangeRate="exchangeRate"/>
      <ExchangeRateOverTime :targetCurrency="targetCurrency"/>
    </div>

    <!-- Limitation and improvements -->
    <div class="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-500">
      <div>
        <p>Free tier limitations:</p>
        <ul class="list-disc pl-5">
          <li>Base currency locked to EUR</li>
          <li>Mock data used if API fails or usage limit reached</li>
          <li>Time series not supported in free plan</li>
        </ul>
      </div>
      <div>
        <p>What would you improve next time?</p>
        <ul class="list-disc pl-5">
          <li>Expand UiComponents</li>
          <li>More tests</li>
          <li>More generic api - possibly add utils functions</li>
        </ul>
      </div>
    </div>
  </div>
</template>
