import { type ItemProps } from "../types";
import { create } from "zustand";

type CartState = {
  items: ItemProps[];
  totalQuantity: number;
  totalPrice: number;
  addToCart: (item: ItemProps) => void;
  increaseQuantity: (name: string) => void;
  decreaseQuantity: (name: string) => void;
  removeFromCart: (name: string) => void;
  resetCart: () => void;
};

const byNameAsc = (a: ItemProps, b: ItemProps) =>
  a.name.localeCompare(b.name, undefined, {
    sensitivity: "base",
    numeric: true,
  });

const calcTotalPrice = (allItems: ItemProps[]): number =>
  allItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,

  // item { name, price, qty } ascending order
  addToCart: (item) => {
    set((state) => {
      const idx = state.items.findIndex((i) => i.name === item.name);

      let nextItems: ItemProps[];
      if (idx >= 0) {
        nextItems = state.items.slice();
        nextItems[idx] = {
          ...nextItems[idx],
          quantity: nextItems[idx].quantity + item.quantity,
        };
      } else {
        nextItems = [...state.items, item];
      }

      const totalPrc = calcTotalPrice(nextItems);
      const sortedItems = [...nextItems].sort(byNameAsc);

      return {
        items: sortedItems,
        totalQuantity: state.totalQuantity + item.quantity,
        totalPrice: totalPrc,
      };
    });
  },
  increaseQuantity: (name) => {
    const existing = get().items.find((i) => i.name === name);

    if (!existing) return;

    get().addToCart({
      name: existing.name,
      price: existing.price,
      quantity: 1,
    });
  },
  decreaseQuantity: (name) => {
    set((state) => {
      const idx = state.items.findIndex((i) => i.name === name);

      if (idx < 0) return state;

      const selectedItem = state.items[idx];
      const nextQty = selectedItem.quantity - 1;

      let nextItems: ItemProps[];
      if (nextQty > 0) {
        nextItems = state.items.slice();
        nextItems[idx] = { ...selectedItem, quantity: nextQty };
      } else {
        nextItems = state.items.filter((_, n) => n !== idx);
      }
      const totalPrc = calcTotalPrice(nextItems);

      return {
        items: nextItems,
        totalQuantity: state.totalQuantity - 1,
        totalPrice: totalPrc,
      };
    });
  },
  removeFromCart: (name) => {
    set((state) => {
      const idx = state.items.findIndex((i) => i.name === name);

      if (idx < 0) return state;

      const selectedItem = state.items[idx];
      const itemQty = selectedItem.quantity;
      const itemTotalPrice = itemQty * state.items[idx].price;

      const nextItems = state.items.filter((item) => item.name !== name);
      const nextTotalQuantity = state.totalQuantity - itemQty;
      const nextTotalPrice = state.totalPrice - itemTotalPrice;

      return {
        items: nextItems,
        totalQuantity: nextTotalQuantity,
        totalPrice: nextTotalPrice,
      };
    });
  },
  resetCart: () => set({ items: [], totalPrice: 0, totalQuantity: 0 }),
}));
