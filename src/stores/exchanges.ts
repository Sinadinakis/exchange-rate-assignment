import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useExchangeStore = defineStore('exchange', () => {
  const rates = ref<Record<string, number> | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  const API_KEY = '963b383112d6a4499e8cbd0492d5e03b';
  const Symbols = 'EUR,USD,GBP,JPY';
  const url = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&symbols=${Symbols}`

  const formatDate= (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0'); // Ensures 2-digit day

    return `${year}-${month}-${day}`;
  }

  const fetchRatesOverTime = async (days = 2, targetCurrency: string = "EUR") => {
    const ratesHistory = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = formatDate(date); // Format YYYY-MM-DD
      try {
        const response = await fetch(`https://api.exchangeratesapi.io/v1/${formattedDate}?access_key=${API_KEY}&symbols=${Symbols}&base=${targetCurrency}`);
        const data = await response.json();
        if (data.success) {
          ratesHistory.push({ date: data.date, rates: data.rates });
        }
      } catch (error) {
        console.error("Error fetching rates over time:", error);
      }
    }
    return ratesHistory;
  };

  // Free-tier compatible API call (EUR base only)
  async function fetchLatestRates(targetCurrency: string = "EUR") {
    isLoading.value = true
    error.value = null

    try {
      let data = undefined;
      const response = await fetch(url + `&base=${targetCurrency}`)
      data = await response.json()
      if(data.success === false) {
        data = {
          success: true,
          timestamp: 1742984643,
          base: "EUR",
          date: "2025-03-26",
          rates: {
            EUR: 1,
            USD: 1.079902,
            AUD: 1.706302,
            JPY: 162.29526,
          }
        };
      }
      if (!data) {
        throw new Error(data.error?.info || 'Failed to fetch rates')
      }

      rates.value = data.rates
      return data.rates
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'API error'
      // Mock data for development
      rates.value = {
        EUR: 1,
        USD: 1.078603,
        GBP: 0.835519,
        JPY: 162.29526
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Client-side conversion (free tier workaround)
  function convertToBase(rates: Record<string, number>, targetCurrency: string) {
    if (!rates[targetCurrency]) {
      throw new Error(`Currency ${targetCurrency} not available`)
    }

    const conversionRate = rates[targetCurrency]
    return Object.fromEntries(
      Object.entries(rates).map(([currency, rate]) => [
        currency,
        rate / conversionRate
      ])
    )
  }

  // watchEffect(fetchLatestRates('EUR'));

  return {
    rates,
    error,
    isLoading,
    fetchLatestRates,
    fetchRatesOverTime,
    convertToBase
  }
})
