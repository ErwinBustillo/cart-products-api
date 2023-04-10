import { Cart, CartItem } from '../models';


const AVG_PRODUCT_PRICE = 5;

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart ? cart.items.reduce((acc: number, { count }: CartItem) => {
    return acc += AVG_PRODUCT_PRICE * count; // Products table is not integrated in RDS, hard-code price for every product
  }, 0) : 0;
}
