import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from "./singleProductSlice";
import "./singleProduct.css";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [dispatch, id]);

  const handleClick = () => {
    alert("Product added to cart");
    // navigate("/cart");
  };

  // console.log('this is the Id:', product.id)

  return !product ? (
    <div>No Product to display</div>
  ) : (
    <div key={product.id} className="singleProductView">
      <strong>Look at this!</strong>
      <h1>{product.name}</h1>
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={`${product.name}`}
          // style={{ width: "100px", height: "100px" }}
        />
      )}
      <p>About: {product.description}</p>
      <p>Available now: {product.stock}</p>
      <h2>{"$" + product.price}</h2>
      <button onClick={handleClick}>Add To Cart </button>
      <button>Buy in 1 click</button>
    </div>
  );
};
export default SingleProduct;
