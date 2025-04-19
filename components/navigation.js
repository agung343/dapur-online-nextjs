"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { CartContext } from "@/store/cart-context";
import { FaShoppingCart, FaHamburger } from "react-icons/fa";

export default function Navigation() {
  const [showMobile, setShowMobile] = useState(false);
  const pathname = usePathname();

  const { items } = useContext(CartContext);
  const totalMeals = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const defaultClass = "py-0.5 md:py-1.5 px-1 md:px-3.5 text-background text-base md:text-xl";
  return (
    <>
      <nav className="flex gap-2 items-center">
        <div className="md:hidden relative">
          <button onClick={() => setShowMobile((prev) => !prev)}>
            <FaHamburger size={16} className="text-background" />
          </button>
        </div>
        {showMobile && (
          <>
            <ul className="absolute flex flex-col gap-4 top-full left-0 w-40 bg-foreground text-background text-center md:hidden shadow-md z-50 p-3">
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
            </ul>
          </>
        )}
        <ul className="hidden md:flex items-center gap-2">
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
        </ul>
        <div className="mr-4">
          <Link href={"/cart"} className={`${defaultClass} flex`}>
            <FaShoppingCart className="text-xl" />
            <div className="relative">
              <span className="absolute -bottom-3 -right-3 px-0.5 bg-orange-red text-background rounded-full text-sm border-[1px] border-orange-red">
                {totalMeals}
              </span>
            </div>
          </Link>
        </div>
       
      </nav>
    </>
  );
}
