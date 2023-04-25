import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from "./singleProductSlice";
import { addCartItemAsync } from "../myCart/myCartSlice";
import "./singleProduct.css";
import { fetchCartItemsAsync } from "../myCart/myCartSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.me.id);

  const guestUserJSON = window.localStorage.getItem("guestUser");
  const guestUser = guestUserJSON ? JSON.parse(guestUserJSON) : null;

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [dispatch, id]);

  const handleClick = async () => {
    if (userId && !guestUser) {
      await dispatch(fetchCartItemsAsync(userId));
      await dispatch(
        addCartItemAsync({ userId: userId, productId: product.id })
      );
    } else if (guestUser && !userId) {
      console.log(guestUser.userId);
      await dispatch(fetchCartItemsAsync(guestUser.userId));
      await dispatch(
        addCartItemAsync({ userId: guestUser.userId, productId: product.id })
      );
    }
    alert("Product added to cart");
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
      <button onClick={handleClick}>Add To Cart </button>
      <Link to="/products">
        <p>Continue shopping</p>
      </Link>
    </div>
  );
};

export default SingleProduct;
