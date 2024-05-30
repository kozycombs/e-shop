import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { APP_URL } from "./constants";
import Spinner from "./components/spinner/Spinner";

function App() {
  const ProductsPage = lazy(() => import("./scenes/products/Products"));
  const CartPage = lazy(() => import("./scenes/cart/Cart"));

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path={APP_URL.HOME} element={<ProductsPage />} />
          <Route path={APP_URL.CART} element={<CartPage />} />
          <Route path="*" element={<ProductsPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
