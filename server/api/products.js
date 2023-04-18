const router = require("express").Router();
const { Product } = require("../db/models/Products");

//Get all products
router.get("/", async (req, res, next) => {
  try {
    const product = await Product.findAll();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//Get single product
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//Admins Only:

//Adding a Product
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});

//Edit a Product
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    await product.update(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//Delete a Product
router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
