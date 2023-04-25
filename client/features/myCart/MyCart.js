import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCartItemsAsync, selectMyCart } from "./myCartSlice";
import "./index.css";
import { updateCartAsync } from "./myCartSlice";

const MyCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectMyCart).products;
  const userId = useSelector((state) => state.auth.me.id);
  const [memoCartItems, setMemoCartItems] = useState(cartItems);

  useEffect(() => {
    dispatch(fetchCartItemsAsync(userId));
  }, [dispatch, userId]);

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
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="price-column">
                  {item.stock && item.stock > 0 ? (
                    <p>In stock</p>
                  ) : (
                    <p>Out of stock</p>
                  )}
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
        <Link to="/checkout">
          <button>Checkout</button>
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
