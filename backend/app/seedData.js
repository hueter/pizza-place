const { User, Topping, Size, Pizza, Order } = require('./models');

async function seedDatabase() {
  const queries = [];

  queries.push(
    User.findOrCreate({
      where: { email: 'test@michaelhueter.com' },
      defaults: {
        firstName: 'Michael',
        lastName: 'Hueter',
        password: '1234'
      }
    })
  );

  let toppings = [
    { name: 'pepperoni', price: 2.0, recommended: true },
    { name: 'sausage', price: 3.0, recommended: false },
    { name: 'ham', price: 2.0, recommended: false },
    { name: 'mushrooms', price: 1.5, recommended: true },
    { name: 'peppers', price: 1.5, recommended: false },
    { name: 'fresh basil', price: 1.5, recommended: true },
    { name: 'anchovies', price: 1.5, recommended: false },
    { name: 'pineapple', price: 2, recommended: false }
  ];

  toppings.forEach(topping => {
    const { name, price, recommended } = topping;
    queries.push(
      Topping.findOrCreate({
        where: { name },
        defaults: { price, recommended }
      })
    );
  });

  let sizes = [12, 14, 16, 18];

  sizes.forEach(size => {
    queries.push(
      Size.findOrCreate({
        where: { inches: size },
        defaults: { price: size - 2 }
      })
    );
  });

  await Order.findOrCreate({
    where: { id: 1 },
    defaults: { userId: 1, total: 10 }
  });
  await Order.findOrCreate({
    where: { id: 2 },
    defaults: { userId: 1, total: 10 }
  });

  await Promise.all(queries);

  const [newPizza, created] = await Pizza.findOrCreate({
    where: {
      sizeId: 1,
      orderId: 1
    }
  });

  if (created) await newPizza.setToppings([1, 4]);

  const [anotherNewPizza, created2] = await Pizza.findOrCreate({
    where: {
      sizeId: 3,
      orderId: 2
    }
  });

  if (created2) await anotherNewPizza.setToppings([2, 5]);
}

module.exports = seedDatabase;
