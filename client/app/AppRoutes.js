import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import Products from "../features/products";
import MyCart from "../features/myCart/MyCart";
import SingleProduct from "../features/singleProduct/singleProduct";
import AddProduct from "../features/products/addProduct";
import EditProduct from "../features/products/editProduct";
import Checkout from "../features/checkout/Checkout";
import AllUsers from "../features/users/allUsers";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          {isAdmin && <Route path="/addProduct" element={<AddProduct />} />}
          {isAdmin && <Route path="/editProduct" element={<EditProduct />} />}
          {isAdmin && <Route path="/allUsers" element={<AllUsers />} />}
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:id" element={<SingleProduct />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
