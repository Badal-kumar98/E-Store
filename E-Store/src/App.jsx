import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import Cart from "./pages/cart/Cart";
import AllProduct from "./pages/allProduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/addProductPage/AddProduct";
import UpdateProduct from "./pages/admin/updateProduct/UpdateProduct";
import MyState from "./context/MyState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ProtectedRouteForUser } from "./routes/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./routes/ProtectedRouteForAdmin";
import CategoryPage from "./pages/categoryPage/CategoryPage";

const App = () => {
  return (
    <div>
      <MyState>
        <Router>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NoPage />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/allproduct" element={<AllProduct />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categoryPage/:categoryname" element={<CategoryPage />} />
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRouteForUser>
                  <UserDashboard />
                </ProtectedRouteForUser>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRouteForAdmin>
                  <AdminDashboard />
                </ProtectedRouteForAdmin>
              }
            />
            <Route
              path="/add-product"
              element={
                <ProtectedRouteForAdmin>
                  <AddProduct />
                </ProtectedRouteForAdmin>
              }
            />
            <Route
              path="/update-product/:id"
              element={
                <ProtectedRouteForAdmin>
                  <UpdateProduct />
                </ProtectedRouteForAdmin>
              }
            />
          </Routes>
          <ToastContainer />
        </Router>
      </MyState>
    </div>
  );
};

export default App;
