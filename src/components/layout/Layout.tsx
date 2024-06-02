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
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1350,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppDrawer />
      <Box sx={{ flexGrow: "1" }}>
        <AppContainer>
          <main className="pt-[89px]">{children}</main>
        </AppContainer>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
