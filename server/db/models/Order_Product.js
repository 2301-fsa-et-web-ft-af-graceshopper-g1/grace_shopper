const Sequelize = require("sequelize");
const db = require("../db");

// Junction table associating Order IDs with Product IDs,
// adding quantity and price
const Order_Product = db.define("order_product", {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: Sequelize.DECIMAL(8, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Order_Product;
