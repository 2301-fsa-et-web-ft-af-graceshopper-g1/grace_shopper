const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
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
    defaultValue: 0,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Product;
