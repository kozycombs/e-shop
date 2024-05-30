import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

const Spinner: FC = () => (
  <Box sx={{ display: "flex" }}>
    <CircularProgress />
  </Box>
);

export default Spinner;
