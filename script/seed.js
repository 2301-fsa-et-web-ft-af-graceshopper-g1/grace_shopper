const {
  db,
  models: { User, Product, Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123", isAdmin: true }),
    User.create({ username: "john", password: "123", isEngineer: true }),
    User.create({
      username: "amy",
      password: "123",
      isAdmin: true,
      isEngineer: false,
    }),
    User.create({
      username: "stacy",
      password: "123",
      isAdmin: false,
      isEngineer: false,
    }),
    User.create({ username: "TomBrady", password: "123", isEngineer: true }),
  ]);

  console.log(`seeded ${users.length} users`);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: "HyperX Headset",
      price: 99.99,
      imageUrl: "https://m.media-amazon.com/images/I/71MJ3OaVqBL.jpg",
      description: "A great comfortable headset for an UNBEATABLE price!",
      stock: 10,
    }),
    Product.create({
      name: "Logitech Headset",
      price: 299.99,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0252/9705/9876/products/5_1_dcb1c1c1-6d88-420e-bff3-32eb5ef35077_1200x.png?v=1631134068",
      description: "A great comfortable headset for a actual BEATABLE price!",
      stock: 25,
    }),
    Product.create({
      name: "SteelSeries Keyboard",
      price: 129.99,
      imageUrl:
        "https://media.steelseriescdn.com/thumbs/catalog/items/64847/a0bc32930344430a86be030026292d14.png.350x280_q100_crop-fit_optimize.png",
      description:
        "Newest KeyBoard from steelseries. the BEST GAMING KEYBOARD!",
      stock: 100,
    }),
    Product.create({
      name: "Strange Gaming Mouse",
      price: 300.0,
      imageUrl:
        "https://assets.hongkiat.com/uploads/creative-unusual-mice/man_body.jpg?newedit",
      description:
        "A strange mouse from a even stranger land. seems to resemble the physique of a human male.",
      stock: 3,
    }),
    Product.create({
      name: "Optical Ferrari Car Mouse",
      price: 500.0,
      imageUrl:
        "https://assets.hongkiat.com/uploads/creative-unusual-mice/ferrari_mouse.jpg?newedit",
      description:
        "Car 3D optical mouse looks like real Ferrari sports car that will appeal to all racing fans. LED lights in car running lights looks fancy.",
      stock: 500,
    }),
  ]);

  console.log(`seeded ${products.length} products`);

  // Creating Orders
  const orders = await Promise.all([
    Order.create({ userId: 1, guest: false }),
    Order.create({ userId: 2, guest: false }),
    Order.create({
      userId: 4,
      guest: false,
      checkoutDate: "Tue Jul 06 2021 07:55:33",
    }),
    Order.create({ userId: 4, guest: false }),
    Order.create(),
  ]);

  console.log(`seeded ${orders.length} orders`);

  // Creating Order Products
  // const orderProducts = await Promise.all([
  //   Order_Product.create({ orderId: 1, productId: 1, quantity: 1, price: 99.99}),
  //   Order_Product.create({ orderId: 1, productId: 3, quantity: 1, price: 129.99}),
  //   Order_Product.create({ orderId: 2, productId: 2, quantity: 1, price: 299.99}),
  //   Order_Product.create({ orderId: 2, productId: 3, quantity: 2, price: 129.99}),
  //   Order_Product.create({ orderId: 2, productId: 4, quantity: 2, price: 300.00}),
  //   Order_Product.create({ orderId: 3, productId: 5, quantity: 10, price: 500.00}),
  //   Order_Product.create({ orderId: 4, productId: 5, quantity: 1, price: 500.00}),
  //   Order_Product.create({ orderId: 5, productId: 1, quantity: 1, price: 99.99}),
  //   Order_Product.create({ orderId: 5, productId: 2, quantity: 1, price: 299.99}),
  //   Order_Product.create({ orderId: 5, productId: 3, quantity: 2, price: 129.99}),
  // ]);

  // console.log(`seeded ${orderProducts.length} order products`);

  console.log(`
    seeded successfully
    db synced!
  `);

  // Run 'npm run seed' when changing or adding data.

  // What's this line of code doing?
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
