import { FC } from "react";
import { Link } from "react-router-dom";
import { Badge, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppContainer from "../appContainer/AppContainer";
import { APP_NAME, APP_URL } from "../../constants";
import { MENU_ITEMS } from "../../constants/menu";
import useCartItemsTotal from "../../hooks/useCartItemsTotal";

interface HeaderProps {
  toggleDrawer: () => void;
}
const Header: FC<HeaderProps> = ({ toggleDrawer }) => {
  const { getTotalItemsInCart } = useCartItemsTotal();

  return (
    <AppContainer>
      <header className="flex justify-between items-center py-4">
        <Link
          to={APP_URL.HOME}
          className="font-semibold text-2xl text-slate-800"
        >
          {APP_NAME}
        </Link>
        <nav className="hidden sm:block">
          <ul className="flex gap-8">
            {MENU_ITEMS.map((menu, index) =>
              menu.url === APP_URL.CART ? (
                <Badge
                  key={`${menu.title}_${index}`}
                  badgeContent={getTotalItemsInCart()}
                  color="primary"
                >
                  <li>
                    <Link to={menu.url} className="text-slate-800 font-medium">
                      {menu.title}
                    </Link>
                  </li>
                </Badge>
              ) : (
                <li key={`${menu.title}_${index}`}>
                  <Link to={menu.url} className="text-slate-800 font-medium">
                    {menu.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{
            mr: 2,
            display: { sm: "none" },
            color: "rgb(30 41 59 / var(--tw-bg-opacity))",
          }}
          className="bg-slate-800"
        >
          <MenuIcon />
        </IconButton>
      </header>
    </AppContainer>
  );
};

export default Header;
