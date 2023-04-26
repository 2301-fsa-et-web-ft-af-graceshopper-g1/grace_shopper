import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
//Need to make checkout slice and submit function

const Checkout = () => {
  return (
    <div>
      <h1>Thanks for checking out!</h1>
      <Link to="/products">
        <button>Return to Products Home Page</button>
      </Link>
    </div>
  );
};

export default Checkout;
