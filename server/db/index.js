// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require("./db");
const Order = require("./models/order");
const User = require("./models/user");
const Pun = require("./models/pun");
const LineItem = require("./models/lineItem")

// This is a great place to establish associations between your models
// (https://sequelize-guides.netlify.com/association-types/).
// Example:
//
// Puppy.belongsTo(Owner)

//one to many relationship between users and orders
User.hasMany(Order);
Order.belongsTo(User);

//many to many relationship between puns and order
Order.belongsToMany(Pun, { through: LineItem });
Pun.belongsToMany(Order, { through: LineItem });

module.exports = {
  // Include your models in this exports object as well!
  db,
  models: {
    Order,
    User,
    Pun,
    LineItem
  }
};
