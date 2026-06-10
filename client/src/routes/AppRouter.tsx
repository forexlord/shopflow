import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import { GuestRoute } from "./GuestRoute";
import { ProtectedRoute } from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<ProductsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
