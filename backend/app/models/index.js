// database instance
const sequelize = require('../db');

// Schemas
const OrderSchema = require('./Order');
const PizzaSchema = require('./Pizza');
const SizeSchema = require('./Size');
const ToppingSchema = require('./Topping');
const UserSchema = require('./User');

const User = sequelize.define('user', UserSchema);
const Order = sequelize.define('order', OrderSchema);
// users can order a bunch of pizzas
User.hasMany(Order);

const Pizza = sequelize.define('pizza', PizzaSchema);
// a single order can contain several pizzas
Order.hasMany(Pizza);

const Size = sequelize.define('size', SizeSchema);
// every pizza has a size
Pizza.belongsTo(Size);

const Topping = sequelize.define('topping', ToppingSchema);
// Many Toppings go on Many Pizzas
Topping.belongsToMany(Pizza, { through: 'PizzaToppings' });
Pizza.belongsToMany(Topping, { through: 'PizzaToppings' });

module.exports = {
  User,
  Topping,
  Size,
  Pizza,
  Order
};
