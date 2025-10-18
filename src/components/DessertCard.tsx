import { type DessertCardProps } from "../types";
import { useCartStore } from "../store/useCartStore";

const DessertCard = (props: DessertCardProps) => {
  const { image, name, category, price } = props;
  const { addToCart, increaseQuantity, decreaseQuantity } = useCartStore();

  const dessert = useCartStore((state) =>
    state.items.find((item) => item.name === name)
  );

  const inCart = !!dessert;

  const handleAddToCart = () => {
    addToCart({ name, price, quantity: 1, thumb: image.thumbnail });
  };

  const handleIncreaseQuantity = () => {
    increaseQuantity(name);
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(name);
  };

  return (
    <div className="flex flex-col items-start">
      <img
        src={image.desktop}
        alt={name}
        className={`w-full object-cover rounded-md ${
          inCart && dessert.quantity > 0 && "border-2 border-red"
        }`}
      />
      <div className="flex flex-col my-7 gap-1 relative w-full">
        <span className="text-neutral-500">{category}</span>
        <h3>{name}</h3>
        <span className="text-red font-[600]">${price.toFixed(2)}</span>
        {inCart && dessert.quantity > 0 ? (
          <div
            className="absolute left-[50%] top-[-40%] -translate-x-1/2 -translate-y-1/2 flex justify-around items-center bg-red w-[60%] py-3 gap-2
       rounded-full"
          >
            <button
              onClick={handleDecreaseQuantity}
              className="border border-neutral-300 px-1 py-2 rounded-full cursor-pointer text-white hover:bg-white hover:text-red"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="none"
                viewBox="0 0 10 2"
              >
                <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>
            <span className="text-white">{dessert.quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="border border-neutral-300 p-1 rounded-full cursor-pointer text-white hover:bg-white hover:text-red"
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
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="absolute left-[50%] top-[-40%] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-white border border-neutral-300 w-[60%] py-3 gap-2
       rounded-full cursor-pointer hover:text-red hover:border-red"
          >
            <img src="./assets/images/icon-add-to-cart.svg" alt="cart" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
export default DessertCard;
