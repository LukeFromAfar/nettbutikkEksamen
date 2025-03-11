// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import AddClothing from "./pages/AddClothing";
import EditClothing from "./pages/EditClothing";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import FaqPage from "./pages/FaqPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="category/:category" element={<CategoryPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route 
          path="add-clothing" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AddClothing />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="edit-clothing/:id" 
          element={
            <ProtectedRoute requiredRole="admin">
              <EditClothing />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;