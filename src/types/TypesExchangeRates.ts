// types.ts
export interface TExchangeRateResponse {
  success: boolean;
  timestamp?: number;
  base: string;
  date: string;
  rates: Record<string, number>;
  error?: {
    code: string;
    message?: string;
  };
}

export type TCurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';
