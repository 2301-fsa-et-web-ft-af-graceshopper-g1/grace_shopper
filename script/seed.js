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

  // Utilizing Sequelize transactions lets us automatically create new orders when creating users
  let users = [];
  let orders = [];
  
  await db.transaction(async (transaction) => {
    users = await Promise.all([
      await User.create({ username: "cody", password: "123" }, { transaction }),
      await User.create({ username: "murphy", password: "123", isAdmin: true }, { transaction }),
      await User.create({ username: "john", password: "123", isEngineer: true }, { transaction }),
      await User.create({
        username: "amy",
        password: "123",
        isAdmin: true,
        isEngineer: false,
      }, { transaction }),
      await User.create({
        username: "stacy",
        password: "123",
        isAdmin: false,
        isEngineer: false,
      }, { transaction }),
      await User.create({
        username: "TomBrady",
        password: "123",
        isEngineer: true,
      }, { transaction }),
    ]);
    console.log(`seeded ${users.length} users`);

    // Creating orders for all users in one step
    orders = await Promise.all(users.map((user) => Order.create({ userId: user.id, guest: false }, { transaction })));
    console.log(`seeded ${orders.length} orders`);
  });

  // Creating past orders for Amy and Stacy
  const otherOrders = await Promise.all([
    await Order.create({
      userId: 4,
      guest: false,
      checkoutDate: "Tue Jul 06 2021 07:55:33",
    }),
    await Order.create({
      userId: 5,
      guest: false,
      checkoutDate: "Fri Nov 11 2022 20:03:47",
    }
    ),
  ]);
  console.log(`seeded ${otherOrders.length} other orders`);

  // Creating Products
  async function seedProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      for (const product of data) {
        await Product.create({
          name: product.title,
          price: product.price,
          imageUrl: product.image,
          description: product.description,
          stock: Math.floor(Math.random() * 500) + 1,
        });
      }
      console.log("Products seeded Successfully!");
    } catch (err) {
      console.log(err);
    }
  }

  await seedProducts();
  const products = await Product.findAll();
  orders = await Order.findAll();

  // Adding Products to Orders
  const orderProducts = await Promise.all([
    await orders[0].addProduct(products[0], {
      through: { quantity: 1, price: products[0].price },
    }),
    await orders[0].addProduct(products[2], {
      through: { quantity: 1, price: products[2].price },
    }),
    await orders[1].addProduct(products[1], {
      through: { quantity: 1, price: products[1].price },
    }),
    await orders[1].addProduct(products[2], {
      through: { quantity: 2, price: products[2].price },
    }),
    await orders[1].addProduct(products[3], {
      through: { quantity: 2, price: products[3].price },
    }),
    await orders[6].addProduct(products[4], {
      through: { quantity: 10, price: products[4].price },
    }),
    await orders[3].addProduct(products[4], {
      through: { quantity: 1, price: products[4].price },
    }),
    await orders[5].addProduct(products[0], {
      through: { quantity: 1, price: products[0].price },
    }),
    await orders[5].addProduct(products[1], {
      through: { quantity: 2, price: products[1].price },
    }),
    await orders[5].addProduct(products[2], {
      through: { quantity: 3, price: products[2].price },
    }),
    await orders[7].addProduct(products[10], {
      through: { quantity: 7, price: products[10].price },
    }),
  ]);
  console.log(`seeded ${orderProducts.length} order products`);

  console.log(`
    seeded successfully
    db synced!
  `);

  // Run 'npm run seed' when changing or adding data.
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
