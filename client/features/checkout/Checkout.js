import React from "react";
import { useSelector } from "react-redux";
//Need to adjust this based on file structure
import { Cart } from "./cart/cart";
/**
 * COMPONENT
 */
const Checkout = () => {
  const username = useSelector((state) => state.auth.me.username);

  return <h1> hello world</h1>;
};

export default Checkout;
