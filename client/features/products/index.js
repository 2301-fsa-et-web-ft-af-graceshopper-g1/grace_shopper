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
  }, [dispatch]);

  //todo apparently dispatch is the same as [] but [dispatch] is considered best practice by react, so if we encounter another bug or instance with grace shopper it might not be from line 13

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
