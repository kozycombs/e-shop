import { FC, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { productsSelector } from "../../store/productSlice";
import { cartSelector, resetCart } from "../../store/cartSlice";
import CartItem from "../../components/cartItem/CartItem";
import { ToastMessage } from "../../interface/ToastMessage";
import { Link } from "react-router-dom";
import { APP_URL } from "../../constants";

const Cart: FC = () => {
  const dispatch = useDispatch();
  const { data: products } = useSelector(productsSelector);
  const { data: cart } = useSelector(cartSelector);
  const [toastMessage, setToastMessage] = useState<ToastMessage>({
    message: "",
    severity: "success",
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const vertical = "top";
  const horizontal = "right";

  const resetToastMessage = () => {
    setToastMessage({ message: "", severity: "success" });
  };

  const getCartTotal = () => {
    return cart?.products.reduce((accumulator, cartItem) => {
      const cartProduct = products.find(
        (product) => product.id === cartItem.productId
      );
      if (!cartProduct) {
        return 0;
      }
      return (accumulator += cartProduct.price * cartItem.quantity);
    }, 0);
  };

  const handlePlaceOrder = () => {
    setOrderConfirmed((prev) => !prev);
    dispatch(resetCart());
  };

  if (orderConfirmed) {
    return (
      <Box sx={{ pt: 4 }}>
        <Typography variant="h1" sx={{ fontSize: 30, mb: 2 }}>
          Order Confirmation
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Typography>Your order was placed successfully.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 4 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={toastMessage?.message.length > 0}
        autoHideDuration={2000}
        onClose={resetToastMessage}
        key={vertical + horizontal}
      >
        <Alert
          onClose={resetToastMessage}
          severity={toastMessage?.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastMessage?.message}
        </Alert>
      </Snackbar>
      <Typography variant="h1" sx={{ fontSize: 30, mb: 2 }}>
        Your Basket
      </Typography>
      <Divider sx={{ mb: 4 }} />
      {!cart || cart?.products.length <= 0 ? (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography>
            Your basket is empty. View our{" "}
            <Link to={APP_URL.HOME} className="underline hover:no-underline">
              range of products
            </Link>
            .
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 1, md: 4 }} columns={{ xs: 1, sm: 6 }}>
          <Grid item xs={1} sm={4}>
            {cart?.products.map((cartItem, index) => {
              const cartProduct = products.find(
                (product) => product.id === cartItem.productId
              );
              if (!cartProduct) {
                return "";
              }
              return (
                <CartItem
                  key={index}
                  cartItem={cartItem}
                  product={cartProduct}
                />
              );
            })}
          </Grid>
          <Grid item xs={1} sm={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h2" sx={{ fontSize: 24, mb: 2 }}>
                  Summary
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    component="p"
                    sx={{ fontSize: 18, fontWeight: 500, mb: 4 }}
                  >
                    Total
                  </Typography>
                  <Typography
                    component="p"
                    sx={{ fontSize: 18, fontWeight: 500, mb: 4 }}
                  >
                    &pound;{getCartTotal()}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="medium"
                  color="success"
                  onClick={handlePlaceOrder}
                  sx={{ ml: "auto", display: "block" }}
                >
                  Place you order
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
