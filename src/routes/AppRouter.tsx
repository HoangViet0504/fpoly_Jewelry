import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import SignInPage from "../pages/Auth/SignIn/SignInPage";
import SignUpPage from "../pages/Auth/SignUp/SignUpPage";
import AboutPage from "../pages/About/AboutPage";
import CartPage from "../pages/Cart/CartPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import NotFoundPage from "../pages/404/404";
import ResetPasswordPage from "../pages/Auth/ResetPassword/ResetPasswordPage";
import OverViewPage from "../pages/Dashboard/OverView/OverViewPage";
import UserPage from "../pages/Dashboard/User/UserPage";
import ProductPage from "../pages/Dashboard/Product/ProductPage";
import CategoriesPage from "../pages/Dashboard/Categories/CategoriesPage";
import ProductByCategoriesPage from "../pages/ProductByCategories/ProductByCategoriesPage";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";
import SuccessCheckout from "../pages/Checkout/SuccessCheckout";
import VoucherPage from "../pages/Dashboard/Voucher/VoucherPage";
import CommentPage from "../pages/Dashboard/Comment/CommentPage";
import OrderPage from "../pages/Dashboard/Order/OrderPage";
import ProductCollectionPage from "../pages/Dashboard/ProductCollection/ProductCollectionPage";
import ImageProductPage from "../pages/Dashboard/ImageProduct/ImageProductPage";
import InfoTabsPage from "../pages/InfoTabs/InfoTabsPage";
import QrOrderPaymentPage from "../components/Checkout/QrPayment";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment/:id" element={<QrOrderPaymentPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/checkout-success" element={<SuccessCheckout />} />
      <Route
        path="/product-categories/:slug"
        element={<ProductByCategoriesPage />}
      />
      <Route path="/product-detail/:slug" element={<ProductDetailPage />} />
      <Route path="/dashboard/over-view" element={<OverViewPage />} />
      <Route path="/dashboard/manage-user" element={<UserPage />} />
      <Route path="/dashboard/manage-product" element={<ProductPage />} />
      <Route
        path="/dashboard/manage-product-collection"
        element={<ProductCollectionPage />}
      />
      <Route path="/dashboard/manage-categories" element={<CategoriesPage />} />
      <Route path="/dashboard/manage-voucher" element={<VoucherPage />} />
      <Route
        path="/dashboard/manage-image-product"
        element={<ImageProductPage />}
      />
      <Route path="/dashboard/manage-comment" element={<CommentPage />} />
      <Route path="/dashboard/manage-order" element={<OrderPage />} />
      <Route path="/policy" element={<InfoTabsPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
