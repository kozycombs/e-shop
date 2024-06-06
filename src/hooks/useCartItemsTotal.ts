import { useSelector } from "react-redux";
import { cartSelector } from "store/cartSlice";

const useCartItemsTotal = () => {
  const { data: cart } = useSelector(cartSelector);

  const getTotalItemsInCart = () => {
    return cart?.products.reduce((accumulator, product) => {
      return (accumulator += product.quantity);
    }, 0);
  };
  return { getTotalItemsInCart };
};

export default useCartItemsTotal;
