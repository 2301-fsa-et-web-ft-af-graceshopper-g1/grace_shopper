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
    const existingUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!existingUser) {
      const guestUser = await User.create({
        id: req.params.id,
        username: `Guest${req.params.id}`,
      });
      const guestOrder = await Order.create({
        userId: guestUser.id,
      });
      res.send(guestOrder);
    } else {
      res.send(order);
    }
  } catch (error) {
    next(error);
  }
});

// Adding a product to the cart (POST)
router.post("/:id", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      include: [{ model: Product }],
      where: {
        userId: req.params.id,
        checkoutDate: null,
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
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Product },
      ],
      where: {
        userId: req.params.id,
        checkoutDate: null,
      },
    });
    res.send(updatedCart);
  } catch (error) {
    next(error);
  }
});

// Editing our cart (removing item/updating quantity)
router.put("/:id", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      include: [{ model: Product }],
      where: {
        userId: req.params.id,
        checkoutDate: null,
      },
    });
    const existingItem = await OrderProduct.findOne({
      where: {
        productId: req.body.productId,
        orderId: cart.id,
      },
    });
    if (req.body.quantity) {
      // Update the quantity of the existing item
      existingItem.quantity = req.body.quantity;
      await existingItem.save();
    }
    if (req.body.remove) {
      // Removing (destroying) the existing item
      await existingItem.destroy();
    }
    // Access and return the updated cart
    const updatedCart = await Order.findOne({
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Product },
      ],
      where: {
        userId: req.params.id,
        checkoutDate: null,
      },
    });
    res.send(updatedCart);
  } catch (error) {
    next(error);
  }
});

//Checkout Route. Will clear the existing cart and create a new one based on userId
router.put("/checkout/:id", async (req, res, next) => {
  try {
    //Find the cart by passed in Id
    const cart = await Order.findOne({
      include: [{ model: Product }],
      where: {
        userId: req.params.id,
        checkoutDate: null,
      },
    });
    //Loop through the products
    cart.products.forEach(async (product) => {
      //Find each product in the cart
      const productInCart = await Product.findOne({
        where: { id: product.id },
      });
      //Update the existing Products stock after checkout
      await productInCart.update({
        stock: productInCart.stock - product.order_product.quantity,
      });
    });
    //Set the carts checkoutDate to null so this cart is no longer active
    await cart.update({
      checkoutDate: Date.now(),
    });
    //Create and return new empty cart on user, have to manually set guest to false(?)
    const newCart = await Order.create({
      userId: req.params.id,
      guest: false,
    });
    res.send(newCart);
  } catch (error) {
    next(error);
  }
});
