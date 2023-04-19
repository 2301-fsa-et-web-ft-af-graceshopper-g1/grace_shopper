import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAsync, selectProducts } from "./productsSlice";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  let products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div className="allProductsView">
      <strong>All Products</strong>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <strong>{product.name}</strong>
            <div>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: "100px", height: "100px" }}
              ></img>
            </div>
            <div>{"$" + product.price}</div>
            <Link to={`/products/${product.id}`}>
              <button>View</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
