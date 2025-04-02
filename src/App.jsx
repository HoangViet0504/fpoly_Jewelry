import "./App.css";
import AppRouter from "./routes/AppRouter";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <div>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </div>
  );
}

export default App;
