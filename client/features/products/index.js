import React from "react";

const Products = () => {
  const fakeData = [
    {
      id: 1,
      name: "HyperX Headset",
      price: 99.99,
      imageUrl: "https://m.media-amazon.com/images/I/71MJ3OaVqBL.jpg",
      description: "A great comfortable headset for an UNBEATABLE price!",
      quantityInStock: 10,
    },
    {
      id: 2,
      name: "Logitech Headset",
      price: 299.99,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0252/9705/9876/products/5_1_dcb1c1c1-6d88-420e-bff3-32eb5ef35077_1200x.png?v=1631134068",
      description: "A great comfortable headset for a actual BEATABLE price!",
      quantityInStock: 25,
    },
  ];

  return (
    <div className="allProductsView">
      <strong>All Products</strong>
      {fakeData.map((product) => {
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
          </div>
        );
      })}
    </div>
  );
};

export default Products;
