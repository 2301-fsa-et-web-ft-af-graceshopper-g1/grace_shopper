import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchCartItemsAsync, selectMyCart } from "./myCartSlice";

const MyCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectMyCart);
  const cartItems = cart.products;
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCartItemsAsync(id));
  }, [dispatch, id]);

  return (
    <div id="cart">
      <h2>Shopping Cart</h2>
      {cartItems && cartItems.length ? (
        <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <Link to={`/products/${item.id}`}>
              <h3>{item.name}</h3>
            </Link>
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{ width: "100px", height: "100px" }}
            />
            {item.stock && item.stock > 0 ? (
              <p>In stock</p>
            ) : (
              <p>Out of stock</p>
            )}
            <p>
              Quantity: {item.order_product.quantity}
              <span style={{ margin: "10px" }}>
                <button
                  type="button"
                  className="small-quantity-button"
                  disabled={item.order_product.quantity <= 1 && true}
                  onClick={() => {
                    item.order_product.quantity - 1;
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  className="small-quantity-button"
                  onClick={() => item.order_product.quantity + 1}
                >
                  +
                </button>
              </span>
            </p>
            <p>Price: ${item.order_product.price}</p>
            <hr />
          </div>
        ))}
          <p>Subtotal: ${
            cartItems.reduce(
              (acc, item) => acc + item.order_product.price * item.order_product.quantity,
              0).toFixed(2)
            }
          </p>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
};

export default MyCart;
