import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';
import { Cart, CartItem } from '../entities';

import { CartController } from './cart.controller';
import { CartService } from './services';

@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([Cart, CartItem])],
  providers: [CartService],
  controllers: [CartController],
  exports: [TypeOrmModule],
})
export class CartModule {}
