import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';
import { CartItem } from './cart-item.entity';

import { CartController } from './cart.controller';
import { Cart } from './cart.entity';
import { CartService } from './services';


@Module({
  imports: [ OrderModule, TypeOrmModule.forFeature([Cart]), TypeOrmModule.forFeature([CartItem]) ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
