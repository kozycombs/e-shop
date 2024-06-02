import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import {
  fetchProducts,
  productsSelector,
  updateProducts,
} from "../../store/productSlice";
import ProductItem from "../../components/productItem/ProductItem";
import Spinner from "../../components/spinner/Spinner";
import ErrorBanner from "../../components/errorBanner/ErrorBanner";

const Home: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsSelector);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetchProducts();
        dispatch(updateProducts(result));
        setLoading(false);
      } catch (error) {
        setError("Failed to load our products. Please try again later");
        setLoading(false);
      }
    };
    if (products.data.length <= 0) {
      setLoading(true);
      getProducts();
    }
  }, [products, dispatch]);

  return (
    <Box>
      <Typography variant="h3" sx={{ py: 4 }}>
        Products
      </Typography>
      {loading && (
        <Box className="flex justify-center">
          <Spinner />
        </Box>
      )}
      {error.length > 0 && <ErrorBanner message={error} />}
      <Grid
        container
        spacing={{ xs: 4, md: 3 }}
        rowSpacing={4}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {products.data.map((product, index) => (
          <Grid item xs={1} sm={4} md={4} key={index}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
