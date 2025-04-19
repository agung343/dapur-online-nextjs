"use client";
import { useEffect } from "react";
import CartForm from "@/components/cart-form";
import { cartAction } from "@/action/order.action.js";

export default function CartPage() {
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <section id="cart" className="w-[80%] mx-auto my-20">
      <h1 className="mb-4 tracking-wider text-center text-4xl font-bold font-oswald">
        Your Order
      </h1>
      <CartForm action={cartAction} />
    </section>
  );
}
