import { useExchangeStore } from "@/stores/exchanges.ts";
import { ref, onMounted } from "vue";

export function useExchange() {
  const store = useExchangeStore();
  const rates = ref<{ [key: string]: number } | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);
  const ratesOverTime = ref<{ date: string; rates: Record<string, number> }[]>([]);
  const symbols = ref<string[]>([]); // Store the list of currency symbols

  const getRates = async (targetCurrency = "EUR") => {
    isLoading.value = true;

    try {
      await store.fetchLatestRates(targetCurrency);
      if (!store.rates) {
        // Mock Data
        store.rates = {
          EUR: 1,
          USD: 1.078603,
          AUD: 1.706302,
          JPY: 162.29526,
        };
      }
      rates.value = store.convertToBase(store.rates, targetCurrency);
      symbols.value = Object.keys(store.rates) ?? []; // Extract symbols

    } catch {
      error.value = "Failed to fetch rates";
    } finally {
      setTimeout(() => {
        isLoading.value = false;
      }, 1000); // 1-second delay before showing data
    }
  };

  const loadRatesOverTime = async (days = 2, base = "EUR") => {
      isLoading.value = true;
      try {
        ratesOverTime.value = await store.fetchRatesOverTime(days, base);
      } catch {
        error.value = "Failed to fetch rates over time";
      } finally {
        isLoading.value = false;
      }
    };


    // Automatically fetch rates when the composable is used
  onMounted(() => {
    getRates();
    loadRatesOverTime();
  });

  return {
    rates,
    symbols,
    ratesOverTime,
    error,
    isLoading,
    getRates,
    loadRatesOverTime,
  };
}
