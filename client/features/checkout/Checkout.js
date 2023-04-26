import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
//Need to make checkout slice and submit function

const Checkout = () => {
  return (
    <div id="checkout" style={{ textAlign: "center" }}>
      <h2>Thanks for checking out!</h2>
      <Link to="/products">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
};

export default Checkout;
