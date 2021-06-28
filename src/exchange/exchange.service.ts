import { Injectable, UseGuards } from '@nestjs/common';
import axios from 'axios';
import { Currency, ExchangeRate } from '../models/exchange_rate';

type ApiResponse = {
    data: {
        base: Currency,
        currency: Currency,
        amount: string
    }
}

@Injectable()
export class ExchangeService {

    async getExchangeRate(base: Currency, converted: Currency): Promise<ExchangeRate>{
        const response = await axios.get<ApiResponse>(`https://api.coinbase.com/v2/prices/${base}-${converted}/buy`);
        const info = response.data.data;
        return {baseCurrency: info.base, convertedCurrency: info.currency, rate: parseFloat(info.amount)};
    }
}
