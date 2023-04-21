const router = require("express").Router();
const {
  models: { Order, OrderProduct, User, Product },
} = require("../db");
const { isAdmin, requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//GET All Cart Instances //Admins Only
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const cart = await User.findAll({
      include: [{ model: Order }],
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

//GET Single Cart
router.get("/:id", async (req, res, next) => {
  try {
    const cart = await User.findOne({
      include: [{ model: Order, include: [OrderProduct] }],
      where: {
        id: req.params.id,
      },
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

//Adding a product to the cart
router.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

//Editing our cart (removing item/updating quantity of single item)
router.put("/cart", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
