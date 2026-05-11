import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard";
import ResultsPage from "./pages/ResultsPage";
import Home from "./pages/Homepage";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductList from "./pages/ProductList";

function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
            <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
            <Route path="/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
}