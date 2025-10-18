import { type CartProps } from "../types";
import { useCartStore } from "../store/useCartStore";
import EmptyCart from "./EmptyCart";
import CartItemList from "./CartItemList";

const Cart = ({ onModalOpen }: CartProps) => {
  const { totalQuantity, totalPrice, items } = useCartStore();

  return (
    <div
      className="bg-white flex flex-col py-4 px-5 rounded-lg items-center mb-5
      w-full"
    >
      <h3 className="text-red font-[800] self-start mb-3 text-xl">
        Your Cart ({totalQuantity})
      </h3>
      {items.length > 0 ? (
        <>
          <CartItemList items={items} />
          <div className="py-5 flex w-full justify-between items-center">
            <span className="text-rose-500">Order Total</span>
            <span className="text-xl text-rose-900 font-[800]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-rose-50 py-3 px-6 rounded-lg flex items-center justify-center gap-2">
            <img src="./assets/images/icon-carbon-neutral.svg" alt="neutral" />
            <span className="text-[14px]">
              This is a <b>carbon-neutral</b> delivery
            </span>
          </div>
          <button
            onClick={onModalOpen}
            className="w-full bg-red rounded-full py-2.5 text-white my-4 
            cursor-pointer hover:bg-[hsl(12,20%,34%)]"
          >
            Confirm Order
          </button>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};
export default Cart;
