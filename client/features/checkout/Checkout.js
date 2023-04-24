import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
//Need to make checkout slice and submit function
// import { editCheckoutAsync } from "../store/campusSlice";

const Checkout = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  // const dispatch = useDispatch();
  // const { id } = useParams();

  const handleCardNumber = (event) => {
    setCardNumber(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleExpirationDate = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // await dispatch(editCheckoutAsync({ id, name, address }));

    setCardNumber("");
    setExpirationDate("");
    setName("");
  };

  const handleCancel = () => {
    setCardNumber("");
    setCardNumber("");
    setName("");
  };

  return (
    <div className="form">
      <form id="checkout-form" onSubmit={handleSubmit}>
        <h2>Thank you for checking out! </h2>
        <Link to="/">
          <button>Click here to return to home</button>
        </Link>
      </form>
    </div>
  );
};

export default Checkout;
