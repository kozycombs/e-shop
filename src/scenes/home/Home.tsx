import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import { fetchProducts, productsSelector } from "../../store/productSlice";
import ProductItem from "../../components/productItem/ProductItem";
import Spinner from "../../components/spinner/Spinner";
import ErrorBanner from "../../components/errorBanner/ErrorBanner";
import { Link } from "react-router-dom";
import { APP_URL } from "../../constants";
import { AppDispatch } from "../../store";

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: products, loading, error } = useSelector(productsSelector);

  useEffect(() => {
    if (products.length <= 0) {
      dispatch(fetchProducts());
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
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {!loading && products.length <= 0 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              color: "#ccc",
              my: 10,
            }}
          >
            <Typography component="p">No products found.</Typography>
          </Box>
        )}
        {products.map((product, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Link to={`${APP_URL.PRODUCT}/${product.id}`}>
              <ProductItem product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
