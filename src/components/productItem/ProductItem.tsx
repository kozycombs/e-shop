import { FC } from "react";
import { Product } from "../../interface/Product";
import {
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { APP_URL } from "../../constants";

interface ProductItemProps {
  product: Product;
}
const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <Link to={`${APP_URL.PRODUCT}/${product.id}`}>
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
        <CardContent>
          <Typography gutterBottom className="!text-lg">
            {product.title}
          </Typography>
          <Typography gutterBottom className="!text-lg">
            &pound;{product.price}
          </Typography>
          <Rating
            name="read-only"
            value={Number(product.rating.rate)}
            readOnly
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItem;
