const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  // Assuming user logged in
  userId: Sequelize.INTEGER,
  // If user is logged in, expect guest property to be false and userId property to exist
  guest: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  checkoutDate: Sequelize.DATE,
});

module.exports = Order;
