import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashRegister } from './entities/cash-register.entity';
import { CashRegisterService } from './cash-register.service';
import { CashRegisterController } from './cash-register.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CashRegister])],
  controllers: [CashRegisterController],
  providers: [CashRegisterService],
  exports: [CashRegisterService],
})
export class CashRegisterModule { }
