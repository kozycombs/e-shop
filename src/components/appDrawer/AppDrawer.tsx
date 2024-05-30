import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Drawer } from "@mui/material";
import { APP_DRAWER_WIDTH, APP_URL } from "../../constants";
import Header from "../header/Header";
import { MENU_ITEMS } from "../../constants/menu";

export const AppDrawer: FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleToggleDrawer = () => {
    setOpenDrawer((openDrawer) => !openDrawer);
  };

  return (
    <AppBar component="nav" color="default">
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
          className="font-semibold text-lg block mb-4 px-5 py-2 border"
          onClick={handleToggleDrawer}
        >
          Product Shop
        </Link>
        <nav className="px-5">
          <ul>
            {MENU_ITEMS.map((menu, index) => (
              <li key={`${menu.title}_${index}`} className="mb-2">
                <Link to={menu.url} onClick={handleToggleDrawer}>
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </AppBar>
  );
};

export default AppDrawer;
