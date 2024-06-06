import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Badge, Divider, Drawer } from "@mui/material";
import { APP_DRAWER_WIDTH, APP_NAME, APP_URL } from "constants/index";
import Header from "components/header/Header";
import { MENU_ITEMS } from "constants/menu";
import useCartItemsTotal from "hooks/useCartItemsTotal";

export const AppDrawer: FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { getTotalItemsInCart } = useCartItemsTotal();

  const handleToggleDrawer = () => {
    setOpenDrawer((openDrawer) => !openDrawer);
  };

  return (
    <AppBar component="nav" sx={{ backgroundColor: "#ffffff" }}>
      <Header toggleDrawer={handleToggleDrawer} />
      <Drawer
        open={openDrawer}
        onClose={handleToggleDrawer}
        sx={{
          display: { xs: "block", sm: "none" },
          py: "5px",
          px: "5px",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: APP_DRAWER_WIDTH,
          },
        }}
      >
        <Link
          to={APP_URL.HOME}
          className="font-semibold text-lg block px-5 py-4"
          onClick={handleToggleDrawer}
        >
          {APP_NAME}
        </Link>
        <Divider
          sx={{ bgcolor: "rgb(30 41 59 / var(--tw-bg-opacity))", mb: 2 }}
        />
        <nav className="px-5">
          <ul>
            {MENU_ITEMS.map((menu, index) =>
              menu.url === APP_URL.CART ? (
                <Badge
                  key={`${menu.title}_${index}`}
                  badgeContent={getTotalItemsInCart()}
                  color="primary"
                >
                  <li key={`${menu.title}_${index}`} className="mb-2">
                    <Link
                      to={menu.url}
                      className="text-slate-800 font-medium"
                      onClick={handleToggleDrawer}
                    >
                      {menu.title}
                    </Link>
                  </li>
                </Badge>
              ) : (
                <li key={`${menu.title}_${index}`} className="mb-4">
                  <Link
                    to={menu.url}
                    className="text-slate-800 font-medium"
                    onClick={handleToggleDrawer}
                  >
                    {menu.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </Drawer>
    </AppBar>
  );
};

export default AppDrawer;
