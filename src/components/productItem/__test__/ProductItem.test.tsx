import { render } from "@testing-library/react";
import ProductItem from "../ProductItem";
import { Product } from "../../../interface/Product";

describe("<ProductItem /> component", () => {
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

  it("should render the component", () => {
    const { asFragment } = render(<ProductItem product={product} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
