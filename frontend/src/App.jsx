import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import AddClothing from "./pages/AddClothing";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
        <Route 
          path="add-clothing" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AddClothing />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;
