import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSingleProductAsync, selectSingleProduct } from "./singleProductSlice";
import { fetchCartItemsAsync, addCartItemAsync } from "../myCart/myCartSlice";
import "./singleProduct.css";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.me.id);
  const [quantity, setQuantity] = useState(1);

  const guestUserJSON = window.localStorage.getItem("guestUser");
  const guestUser = guestUserJSON ? JSON.parse(guestUserJSON) : null;

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [dispatch, id]);

  const handleClick = async () => {
    if (userId && !guestUser) {
      await dispatch(fetchCartItemsAsync(userId));
      await dispatch(
        addCartItemAsync({ userId: userId, productId: product.id, quantity })
      );
    } else if (guestUser && !userId) {
      console.log(guestUser.userId);
      await dispatch(fetchCartItemsAsync(guestUser.userId));
      await dispatch(
        addCartItemAsync({ userId: guestUser.userId, productId: product.id, quantity })
      );
    }
    alert("Product added to cart");
  };

  const handleQuantitySubtract = (event) => {
    event.preventDefault();
    setQuantity(quantity - 1);
  };

  const handleQuantityAdd = (event) => {
    event.preventDefault();
    setQuantity(quantity + 1);
  };

  return !product ? (
    <div>No Product to display</div>
  ) : (
    <div key={product.id} className="singleProductView">
      <strong>Look at this!</strong>
      <h1>{product.name}</h1>
      {product.imageUrl && (
        <img src={product.imageUrl} alt={`${product.name}`} />
      )}
      <p>About: {product.description}</p>
      <h3>Available now: {product.stock}</h3>
      <h2>{"$" + product.price}</h2>
      <div className="quantity">
        <span style={{ margin: "10px" }}>
          <button
            type="button"
            className="small-quantity-button"
            disabled={quantity <= 1 && true}
            onClick={(e) => handleQuantitySubtract(e)}
          >
            -
          </button>
          <span>
            &nbsp;&nbsp;Quantity: {quantity}
            &nbsp;&nbsp;
          </span>
          <button
            type="button"
            className="small-quantity-button"
            onClick={(e) => handleQuantityAdd(e)}
          >
            +
          </button>
        </span>
      </div>
      <button onClick={handleClick}>Add To Cart </button>
      <Link to="/products">
        <p>Continue shopping</p>
      </Link>
    </div>
  );
};

export default SingleProduct;
