import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  cart_id: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'integer' })
  count: number;

  @ManyToOne(
    () => Cart,
    cart => cart.items,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'cart_id' })
  cart?: Cart;
}
