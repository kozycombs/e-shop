import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";
import { fetchProduct, productsSelector } from "store/productSlice";
import { Product as ProductInterface } from "interface/Product";
import Spinner from "components/spinner/Spinner";
import { addToCart, cartSelector, updateCartProduct } from "store/cartSlice";
import { AppDispatch } from "store/index";
import { ToastMessage } from "interface/ToastMessage";
import { PRODUCT_QUATITY_COUNT } from "constants/index";
import ErrorBanner from "components/errorBanner/ErrorBanner";

const Product: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data: products } = useSelector(productsSelector);
  const { data: cart } = useSelector(cartSelector);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductInterface>();
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<ToastMessage>({
    message: "",
    severity: "success",
  });
  const [error, setError] = useState("");
  const userId = 1; // This is a dummy user id, since there is no logged in functionality.
  const vertical = "top";
  const horizontal = "right";

  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await dispatch(fetchProduct(Number(id))).unwrap();
        setProduct(result);
        setLoading(false);
      } catch (error) {
        setError("Failed to load our product. Please try again later");
        setLoading(false);
      }
    };

    // If product list is empty get product detail from API
    // otherwiser get product detail from cached product list.

    if (products.length <= 0) {
      setLoading(true);
      getProduct();
    } else {
      setLoading(true);
      const product =
        products.find((currentProduct) => currentProduct.id === Number(id)) ||
        null;
      if (product) {
        setProduct(product);
      }
      setLoading(false);
    }
  }, [id, products, dispatch]);

  const resetToastMessage = () => {
    setToastMessage({ message: "", severity: "success" });
  };

  const handleQuantityChange = (event: SelectChangeEvent) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = async () => {
    if (!product) {
      return;
    }

    try {
      setLoading(true);
      const date = new Date().toISOString();

      // If cart is null add to cart else update with cart id.
      if (!cart) {
        const result = await dispatch(
          addToCart({
            userId,
            date,
            products: [{ productId: product?.id, quantity }],
          })
        ).unwrap();
        if (result.id) {
          setToastMessage({
            message: "Product added to cart successfully",
            severity: "success",
          });
        } else {
          setToastMessage({
            message: "Failed to add product to cart",
            severity: "error",
          });
        }
      } else {
        const productFoundIndex = cart.products.findIndex(
          (currentProduct) => currentProduct.productId === product.id
        );

        if (productFoundIndex > -1) {
          const updatedProduct = {
            ...cart.products[productFoundIndex],
            quantity: cart.products[productFoundIndex].quantity + quantity,
          };
          const otherProducts = cart.products.filter(
            (currentProduct) => currentProduct.productId !== product.id
          );
          const products = [...otherProducts, updatedProduct];
          const result = await dispatch(
            updateCartProduct({ cartId: cart.id, userId, date, products })
          ).unwrap();
          if (result.id) {
            setToastMessage({
              message: "Product added to cart successfully",
              severity: "success",
            });
            setQuantity(1);
          } else {
            setToastMessage({
              message: "Failed to add product to cart",
              severity: "error",
            });
          }
        } else {
          const products = [
            ...cart.products,
            { productId: product?.id, quantity },
          ];
          const result = await dispatch(
            updateCartProduct({ cartId: cart.id, userId, date, products })
          ).unwrap();
          if (result.id) {
            setToastMessage({
              message: "Product added to cart successfully",
              severity: "success",
            });
            setQuantity(1);
          } else {
            setToastMessage({
              message: "Failed to add product to cart",
              severity: "error",
            });
          }
        }
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to add product to cart. Please try again later");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pt: 4 }}>
      {loading && (
        <Box className="flex justify-center">
          <Spinner />
        </Box>
      )}

      {error.length > 0 && <ErrorBanner message={error} />}

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

      <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 1, sm: 4 }}>
        <Grid item xs={1} sm={2} sx={{ marginBottom: 10 }}>
          <Box
            component="img"
            sx={{
              height: "auto",
              width: "100%",
              maxHeight: { xs: 400 },
              objectFit: "contain",
            }}
            alt={product?.title}
            src={product?.image}
          />
        </Grid>
        <Grid item xs={1} sm={2}>
          <Box></Box>
          <Typography
            variant="h1"
            sx={{ mb: 1, fontWeight: "400", fontSize: 24 }}
          >
            {product?.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "end", mb: 2 }}>
            <Typography
              component="span"
              sx={{
                mr: 1,
                fontSize: 16,
              }}
            >
              {product?.rating.rate}
            </Typography>
            <Rating
              name="read-only"
              value={Number(product?.rating.rate)}
              readOnly
            />
            <Typography
              component="span"
              sx={{
                ml: 1,
                mt: 1,
                fontSize: 16,
                textDecoration: "underline",
              }}
            >
              {product?.rating.count} reviews
            </Typography>
          </Box>
          <Typography
            component="p"
            sx={{ fontSize: 24, fontWeight: 400, mb: 4 }}
          >
            &pound;{Number(product?.price).toFixed(2)}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                id="quantity"
                data-test="quantity"
                value={`${quantity}`}
                onChange={handleQuantityChange}
              >
                {Array(PRODUCT_QUATITY_COUNT)
                  .fill("_")
                  .map((_, index) => (
                    <MenuItem key={index} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              size="medium"
              disableElevation
              onClick={handleAddToCart}
              sx={{ textTransform: "none" }}
            >
              Add to Cart
            </Button>
          </Box>
          <Divider />
          <Typography
            component="p"
            sx={{
              mb: 2,
              mt: 4,
              fontSize: 16,
            }}
          >
            {product?.description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
