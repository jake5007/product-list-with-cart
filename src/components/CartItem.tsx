import { type CartItemProps } from "../types";
import { useCartStore } from "../store/useCartStore";

const CartItem = ({ item, isModal }: CartItemProps) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleRemoveFromCart = (itemName: string) => {
    removeFromCart(itemName);
  };

  if (isModal) {
    return (
      <li className="py-3.5 grid grid-cols-[1fr_2fr_1fr] items-center border-b border-neutral-200">
        <img
          src={item.thumb}
          alt="dessert"
          className="rounded-lg max-w-[90%]"
        />
        <div className="flex flex-col gap-2 pl-3">
          <h5>{item.name}</h5>
          <div>
            <span className="text-red font-[500] mr-3">{item.quantity}x</span>
            <span className="text-neutral-400">@ ${item.price.toFixed(2)}</span>
          </div>
        </div>
        <span className="text-rose-900 font-[600] justify-self-end ">
          ${(item.quantity * item.price).toFixed(2)}
        </span>
      </li>
    );
  }

  return (
    <li className="flex w-full justify-between items-center gap-3 border-b border-neutral-100 py-3">
      <div className="flex flex-col gap-1">
        <h5 className="font-[500]">{item.name}</h5>
        <div className="flex gap-3">
          <span className="text-red font-[500]">{item.quantity}x</span>
          <span className="text-neutral-400">@ ${item.price.toFixed(2)}</span>
          <span className="text-neutral-500 font-[500]">
            ${(item.quantity * item.price).toFixed(2)}
          </span>
        </div>
      </div>
      <button
        onClick={() => handleRemoveFromCart(item.name)}
        className="border border-neutral-400 text-neutral-400 rounded-full p-0.5
              cursor-pointer hover:text-black hover:border-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
        >
          <path
            fill="currentColor"
            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
          />
        </svg>
      </button>
    </li>
  );
};
export default CartItem;
