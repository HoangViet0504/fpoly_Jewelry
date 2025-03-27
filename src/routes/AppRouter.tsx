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
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
