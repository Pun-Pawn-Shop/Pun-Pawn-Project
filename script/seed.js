'use strict';

const { db } = require('../server/db');
const {
  models: { Order, User, Pun },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const user1 = await User.create({
    firstName: 'Brenda',
    lastName: 'Wong',
    email: 'brenda.wong@gmail.com',
    password: '123',
    shippingAddressName: 'Brenda Wong',
    shippingAddressStreet: '123 Sesame St.',
    shippingAddressCity: 'New York City',
    shippingAddressState: 'NY',
    shippingAddressZip: '10036',
    billingAddressName: 'Brenda Wong',
    billingAddressStreet: '123 Sesame St.',
    billingAddressCity: 'New York City',
    billingAddressState: 'NY',
    billingAddressZip: '10036',
    userType: 'ADMIN',
  });

  const pun1 = await Pun.create({
    content: 'pretty fly for a wifi',
    author: 'Ben Rodriguez',
    price: 25,
    quantity: 3,
  });

  const pun2 = await Pun.create({
    content:
      "You're going to await awhile for the seed data as I've used all my seeds to plant trees.",
    author: 'Ben Rodriguez',
    price: 500,
    quantity: 1,
  });

  const pun3 = await Pun.create({
    content: "What's a computer's favorite beat? An algo-rhythm.",
    price: 50,
    quantity: 5,
  });

  const pun4 = await Pun.create({
    content:
      'The past, the present and the future walk into a bar. It was tense.',
    price: 5,
    quantity: 50,
  });

  const pun5 = await Pun.create({
    content:
      'To prove he was right, the flat-earther walked to the end of the Earth. He eventually came around.',
    price: 15,
    quantity: 20,
  });

  const pun6 = await Pun.create({
    content:
      'What did the cell say when his sister cell stepped on his foot? Mitosis.',
    price: 100,
    quantity: 7,
  });

  const pun7 = await Pun.create({
    content: 'Accupuncture is a jab well done.',
    price: 350,
    quantity: 3,
  });

  const order1 = await Order.create({
    status: 'open',
    emailAddress: 'brenda.wong@gmail.com',
    shippingAddressName: 'Brenda Wong',
    shippingAddressStreet: '123 Sesame St.',
    shippingAddressCity: 'New York City',
    shippingAddressState: 'NY',
    shippingAddressZip: '10036',
  });

  await order1.addPun(pun1);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
