import { Injectable, UseGuards } from '@nestjs/common';
import axios from 'axios';
import { Currency, ExchangeRate } from '../models/exchange_rate';

type ApiResponse = {
    data: {
        base: Currency,
        currency: Currency,
        amount: number
    }
}

@Injectable()
export class ExchangeService {

    async getExchangeRate(base: Currency, currency: Currency): Promise<ExchangeRate>{
        const response = await axios.get<ApiResponse>(`https://api.coinbase.com/v2/prices/${base}-${currency}/buy`);
        const info = response.data.data;
        return {baseCurrency: info.base, comparedCurrency: info.currency, rate: info.amount};
    }
}
