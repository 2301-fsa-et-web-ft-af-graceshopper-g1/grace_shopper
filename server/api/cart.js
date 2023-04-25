const router = require("express").Router();
const {
  models: { Order, OrderProduct, User, Product },
} = require("../db");
const { isAdmin, requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//GET All Order Instances, shows User and Users Cart(Order) //Admins Only
router.get("/orders", requireToken, isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Product,
          through: {
            model: OrderProduct,
            attributes: ["quantity", "price"],
          },
        },
      ],
    });
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// GET Single Cart based on userId
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        checkoutDate: null,
      },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Product,
          through: {
            model: OrderProduct,
            attributes: ["quantity", "price"],
          },
        },
      ],
    });
    if (order) {
      res.send(order);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

//THESE ROUTES DO NOT WORK YET

//GET cart by the orderId
router.get("/testing/:id", async (req, res, next) => {
  try {
    //GET an order and its user
    const cart = await Order.findOne({
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Product },
      ],
      where: {
        id: req.params.id,
      },
    });
    if (!cart) {
      const guestCart = await Order.create();
      localStorage.setItem("cart", guestCart);
      res.send(localStorage.getItem("cart"));
    } else {
      res.send(cart);
    }
  } catch (error) {
    next(error);
  }
});

//Adding a product to the cart (POST)
router.post("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

//Editing our cart (removing item/ updating quantity?)
router.put("/:id", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      include: [{ model: Product }],
      where: {
        userId: req.params.id,
      },
    });
    const existingItem = await OrderProduct.findOne({
      where: {
        productId: req.body.productId,
        orderId: cart.id,
      },
    });
    //console.log(existingItem)
    //Removing(destroying) the existing item
    await existingItem.destroy();
    //Access and return the updated cart
    const updatedCart = await Order.findOne({
      include: [{ model: Product }],
      where: {
        userId: req.params.id,
      },
    });
    //console.log(updatedCart)
    res.send(updatedCart);
  } catch (error) {
    next(error);
  }
});
