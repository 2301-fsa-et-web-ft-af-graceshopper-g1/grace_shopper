"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  // Creating Product
  const products = await Promise.all([
    Product.create({
      name: "HyperX Headset",
      price: 99.99,
      imageUrl: "https://m.media-amazon.com/images/I/71MJ3OaVqBL.jpg",
      description: "A great comfortable headset for an UNBEATABLE price!",
      quantityInStock: 10,
    }),
    Product.create({
      name: "Logitech Headset",
      price: 299.99,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0252/9705/9876/products/5_1_dcb1c1c1-6d88-420e-bff3-32eb5ef35077_1200x.png?v=1631134068",
      description: "A great comfortable headset for a actual BEATABLE price!",
      quantityInStock: 25,
    }),
  ]);

  // Run 'npm run seed' when changing or adding data.

  // console.log(`seeded ${users.length} users`);
  // console.log(`seeded successfully`);

  console.log(`seeded ${products.length} products `);
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
