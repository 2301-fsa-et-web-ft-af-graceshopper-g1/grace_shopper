import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddProduct = () => {
  const dispatch = useDispatch();

  const [name, setProductName] = useState("");
  const [price, setProductPrice] = useState("");
  const [imageUrl, setProductImageUrl] = useState("");
  const [description, setProductDescription] = useState("");
  const [stock, setProductStock] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault;
    // do async thunk here
  };
  return (
    <div className="addProductPage">
      <strong>Add New Product Here</strong>
      <form id="addProductForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label htmlFor="price">Product Price:</label>
        <input
          name="price"
          value={price}
          type="number"
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <label htmlFor="imageUrl">Product ImageUrl</label>
        <input
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setProductImageUrl(e.target.value)}
        />
        <label htmlFor="description">Product Description:</label>
        <input
          name="description"
          value={description}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <label htmlFor="stock">Total Stock:</label>
        <input
          name="stock"
          value={stock}
          type="number"
          onChange={(e) => setProductStock(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
