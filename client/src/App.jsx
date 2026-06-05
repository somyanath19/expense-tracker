import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Landing/>}/>

        <Route
          path="/login"
          element={<Login/>}
        />

        <Route
          path="/register"
          element={<Register/>}
        />

        <Route
          path="/dashboard"
          element={<Dashboard/>}
        />

        <Route
          path="/analytics"
          element={<Analytics/>}
        />

        <Route
          path="/transactions"
          element={<Transactions/>}
        />

        <Route
          path="/profile"
          element={<Profile/>}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;