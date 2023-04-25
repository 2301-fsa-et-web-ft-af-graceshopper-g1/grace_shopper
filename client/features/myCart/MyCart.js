import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCartItemsAsync,
  removeCartItem,
  selectMyCart,
} from "./myCartSlice";
import "./index.css";
import { updateCartAsync } from "./myCartSlice";

import { handleCheckoutAsync } from "./myCartSlice";

const MyCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectMyCart).products;
  const userId = useSelector((state) => state.auth.me.id);
  const [memoCartItems, setMemoCartItems] = useState(cartItems);

  const guestUserJSON = window.localStorage.getItem("guestUser");
  const guestUser = guestUserJSON ? JSON.parse(guestUserJSON) : null;

  //todo loading screen for transition between user to logged out

  const handleCheckout = async (event) => {
    event.preventDefault();
    if (userId && !guestUser) {
      await dispatch(handleCheckoutAsync({ userId }));
      await dispatch(fetchCartItemsAsync(userId));
    } else if (guestUser && !userId) {
      console.log(guestUser.userId);
      await dispatch(handleCheckoutAsync({ userId: guestUser.userId }));
      await dispatch(fetchCartItemsAsync(guestUser.userId));
    }
    alert("Thanks for checking out!");
  };

  useEffect(
    () => {
      if (userId && !guestUser) {
        dispatch(fetchCartItemsAsync(userId));
      } else if (guestUser && !userId) {
        console.log(guestUser.userId);
        dispatch(fetchCartItemsAsync(guestUser.userId));
      }
    },
    [dispatch, userId],
    guestUser
  );

  const handleRemove = (productId, event) => {
    event.preventDefault();
    if (userId && !guestUser) {
      dispatch(removeCartItem({ userId, productId }));
    } else if (guestUser && !userId) {
      dispatch(removeCartItem({ userId: guestUser.userId, productId }));
    }
  };

  useEffect(() => {
    setMemoCartItems(cartItems);
  }, [cartItems]);

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartAsync({ productId, quantity })).then(() => {
      const itemIndex = memoCartItems.findIndex(
        (item) => item.id === productId
      );
      if (itemIndex !== -1) {
        const updatedCartItems = [...memoCartItems];
        updatedCartItems[itemIndex] = {
          ...updatedCartItems[itemIndex],
          order_product: {
            ...updatedCartItems[itemIndex].order_product,
            quantity,
          },
        };
        setMemoCartItems(updatedCartItems);
      }
    });
  };

  return (
    <div id="cart">
      <h2 className="products-header">Shopping Cart</h2>
      {memoCartItems && memoCartItems.length ? (
        <div>
          {memoCartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <Link to={`/products/${item.id}`}>
                <h3>{item.name}</h3>
              </Link>
              <div className="cart-container">
                <div className="image-column">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  {item.stock && item.stock > 0 ? (
                    <p>{item.stock} in stock</p>
                  ) : (
                    <p>Out of stock</p>
                  )}
                </div>
                <div className="price-column">
                  <span style={{ margin: "10px" }}>
                    <button
                      type="button"
                      className="small-quantity-button"
                      disabled={item.order_product.quantity <= 1 && true}
                      onClick={() => {
                        handleQuantityChange(
                          item.id,
                          item.order_product.quantity - 1
                        );
                      }}
                    >
                      -
                    </button>
                    <span>
                      &nbsp;&nbsp;Quantity: {item.order_product.quantity}
                      &nbsp;&nbsp;
                    </span>
                    <button
                      type="button"
                      className="small-quantity-button"
                      onClick={() => {
                        handleQuantityChange(
                          item.id,
                          item.order_product.quantity + 1
                        );
                      }}
                    >
                      +
                    </button>
                  </span>
                  <p>Price: ${item.order_product.price}</p>
                  <button onClick={(event) => handleRemove(item.id, event)}>
                    Remove from Cart
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}
          <h3 style={{ textAlign: "center" }}>
            Subtotal: $
            {memoCartItems
              .reduce(
                (acc, item) =>
                  acc + item.order_product.price * item.order_product.quantity,
                0
              )
              .toFixed(2)}
          </h3>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
      <div id="checkout-column">
        <Link to={`/checkout/`}>
          <button onClick={handleCheckout}>Checkout</button>
        </Link>
        <Link to="/products">
          <p style={{ fontSize: "20px" }}>Continue shopping</p>
        </Link>
        <br />
        <br />
      </div>
    </div>
  );
};

export default MyCart;
