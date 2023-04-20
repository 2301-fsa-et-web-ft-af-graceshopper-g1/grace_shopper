const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL(8, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://dummyimage.com/640x360/fff/aaa",
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "No description for this item",
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = { Product };

/**
 * classMethods
 */

// Potential method for sending a qty and productId that can be used to add / subtract from stock 
// Product.addQty = async function ({ qty, productId }) {
//   const product = await this.findOne({ where: { productId } });
//   return (product.stock += qty);
// };

// Need to add method for adding product to cart
