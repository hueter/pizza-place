-- CREATE TABLE users
-- (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(50) NOT NULL,
--   last_name VARCHAR(50) NOT NULL,
--   email VARCHAR(100) NOT NULL UNIQUE,
--   password VARCHAR(100) NOT NULL
-- );

-- CREATE TABLE toppings
-- (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(50) NOT NULL UNIQUE,
--   price FLOAT NOT NULL,
--   recommended BOOLEAN
-- );

-- CREATE TABLE sizes
-- (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   inches INT NOT NULL,
--   price FLOAT NOT NULL
-- );

-- CREATE TABLE pizzas
-- (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(50) NOT NULL,
--   size INT,
--   FOREIGN KEY (size) REFERENCES sizes(id) ON DELETE SET NULL
-- );

-- CREATE TABLE pizzas_toppings
-- (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   pizza_id INT NOT NULL,
--   topping_id INT NOT NULL,
--   FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE,
--   FOREIGN KEY (topping_id) REFERENCES toppings(id) ON DELETE CASCADE
-- );

-- CREATE TABLE orders
-- (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   user_id INT,
--   order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   total FLOAT NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
-- );

-- CREATE TABLE pizzas_orders (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   pizza_id INT NOT NULL,
--   order_id INT NOT NULL,
--   FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE,
--   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
-- );


-- Basic Data

INSERT INTO users (first_name, last_name, email, password)
  VALUES ('Michael', 'Hueter', 'test@a.com', '1234');

INSERT INTO toppings (name, price, recommended)
  VALUES ('pepperoni', 1.50, false);
INSERT INTO toppings (name, price, recommended)
  VALUES ('sausage', 3.00, false);
INSERT INTO toppings (name, price, recommended)
  VALUES ('ham', 2.50, false);
INSERT INTO toppings (name, price, recommended)
  VALUES ('chicken', 2.25, false);
INSERT INTO toppings (name, price, recommended)
  VALUES ('mushrooms', 1.50, false);
INSERT INTO toppings (name, price, recommended)
  VALUES ('peppers', 1.50, false);
INSERT INTO toppings (name, price, recommended)
  VALUES ('fresh basil', 2.00, false);

INSERT INTO sizes (inches, price)
  VALUES (12, 12.00);
INSERT INTO sizes (inches, price)
  VALUES (14, 14.00);
INSERT INTO sizes (inches, price)
  VALUES (16, 16.00);
INSERT INTO sizes (inches, price)
  VALUES (18, 18.00);

INSERT INTO pizzas (name, size)
  VALUES ('14-inch Meat-Lovers', 1);
INSERT INTO pizzas (name, size)
  VALUES ('12-inch Veggie', 1);

INSERT INTO pizzas_toppings (pizza_id, topping_id)
  VALUES (1, 1);
INSERT INTO pizzas_toppings (pizza_id, topping_id)
  VALUES (1, 2);
INSERT INTO pizzas_toppings (pizza_id, topping_id)
  VALUES (1, 3);
INSERT INTO pizzas_toppings (pizza_id, topping_id)
  VALUES (1, 4);

INSERT INTO pizzas_toppings (pizza_id, topping_id)
  VALUES (2, 5);
INSERT INTO pizzas_toppings (pizza_id, topping_id)
  VALUES (2, 6);
INSERT INTO pizzas_toppings (pizza_id, topping_id)
  VALUES (2, 7);

INSERT INTO orders (user_id, total)
 VALUES (1, 15.00);

INSERT INTO pizzas_orders (pizza_id, order_id)
  VALUES (2, 1);
