import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { FC, ReactNode } from "react";
import AppDrawer from "../appDrawer/AppDrawer";
import Footer from "../footer/Footer";
import AppContainer from "../appContainer/AppContainer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppDrawer />
      <Box sx={{ flexGrow: "1" }}>
        <AppContainer>
          <main className="mt-[70px]">{children}</main>
        </AppContainer>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
