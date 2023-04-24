import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAsync, selectProducts } from "./productsSlice";
import { Link } from "react-router-dom";
import "./index.css";

const Products = () => {
  const dispatch = useDispatch();
  let products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, []);

  return (
    <div>
      <h2 className="products-header">All Products</h2>
      <div className="allProductsView">
        {products.map((product) => {
          return (
            <div className="products" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <strong className="productName">{product.name}</strong>
              </Link>

              <div>
                <Link to={`/products/${product.id}`}>
                  <img
                    className="allProductsPics"
                    src={product.imageUrl}
                    alt={product.name}
                  ></img>
                </Link>
              </div>
              <div>{"$" + product.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
