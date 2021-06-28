import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExchangeModule } from './exchange/exchange.module';

@Module({
  imports: [AuthModule, UsersModule, ExchangeModule],
  providers: [AppService],
})
export class AppModule {}
