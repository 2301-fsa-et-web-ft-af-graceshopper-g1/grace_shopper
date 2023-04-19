import React from "react";
import { Link } from "react-router-dom";

const MyCart = () => {
  
  // Dummy data - note that we want the quantity of each product
  const product1 = {
    name: "HyperX Headset",
    price: 99.99,
    imageUrl: "https://m.media-amazon.com/images/I/71MJ3OaVqBL.jpg",
    description: "A great comfortable headset for an UNBEATABLE price!",
    // Added a quantity property, currently not in our Product model
    quantity: 1,
    stock: 10,
  };
  const product2 = {
    name: "Logitech Headset",
    price: 299.99,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0252/9705/9876/products/5_1_dcb1c1c1-6d88-420e-bff3-32eb5ef35077_1200x.png?v=1631134068",
    description: "A great comfortable headset for a actual BEATABLE price!",
    quantity: 2,
    stock: 25,
  };
  const product3 = {
    name: "SteelSeries Keyboard",
    price: 129.99,
    imageUrl:
      "https://media.steelseriescdn.com/thumbs/catalog/items/64847/a0bc32930344430a86be030026292d14.png.350x280_q100_crop-fit_optimize.png",
    description:
      "Newest KeyBoard from steelseries. the BEST GAMING KEYBOARD!",
    quantity: 0,
    stock: 0,
  };

  // Our cart takes an array of product instances
  const products = [product1, product2, product3];
  
  return (
    <div id="cart">
      <h2>Shopping Cart</h2>
      {products && products.length
        ? products.map(product => (
          <div key="product.id">
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: "100px", height: "100px" }}
              />
            {product.stock && product.stock > 0
              ? <p>In stock</p>
              : <p>Out of stock</p>
            }
            <p>Quantity: {product.quantity}</p>
            <p>Price: {product.price}</p>
            <hr />
          </div>
        ))
        : <p>Your cart is empty</p>
      }
      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  )
}

export default MyCart;
