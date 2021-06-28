export interface ExchangeRate {
    baseCurrency: Currency,
    convertedCurrency: Currency,
    rate: number 
}

export type Currency = "UAH" | "BTC"