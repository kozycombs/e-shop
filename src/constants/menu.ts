import { APP_URL } from "constants/index";

interface Menu {
  title: string;
  url: string;
  isActive: boolean;
}

export const MENU_ITEMS: Menu[] = [
  {
    title: "All Products",
    url: APP_URL.HOME,
    isActive: false,
  },
  {
    title: "Cart",
    url: APP_URL.CART,
    isActive: false,
  },
];
