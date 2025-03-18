import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import SignInPage from "../pages/Auth/SignIn/SignInPage";
import SignUpPage from "../pages/Auth/SignUp/SignUpPage";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
