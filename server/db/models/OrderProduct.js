const Sequelize = require("sequelize");
const db = require("../db");

// Junction table associating Order IDs with Product IDs,
// adding quantity and price
const OrderProduct = db.define("order_product", {
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

module.exports = OrderProduct;
