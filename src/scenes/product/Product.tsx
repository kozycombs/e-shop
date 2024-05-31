import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { fetchProduct, productsSelector } from "../../store/productSlice";
import { Product as ProductInterface } from "../../interface/Product";
import Spinner from "../../components/spinner/Spinner";

const Product: FC = () => {
  const { id } = useParams();
  const products = useSelector(productsSelector);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductInterface>();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      const result = await fetchProduct(Number(id));
      setProduct(result);
      setLoading(false);
    };

    // If product list is empty get product detail from API otherwiser get product detail from cached product list.
    if (products.data.length <= 0) {
      setLoading(true);
      getProduct();
    } else {
      setLoading(true);
      const product =
        products.data.find(
          (currentProduct) => currentProduct.id === Number(id)
        ) || null;
      if (product) {
        setProduct(product);
      }
      setLoading(false);
    }
  }, [id, products]);

  const handleQuantityChange = (event: SelectChangeEvent) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", quantity);
  };

  return (
    <Box sx={{ pt: 4 }}>
      {loading && (
        <Box className="flex justify-center">
          <Spinner />
        </Box>
      )}

      <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 1, sm: 4 }}>
        <Grid item xs={1} sm={2}>
          <Box
            component="img"
            sx={{
              height: "auto",
              width: "100%",
              maxHeight: { xs: 400 },
              objectFit: "contain",
              // maxWidth: { xs: 350, md: 250 },
            }}
            alt={product?.title}
            src={product?.image}
          />
        </Grid>
        <Grid item xs={1} sm={2}>
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
            &pound;{product?.price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                id="quantity"
                value={`${quantity}`}
                onChange={handleQuantityChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              size="medium"
              disableElevation
              onClick={handleAddToCart}
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
