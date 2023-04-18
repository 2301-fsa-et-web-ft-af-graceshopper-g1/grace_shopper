//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Products");

//associations could go here!
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.hasMany(Product);
// Product.belongsTo(Cart);

module.exports = {
  db,
  models: {
    User,
    Product,
  },
};
