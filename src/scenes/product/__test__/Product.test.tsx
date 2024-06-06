import { Provider } from "react-redux";
import { render, screen, configure } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { updateProducts } from "store/productSlice";
import { store } from "store/index";
import { Product } from "interface/Product";
import ProductDetail from "scenes/product/Product";

describe("<ProductDetail />", () => {
  beforeAll(() => {
    configure({
      testIdAttribute: "data-test",
    });
    const product: Product = {
      id: 16,
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

    store.dispatch(updateProducts([product]));
  });

  it("should render the component", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductDetail />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should have a quantity input field", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductDetail />
        </BrowserRouter>
      </Provider>
    );

    const quantityInput = screen.getByTestId("quantity");
    expect(quantityInput).toBeInTheDocument();
  });

  it("should have a Add to Cart button", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductDetail />
        </BrowserRouter>
      </Provider>
    );

    const addToCartButton = screen.getByRole("button");
    expect(addToCartButton.textContent).toBe("Add to Cart");
  });
});
