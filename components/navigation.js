"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "@/store/cart-context";
import { FaShoppingCart } from "react-icons/fa";

export default function Navigation() {
  const pathname = usePathname();

  const { items } = useContext(CartContext);
  const totalMeals = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const defaultClass = "py-1.5 px-3.5 text-background text-xl";
  return (
    <>
      <nav>
        <ul className="flex items-center gap-2 mr-6">
          <li>
            <Link
              href={"/"}
              className={
                pathname === "/"
                  ? `${defaultClass} bg-orange-red rounded-md`
                  : defaultClass
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/about"}
              className={
                pathname === "/about"
                  ? `${defaultClass} bg-orange-red rounded-md`
                  : defaultClass
              }
            >
              About Us
            </Link>
          </li>
          <li>
            <Link href={"/cart"} className={`${defaultClass} flex`}>
              <FaShoppingCart className="text-xl" />
              <div className="relative">
                <span className="absolute -bottom-3 -right-3 px-0.5 bg-orange-red text-background rounded-full text-sm border-[1px] border-orange-red">
                  {totalMeals}
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
