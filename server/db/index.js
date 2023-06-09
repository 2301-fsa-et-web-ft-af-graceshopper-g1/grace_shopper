//this is the access point for all things database related!
const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderProduct = require("./models/OrderProduct");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(Order, { through: "order_product" });
Order.belongsToMany(Product, { through: "order_product" });
// Order.hasMany(OrderProduct);
// OrderProduct.belongsTo(Order);
// Product.hasMany(OrderProduct);
// OrderProduct.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderProduct,
  },
};
