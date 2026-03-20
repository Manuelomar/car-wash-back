import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extra } from './entities/extra.entity';
import { ExtrasService } from './extras.service';
import { ExtrasController } from './extras.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Extra])],
  controllers: [ExtrasController],
  providers: [ExtrasService],
  exports: [ExtrasService],
})
export class ExtrasModule { }
