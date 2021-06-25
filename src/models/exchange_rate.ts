export interface ExchangeRate {
    baseCurrency: Currency,
    comparedCurrency: Currency,
    rate: number 
}

export type Currency = "UAH" | "BTC"