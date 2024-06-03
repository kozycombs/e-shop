import { Provider } from "react-redux";
import { render, screen, configure } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { updateProducts } from "../../../store/productSlice";
import { store } from "../../../store";
import { Product } from "../../../interface/Product";
import CartPage from "../Cart";
import { resetCart, updateCart } from "../../../store/cartSlice";
import { Cart } from "../../../interface/Cart";

describe("<CartPage />", () => {
  configure({
    testIdAttribute: "data-test",
  });

  const product: Product = {
    id: 4,
    title:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    rating: {
      rate: 2.9,
      count: 340,
    },
  };

  const cartData: Cart = {
    id: 11,
    userId: 1,
    date: "2024-06-03T00:27:58.741Z",
    products: [
      {
        productId: 4,
        quantity: 2,
      },
    ],
  };

  beforeAll(() => {
    store.dispatch(updateProducts([product]));
    store.dispatch(updateCart(cartData));
  });

  it("should render the component", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display the correct cart total price", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>
    );

    const expectedCartTotal = cartData.products.reduce((acc, cartProduct) => {
      if (cartProduct.productId !== product.id) {
        return 0;
      }
      return (acc += product.price * cartProduct.quantity);
    }, 0);
    const cartTotal = screen.getByTestId("cartTotal");
    expect(cartTotal.textContent).toBe(
      `£${Number(expectedCartTotal).toFixed(2)}`
    );
  });

  it("should have a Place your order", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>
    );

    const placeOrderButton = screen.getByRole("button");
    expect(placeOrderButton.textContent).toBe("Place your Order");
  });

  it("should render Your basket is empty message when no product item is in the cart", () => {
    store.dispatch(resetCart()); // Reset products list in redux store
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>
    );

    const productTitle = screen.getByText(/Your basket is empty./i);
    expect(productTitle).toBeInTheDocument();
  });
});
