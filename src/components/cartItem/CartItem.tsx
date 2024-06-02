import { FC } from "react";
import { CartProduct } from "../../interface/Cart";
import { Product } from "../../interface/Product";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { APP_URL } from "../../constants";

interface CartItemProps {
  cartItem: CartProduct;
  product: Product;
}

const CartItem: FC<CartItemProps> = ({ cartItem, product }) => {
  return (
    <Grid
      container
      spacing={{ xs: 4, md: 3 }}
      rowSpacing={2}
      columns={{ xs: 1, sm: 5 }}
      sx={{ mb: 5 }}
    >
      <Grid item xs={1} sm={1}>
        <Link to={`${APP_URL.PRODUCT}/${product.id}`}>
          <Box
            component="img"
            sx={{
              height: "auto",
              width: "100%",
              maxHeight: { xs: 100 },
              objectFit: "contain",
            }}
            alt={product?.title}
            src={product?.image}
          />
        </Link>
      </Grid>
      <Grid item xs={1} sm={3}>
        <Link to={`${APP_URL.PRODUCT}/${product.id}`}>
          <Typography component="p" sx={{ fontSize: 18, fontWeight: 500 }}>
            {product.title}
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: 14, fontWeight: 400, mb: 4 }}
          >
            quantity: {cartItem.quantity}
          </Typography>
        </Link>
      </Grid>

      <Grid item xs={1} sm={1}>
        <Box>
          <Typography
            component="p"
            sx={{ fontSize: 18, fontWeight: 400, mb: 4 }}
          >
            &pound;{product?.price * cartItem.quantity}
          </Typography>
        </Box>
      </Grid>
      <Divider sx={{ mb: 4 }} />
    </Grid>
  );
};

export default CartItem;
