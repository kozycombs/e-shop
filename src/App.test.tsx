import { act } from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { updateProducts } from "store/productSlice";
import { store } from "store";
import { Product } from "interface/Product";
import App from "App";

describe("<App />", () => {
  beforeAll(() => {
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

  test("renders a product title", async () => {
    let component;
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      component = render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(component).toMatchSnapshot();
  });
});
