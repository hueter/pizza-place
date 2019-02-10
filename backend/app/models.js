const Sequelize = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Topping = sequelize.define('topping', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  recommended: {
    type: Sequelize.BOOLEAN
  }
});

const Size = sequelize.define('size', {
  inches: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

const Pizza = sequelize.define('pizza', {
  name: Sequelize.STRING
});

// Many pizzas can be 12", 14" etc.
Size.hasMany(Pizza);

// Many Toppings go on Many Pizzas
Topping.belongsToMany(Pizza, { through: 'PizzaToppings' });

const Order = sequelize.define('order', {
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

// users can order a bunch of pizzas
User.hasMany(Order);

// certain pizzas can be ordered many times
Pizza.belongsToMany(Order, { through: 'PizzaOrders' });

sequelize.sync();

module.exports = {
  User,
  Topping,
  Size,
  Pizza,
  Order
};
