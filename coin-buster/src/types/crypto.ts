export interface CryptoPrice {
  usd: number;
}

export type RawApiResponse = Record<string, CryptoPrice>;

export interface CryptoItem {
  id: string;
  name: string;
  priceUsd: number;
}

export interface FormFilterData {
  searchQuery: string;
  currencyOption: string;
}