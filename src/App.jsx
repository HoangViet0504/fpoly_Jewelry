import { useState } from "react";

import "./App.css";
import AppRouter from "./routes/AppRouter";
import Header from "../src/components/layout/Header";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
