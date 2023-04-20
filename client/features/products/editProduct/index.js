import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectProducts } from "../productsSlice";
import EditProductForm from "./editProductForm";

const EditProduct = () => {
  // i want a view of all the products in a options menu
  // if i click it it will show a drag down menu of options
  //if i click into the option i can see the info for that product
  // there will also be a delete button
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div className="editProductsMenu">
      Select Product to Edit
      <select value={selectedValue} onChange={handleChange}>
        <option value="">Select a product</option>
        {products.map((product) => {
          return (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          );
        })}
      </select>
      <div className="editSingleProduct">
        {selectedValue.length ? (
          <div>
            <EditProductForm id={selectedValue} />
          </div>
        ) : (
          <strong>{`Please select the product you want to edit`}</strong>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
