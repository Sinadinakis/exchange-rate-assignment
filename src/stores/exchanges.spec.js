import { setActivePinia, createPinia } from 'pinia';
import { useExchangeStore } from '@/stores/exchanges';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock fetch API to avoid real network requests
global.fetch = vi.fn();

// Setup Pinia before each test
beforeEach(() => {
  setActivePinia(createPinia());
  vi.resetAllMocks(); // Reset mock fetch before each test
});

describe('useExchangeStore', () => {
  it('fetches latest rates successfully', async () => {
    const store = useExchangeStore();

    // Mock API response
    const mockRates = {
      success: true,
      rates: {
        EUR: 1,
        USD: 1.08,
        GBP: 0.84,
        JPY: 162.29
      }
    };

    fetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockRates),
    });

    await store.fetchLatestRates('EUR');

    expect(store.rates).toEqual(mockRates.rates);
    expect(store.error).toBeNull();
  });

  it('converts exchange rates correctly to base currency', () => {
    const store = useExchangeStore();

    const mockRates = {
      EUR: 1,
      USD: 1.08,
      GBP: 0.84,
      JPY: 162.29
    };

    const convertedRates = store.convertToBase(mockRates, 'USD');

    expect(convertedRates).toEqual({
      EUR: 1 / 1.08,
      USD: 1,
      GBP: 0.84 / 1.08,
      JPY: 162.29 / 1.08
    });
  });
});
