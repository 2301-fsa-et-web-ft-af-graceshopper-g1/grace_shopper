const router = require("express").Router();
const {
  models: { Order, OrderProduct, User, Product },
} = require("../db");
const { isAdmin, requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//GET All Cart Instances //Admins Only
router.get("/", requireToken, isAdmin, async (req, res, next) => {
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
    // const cart = await User.findOne({
    //   include: [{ model: Order, include: [OrderProduct] }],
    //   where: {
    //     id: req.params.id,
    //     checkoutDate: null,
    //   },
    // });
    const order = await Order.findOne({
      where: {
        id: req.params.id,
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
            attributes: ["quantity"],
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

//Adding a product to the cart
router.post("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      include: [{ model: Order }],
      where: {
        id: req.params.id,
      },
    });

    const orders = await Order.findOne({
      include: [{ model: OrderProduct }],
      where: {
        userId: user.id,
        checkoutDate: null,
      },
    });
    // console.log("Our orders", orders);
    // console.log("Cart:", cart);
    const newItem = await Product.findOne({
      where: {
        id: req.body.productId,
      },
    });
    console.log("New Item:", newItem);
    let price = Number(newItem.price);
    const [orderProduct, createdOrderProduct] = await OrderProduct.findOrCreate(
      {
        where: {
          productId: 2,
          orderId: user.orders.id,
          price: price,
          quantity: 1,
        },
      }
    );

    // const [newOrderItem, existingOrderItem] = await OrderProduct.findOrCreate({
    //   quantity: 1,
    //   price: price,
    //   orderId: 5,
    //   productId: 4,
    // });
    // console.log("This is the new order item", newOrderItem);
    // cart.orders[0].order_products.push(newOrderItem);
    if (createdOrderProduct) {
      console.log(createdOrderProduct);
      res.send("Created Order Product:", createdOrderProduct);
    } else {
      console.log("Existing Order Product", orderProduct);
      orderProduct.increment({ quantity: 1 });
      res.send(orderProduct);
    }
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
