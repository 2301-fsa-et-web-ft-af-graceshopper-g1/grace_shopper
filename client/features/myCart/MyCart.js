import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchCartItemsAsync, selectMyCart } from "./myCartSlice";

const MyCart = () => {
  // Dummy data - note that we want the quantity of each product

  // const product1 = {
  //   name: "HyperX Headset",
  //   price: 99.99,
  //   imageUrl: "https://m.media-amazon.com/images/I/71MJ3OaVqBL.jpg",
  //   description: "A great comfortable headset for an UNBEATABLE price!",
  //   // Added a quantity property, currently not in our Product model
  //   quantity: 1, //todo we want singleproducts to pass this in (bonus feature), otherwise it will be constant of 1
  //   stock: 10,
  // };
  // const product2 = {
  //   name: "Logitech Headset",
  //   price: 299.99,
  //   imageUrl:
  //     "https://cdn.shopify.com/s/files/1/0252/9705/9876/products/5_1_dcb1c1c1-6d88-420e-bff3-32eb5ef35077_1200x.png?v=1631134068",
  //   description: "A great comfortable headset for a actual BEATABLE price!",
  //   quantity: 2,
  //   stock: 25,
  // };
  // const product3 = {
  //   name: "SteelSeries Keyboard",
  //   price: 129.99,
  //   imageUrl:
  //     "https://media.steelseriescdn.com/thumbs/catalog/items/64847/a0bc32930344430a86be030026292d14.png.350x280_q100_crop-fit_optimize.png",
  //   description: "Newest KeyBoard from steelseries. the BEST GAMING KEYBOARD!",
  //   quantity: 0,
  //   stock: 0,
  // };

  // Our cart takes an array of product instances
  // const products = [product1, product2, product3];

  const dispatch = useDispatch();
  const fullCart = useSelector(selectMyCart);
  console.log("cart: ", fullCart);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCartItemsAsync(id));
  }, [dispatch, id]);

  // const totalPrice = cart.reduce(
  //   (acc, product) => acc + product.price * product.quantity,
  //   0
  // );
  let cart = fullCart.products;

  return (
    <div id="cart">
      <h2>Shopping Cart</h2>
      {cart && cart.length ? (
        cart.map((product) => (
          <div key="product.id">
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "100px", height: "100px" }}
            />
            {product.stock && product.stock > 0 ? (
              <p>In stock</p>
            ) : (
              <p>Out of stock</p>
            )}
            <p>
              Quantity: {cart.quantity}
              <span style={{ margin: "10px" }}>
                <button
                  type="button"
                  className="small-quantity-button"
                  disabled={product.quantity <= 1 && "true"}
                  onClick={() => {
                    product.quantity - 1;
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  className="small-quantity-button"
                  onClick={() => product.quantity + 1}
                >
                  +
                </button>
              </span>
            </p>
            <p>Price: {product.price}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      {/* <p>Subtotal: ${totalPrice.toFixed(2)}</p> */}
      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
};

export default MyCart;
