import { FC } from "react";
import { Product } from "../../interface/Product";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

interface ProductItemProps {
  product: Product;
}
const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.title}
        image={product.image}
        sx={{
          height: "240px",
          maxHeight: "240px",
          objectFit: "contain",
        }}
      />
      <CardContent sx={{ bgcolor: "#f5f5f5" }}>
        <Typography
          gutterBottom
          sx={{
            fontSize: 18,
            fontWeight: 500,
            ":hover": { textDecoration: "underline" },
          }}
        >
          {product.title}
        </Typography>
        <Typography gutterBottom sx={{ fontSize: 18 }}>
          &pound;{Number(product.price).toFixed(2)}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component="p">{product.rating.rate}</Typography>
          <Rating
            name="read-only"
            value={Number(product.rating.rate)}
            readOnly
          />
          <Typography component="p">{product.rating.count} reviews</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
