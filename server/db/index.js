//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Products");
const Order = require("./models/Order");
const Order_Product = require("./models/Order_Product");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

// THESE ASSOCIATIONS ARE NOT WORKING!
// Product.belongsToMany(Order, { through: Order_Product });
// Order.belongsToMany(Product, { through: Order_Product });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Product,
  },
};
