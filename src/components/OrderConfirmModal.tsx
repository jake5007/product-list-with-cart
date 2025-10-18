import { useCartStore } from "../store/useCartStore";
import { type OrderConfirmModalProps } from "../types";
import CartItemList from "./CartItemList";

const OrderConfirmModal = ({ onModalClose }: OrderConfirmModalProps) => {
  const { items, totalPrice, resetCart } = useCartStore();

  const handleNewOrder = () => {
    onModalClose();
    resetCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center bg-black/50 overflow-hidden">
      <div
        className="bg-white p-6 rounded-t-xl sm:rounded-xl shadow-lg w-full sm:max-w-lg
             transition-transform transform s opacity-0 animate-fade-in flex flex-col items-start
             max-h-[90vh] overflow-hidden"
      >
        <img
          src="./assets/images/icon-order-confirmed.svg"
          alt="confirmed"
          className="my-5"
        />
        <h1 className="text-4xl font-[900] text-rose-900">
          Order <br />
          Confirmed
        </h1>
        <span className="mt-3 text-rose-500">We hope you enjoy your food!</span>
        {
          // re-use cartItemList
          <div className="p-6 my-5 bg-rose-50 rounded-lg w-full overflow-y-auto overscroll-contain">
            <CartItemList items={items} isModal />
            <div className="py-5 flex w-full justify-between items-center">
              <span className="text-rose-500">Order Total</span>
              <span className="text-xl text-rose-900 font-[800]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        }
        <button
          onClick={handleNewOrder}
          className="mt-2 bg-red w-full text-white rounded-full py-3 
          cursor-pointer hover:bg-[hsl(12,20%,34%)]"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};
export default OrderConfirmModal;
