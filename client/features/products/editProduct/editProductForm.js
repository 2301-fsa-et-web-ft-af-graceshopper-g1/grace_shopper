import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from "../../singleProduct/singleProductSlice";
import { updateSingleProductAsync } from "../../singleProduct/singleProductSlice";
import { useNavigate } from "react-router-dom";

const EditProductForm = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  const navigate = useNavigate();

  //testing
  //console.log(id);

  const [isLoading, setIsLoading] = useState(true);
  const [name, setProductName] = useState("");
  const [price, setProductPrice] = useState("");
  const [imageUrl, setProductImageUrl] = useState("");
  const [description, setProductDescription] = useState("");
  const [stock, setProductStock] = useState("");

  useEffect(() => {
    const fetchProduct = () => {
      dispatch(fetchSingleProductAsync(id));
      setIsLoading(false);
    };

    fetchProduct();
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setProductName(product.name || "");
      setProductPrice(product.price || "");
      setProductImageUrl(product.imageUrl || "");
      setProductDescription(product.description || "");
      setProductStock(product.stock || "");
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      price.length < 1 ||
      name.length < 1 ||
      imageUrl.length < 1 ||
      description.length < 1 ||
      stock.length < 1
    ) {
      setProductName(product.name);
      setProductPrice(product.price);
      setProductImageUrl(product.imageUrl);
      setProductDescription(product.description);
      setProductStock(product.stock);
      alert("Error: Please double check your input");

      return;
    }

    dispatch(
      updateSingleProductAsync({
        id,
        name,
        price,
        imageUrl,
        description,
        stock,
      })
    );
    navigate(`/products/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <strong>Edit Product Below:</strong>
      <form id="editProductForm" onSubmit={handleSubmit}>
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
        <textarea
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
        <button type="submit">Submit Edit</button>
      </form>
    </div>
  );
};

export default EditProductForm;
