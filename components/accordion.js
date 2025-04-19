"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Card from "./card";

export default function Accordion({ category, menus, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-4 mx-4 my-12 ">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="ml-12 py-2 text-4xl text-orange-red font-bold flex gap-1 items-center"
      >
        {category}
        <span className="text-xl ml-4">{isOpen ? "▲" : "▼"}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={"content"}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-12 pb-6 pt-2">
              {menus.map((menu) => (
                <Card key={menu.id} item={menu} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
