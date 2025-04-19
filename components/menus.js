import Accordion from "./accordion";
import { getMenus } from "@/utils/db";

function MenuGrid({ category, menus, open }) {
  const filteredMenus = menus.filter((menu) => menu.category === category);
  return (
    <Accordion key={category} category={category} menus={filteredMenus} defaultOpen={open} />
  );
}

export default async function Menus() {
  const menus = await getMenus();
  const categoryArray = [
    {
      category: "Appetizer",
      open: true,
    },
    {
      category: "Main Course",
      open: true,
    },
    {
      category: "Dessert",
      open: true,
    },
    {
      category: "Fast Food",
      open: false,
    },
    {
      category: "Asian Cuisine",
      open: false,
    },
  ];

  return (
    <>
      {categoryArray.map((item) => (
        <MenuGrid
          key={item.category}
          menus={menus}
          category={item.category}
          open={item.open}
        />
      ))}
    </>
  );
}
