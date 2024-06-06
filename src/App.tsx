import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "components/layout/Layout";
import { APP_URL } from "constants/index";
import Spinner from "components/spinner/Spinner";

function App() {
  const HomePage = lazy(() => import("./scenes/home/Home"));
  const ProductPage = lazy(() => import("./scenes/product/Product"));
  const CartPage = lazy(() => import("./scenes/cart/Cart"));

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path={APP_URL.HOME} element={<HomePage />} />
          <Route path={`${APP_URL.PRODUCT}/:id`} element={<ProductPage />} />
          <Route path={APP_URL.CART} element={<CartPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
