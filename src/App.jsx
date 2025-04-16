import "./App.css";
import AppRouter from "./routes/AppRouter";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <UserProvider>
      <HelmetProvider>
        <AppRouter />
      </HelmetProvider>
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
