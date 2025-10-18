import { useState } from "react";

import DessertCardList from "./components/DessertCardList";
import Cart from "./components/Cart";
import OrderConfirmModal from "./components/OrderConfirmModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-rose-50 px-2">
        <main
          className="m-auto max-w-[1440px] font-red-hat flex flex-col items-center px-8 sm:px-0
    sm:flex-row sm:justify-center sm:items-start text-[16px] sm:gap-5"
        >
          <section className="mt-10">
            <h1 className="text-rose-900 text-4xl font-[900] mb-5 tracking-tight">
              Desserts
            </h1>
            <DessertCardList />
          </section>
          <aside className="mt-10 shrink-0 grow-[0.8] w-full sm:w-auto">
            <Cart onModalOpen={() => setIsModalOpen(true)} />
          </aside>
        </main>
      </div>
      {isModalOpen && (
        <OrderConfirmModal onModalClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default App;
