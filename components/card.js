"use client";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/store/cart-context";
import { currencyFormat } from "@/utils/currency-format";
import { FaCartPlus } from "react-icons/fa";
import * as motion from "motion/react-client"

export default function Card({ item }) {
  const { addMeal } = useContext(CartContext);

  function handleAddToCart() {
    addMeal(item);
  }

  const priceFormat = currencyFormat.format(item.price);

  return (
    <article className="flex flex-col grow p-4 shadow-card rounded-4xl mx-2">
      <header className="flex flex-col gap-2 items-center bg-foreground rounded-t-xl">
        <Image
          src={item.image}
          alt={item.name}
          width={256}
          height={256}
          content="contain"
          className="rounded-md mt-2"
        />
        <h2 className="text-center text-base md:text-2xl text-background my-0 font-semibold font-figtree">
          {item.name}
        </h2>
        <p className="text-orange-red text-center text-sm md:text-lg font-bold">
          {priceFormat}
        </p>
      </header>
      <main className="flex flex-col justify-between gap-4 grow rounded-b-xl bg-background p-4">
        <p className="text-wrap text-center text-sm mdtext-lg">{item.summary}</p>
        <div className="flex justify-center">
          <motion.button
            whileTap={{scale: 0.85}}
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-medium-green py-2 px-4 rounded-md text-background font-semibold text-sm md:text-lg hover:bg-light-green hover:cursor-pointer border-0 w-2/3"
          >
            <FaCartPlus className="text-sm md:text-xl mx-2" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </main>
    </article>
  );
}
