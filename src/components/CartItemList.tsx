import { type CartItemListProps } from "../types";
import CartItem from "./CartItem";

const CartItemList = ({ items, isModal = false }: CartItemListProps) => {
  return (
    <ul className="w-full">
      {items.map((item) => (
        <CartItem key={item.name} item={item} isModal={isModal} />
      ))}
    </ul>
  );
};
export default CartItemList;
