const router = require("express").Router();
const {
  models: { Order, OrderProduct, User, Product },
} = require("../db");
const { isAdmin, requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//Process Single Checkout
router.put("/:id", async (req, res, next) => {
  try {
    console.log("this is the user Id in req.body:", req.body.userId);
    const order = await Order.findOne({
      where: {
        userId: req.body.userId,
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
    console.log(order);
    // if (order) {
    //   order.checkoutDate = Date.now();
    //   res.send(order);
    // } else {
    //   res.sendStatus(404);
    // }
  } catch (error) {
    next(error);
  }
});

//THESE ROUTES DO NOT WORK YET

// router.get("/:id", async (req, res, next) => {
//   try {

//   } catch (error) {
//     next(error);
//   }
// });

//Adding a product to the cart (POST)
router.post("/:id", async (req, res, next) => {
  try {
    //Find the exisitng Cart
    const cart = await Order.findOne({
      include: [{ model: Product }],
      where: {
        userId: req.params.id,
      },
    });
    // Within the cart, search for an item based on productId
    const existingItem = await OrderProduct.findOne({
      where: {
        productId: req.body.productId,
        orderId: cart.id,
      },
    });
    //If the item does not exist, create a new order product based on productId
    if (!existingItem) {
      const product = await Product.findOne({
        where: {
          id: req.body.productId,
        },
      });
      const newItem = await OrderProduct.create({
        orderId: cart.id,
        productId: product.id,
        price: product.price,
        quantity: req.body.quantity,
      });
      //If the item does exist, increase its quantity by 1
    } else {
      await existingItem.update({
        quantity: existingItem.quantity + req.body.quantity,
      });
    }
    //Access and send the updated cart
    const updatedCart = await Order.findOne({
      include: [{ model: Product }],
      where: {
        userId: req.params.id,
      },
    });
    //console.log(updatedCart)
    res.send(updatedCart);
    // res.send(cart);
    // res.send(existingItem);
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
