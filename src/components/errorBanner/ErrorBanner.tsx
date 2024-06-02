import { Box, Divider, Typography } from "@mui/material";
import { FC } from "react";

interface ErrorBannerProps {
  message: string;
}

const ErrorBanner: FC<ErrorBannerProps> = ({ message }) => {
  return (
    <Box
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Something went wrong</Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Typography component="p">{message}</Typography>
      </Box>
    </Box>
  );
};

export default ErrorBanner;
