"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useActionState, useRef } from "react";
import { CartContext } from "@/store/cart-context";
import { currencyFormat } from "@/utils/currency-format";

export default function CartForm({ action }) {
  const router = useRouter();
  const { items, addMeal, decreaseMeal, clearCart, clearMeal } =
    use(CartContext);

  const [state, formAction] = useActionState(action, {});
  const paymentInitiate = useRef(false);

  if (
    state?.name &&
    state?.address &&
    state?.phone &&
    state?.cart &&
    state?.total &&
    !paymentInitiate.current
  ) {
    paymentInitiate.current = true;
    async function handlePayment() {
      try {
        const response = await fetch("/api/tokenizer", {
          method: "POST",
          body: JSON.stringify({
            totalPrice: state.total,
            items: state.cart,
            customer: {
              name: state.name,
              address: state.address,
              phone: state.phone,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("No response");

        const data = await response.json();

        // redirect to midtrans gateway
        if (data.token) {
          window.snap.pay(data.token, {
            onSuccess: () => {
              clearCart();
              router.push("/thanks");
            },
            onPending: () => {
              clearCart();
              router.push("/pending")
            },
          });
        }
      } catch (error) {
        console.error("Error processing payment", error);
      }
    }
    handlePayment();
  }

  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  const totalPriceFormat = currencyFormat.format(totalPrice);

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <div className="">
        <label
          htmlFor="name"
          className="block text-lg font-semibold font-figtree"
        >
          Name{" "}
          {state?.errMsg?.name && (
            <span className="inline-block text-xs text-cherry-red">
              {state.errMsg.name}
            </span>
          )}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="block py-2 px-4 border-0 shadow bg-gray-200 text-foreground w-2/5"
        />
      </div>
      <div className="">
        <label
          htmlFor="address"
          className="block text-lg font-semibold font-figtree"
        >
          Delivery Address{" "}
          {state?.errMsg?.address && (
            <span className="inline-block text-xs text-cherry-red">
              {state.errMsg.address}
            </span>
          )}
        </label>
        <textarea
          rows={3}
          type="text"
          id="address"
          name="address"
          className="block py-2 px-4 border-0 shadow bg-gray-200 text-foreground w-2/5"
        />
      </div>
      <div className="">
        <label
          htmlFor="phone"
          className="block text-lg font-semibold font-figtree"
        >
          Phone / Whatapp{" "}
          {state?.errMsg?.phone && (
            <span className="inline-block text-xs text-cherry-red">
              {state.errMsg.phone}
            </span>
          )}
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="block py-2 px-4 border-0 shadow bg-gray-200 text-foreground w-2/5"
        />
      </div>
      <div className="">
        <label
          htmlFor="order"
          className="block text-lg font-semibold font-figtree mb-3"
        >
          Orders:
        </label>
        {items.map((item) => {
          const subprice = item.quantity * item.price;
          const subpriceFormated = currencyFormat.format(subprice);
          return (
            <div className="flex items-center justify-between" key={item.id}>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
                <div className="">
                  <h2 className="text-2xl text-orange-red font-bold">
                    {item.name}
                  </h2>
                  <div className="flex items-center">
                    <span>Quantity: </span>
                    <button
                      type="button"
                      onClick={() => decreaseMeal(item.id)}
                      className="p-2 text-xl hover:cursor-pointer hover:text-light-blue"
                    >
                      -
                    </button>
                    <span className="font-bold text-xl text-orange-red">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => addMeal(item)}
                      className="p-2 text-xl hover:cursor-pointer hover:text-light-blue"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-lg font-bold">{subpriceFormated}</p>
                <button
                  type="button"
                  onClick={() => clearMeal(item.id)}
                  className="px-4 py-2 bg-transparent rounded-md"
                  aria-label="hapus"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 transition-colors duration-300 hover:fill-cherry-red"
                    fill= "#DF1734"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <h2 className="text-2xl font-bold">Total : {totalPriceFormat}</h2>
      <input
        type="hidden"
        id="cart"
        name="cart"
        value={JSON.stringify(items)}
      />
      <input
        type="hidden"
        id="totalPrice"
        name="totalPrice"
        value={totalPrice}
      />
      <div className="flex gap-4 items-end">
        <button
          type="reset"
          className="bg-transparent text-xl py-2 px-4"
          onClick={() => {
            items.length > 0 ? clearCart() : router.push("/");
          }}
        >
          {items.length > 0 ? "CLEAR" : "BACK"}
        </button>
        <button
          disabled={items.length === 0}
          className="bg-medium-blue px-4 py-2 rounded-md text-background font-semibold text-xl hover:bg-light-green hover:cursor-pointer"
        >
          CHECKOUT NOW
        </button>
      </div>
    </form>
  );
}
