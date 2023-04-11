import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import { CartItem } from './cart-item.entity';

export enum CART_STATUS {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity('carts')
export class Cart {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'timestamp', nullable: false })
  created_at: string;

  @Column({ type: 'timestamp', nullable: false })
  updated_at: string;

  @Column({ type: 'enum', enum: CART_STATUS, default: CART_STATUS.OPEN })
  status: string;

  @OneToMany(
    () => CartItem,
    cartItem => cartItem.cart,
    { cascade: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  items: CartItem[];
}
