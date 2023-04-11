/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { Cart } from '../models';
import { Cart as CartEntity, CartItem as CartItemEntity } from '../../entities';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartsRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemsRepository: Repository<CartItemEntity>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartsRepository.findOne({
      where: { user_id: userId },
      relations: ['items'],
    });

    if (!cart) {
      return null;
    }

    return {
      id: cart.id,
      items: cart.items.map(cartItem => ({
        product: {
          id: cartItem.productId,
          title: 'test product',
          description: 'test description',
          price: 100,
        },
        count: cartItem.count,
      })),
    };
  }

  async createByUserId(userId: string) {
    const id = uuidv4();

    const cartData = {
      id: id,
      user_id: userId,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
      status: 'OPEN',
    };
    const cart = await this.cartsRepository.insert(cartData);

    if (!cart) {
      return null;
    }

    return {
      id: cartData.id,
      items: [],
    };
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    let userCart = await this.findByUserId(userId);
    if (userCart) {
      return userCart;
    }

    userCart = await this.createByUserId(userId);

    return userCart;
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const cart = await this.cartsRepository.findOne(userId);
    console.log('items', items);
    cart.items = items.map(
      item =>
        ({
          cartId: cart.id,
          productId: item.product.id,
          count: item.count,
        } as any),
    );

    cart.updated_at = new Date().toString();

    const updatedCart = await this.cartsRepository.save(cart);

    if (!updatedCart) {
      return null;
    }

    return {
      id: cart.id,
      items: cart.items.map(cartItem => ({
        product: {
          id: cartItem.productId,
          title: 'test product',
          description: 'test description',
          price: 100,
        },
        count: cartItem.count,
      })),
    };
  }

  async removeByUserId(userId: string): Promise<void> {
    const cart = await this.cartsRepository.findOne(userId);
    if (!cart) {
      return null;
    }
    await this.cartsRepository.remove(cart);
  }
}
