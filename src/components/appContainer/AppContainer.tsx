import { Container, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

interface AppContainerProps {
  children: ReactNode;
}

const AppContainer: FC<AppContainerProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        xs: { maxWidth: theme.breakpoints.down("sm") },
        sm: { maxWidth: theme.breakpoints.down("md") },
        md: { maxWidth: theme.breakpoints.down("lg") },
        lg: { maxWidth: theme.breakpoints.down("xl") },
        xl: { maxWidth: theme.breakpoints.only("xl") },
      }}
    >
      {children}
    </Container>
  );
};

export default AppContainer;
