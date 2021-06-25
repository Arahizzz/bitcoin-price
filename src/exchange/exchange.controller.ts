import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExchangeService } from './exchange.service';

@Controller()
export class ExchangeController {

    constructor(private rates: ExchangeService){}

    @UseGuards(JwtAuthGuard)
    @Get('/btcRate')
    async getBitcoinRate(){
        return await this.rates.getExchangeRate("BTC", "UAH");
    }
}
