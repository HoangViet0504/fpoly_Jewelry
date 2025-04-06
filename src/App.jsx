import "./App.css";
import AppRouter from "./routes/AppRouter";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <UserProvider>
        <AppRouter />
        <ToastContainer />
      </UserProvider>
    </div>
  );
}

export default App;
