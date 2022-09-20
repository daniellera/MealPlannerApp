BEGIN TRANSACTION;

DROP TABLE IF EXISTS meal_plan_users, meal_plan_meal, meal_plan, meal_recipe, ingredients_recipe, users_meal, recipe_users, meal, ingredients, recipe, users CASCADE;
DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE recipe (
    recipe_id serial,
    title varchar(50) NOT NULL,
    details varchar(2000) NOT NULL,
    instructions varchar(2000) NOT NULL,
    dish_type varchar(50) NULL,
    isPublic boolean NOT NULL DEFAULT FALSE,
    CONSTRAINT PK_recipe PRIMARY KEY (recipe_id)

);

CREATE TABLE recipe_users(
    recipe_id int NOT NULL,
    user_id int NOT NULL,
    CONSTRAINT PK_recipe_users PRIMARY KEY (recipe_id, user_id)

);

CREATE TABLE ingredients(
    ingredients_id serial,
    name varchar(100) NOT NULL,
    amount varchar(100) NOT NULL,
    toBePurchased boolean NOT NULL DEFAULT FALSE,
    CONSTRAINT PK_ingredients PRIMARY KEY (ingredients_id)
);

CREATE TABLE ingredients_recipe(
    ingredients_id int NOT NULL,
    recipe_id int NOT NULL,
    CONSTRAINT PK_ingredients_recipe PRIMARY KEY (ingredients_id, recipe_id)

);

CREATE TABLE meal(
    meal_id serial,
    title varchar (255) NOT NULL,
    description varchar (2000) NOT NULL,
    CONSTRAINT PK_meal PRIMARY KEY (meal_id)
);

CREATE TABLE users_meal (
    user_id int NOT NULL,
    meal_id int NOT NULL,
    CONSTRAINT PK_users_meal PRIMARY KEY (user_id, meal_id)

);

CREATE TABLE meal_recipe(
    meal_id int NOT NULL,
    recipe_id int NOT NULL,
    CONSTRAINT PK_meal_recipe PRIMARY KEY(meal_id, recipe_id)

);

CREATE TABLE meal_plan(
    meal_plan_id serial,
    user_id int NOT NULL,
    name varchar (255) NOT NULL,
    CONSTRAINT PK_meal_plan PRIMARY KEY (meal_plan_id)

);

CREATE TABLE meal_plan_meal(
    meal_plan_id int NOT NULL,
    meal_id int NOT NULL,
    CONSTRAINT PK_meal_plan_meal PRIMARY KEY (meal_plan_id, meal_id)
);
	
CREATE TABLE meal_plan_users(
    meal_plan_id int NOT NULL,
    user_id int NOT NULL,
    CONSTRAINT PK_meal_plan_users PRIMARY KEY (meal_plan_id, user_id)
);



INSERT INTO users (username,password_hash,role) VALUES ('PrepMeals','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

INSERT INTO recipe (title, details, instructions, dish_type, isPublic) VALUES('Apple Cinnamon Oatmeal', 'This is a wonderful, simple recipe for an apple cinnamon oatmeal. Even the kids can make this one!', 'Combine the water, apple juice, and apples in a saucepan. Bring to a boil over high heat, and stir in the rolled oats and cinnamon. Return to a boil, then reduce heat to low, and simmer until thick, about 3 minutes. Spoon into serving bowls, and pour milk over the servings.', 'Vegetarian', false);
INSERT INTO recipe (title, details, instructions, dish_type, isPublic) VALUES('Vegan Kale Smoothie', 'Combine kale, mango, pineapple, banana, and almond-coconut milk for a delicious and nutritious vegan smoothie the kids will love!', 'Combine kale, mango, pineapple, 1 cup almond-coconut milk, banana, chia seeds, and flax seed in a high-performance blender (such as Vitamix®); blend until smooth. Add more coconut milk beverage if mixture is too thick.', 'Vegan', false);
INSERT INTO recipe (title, details, instructions, dish_type, isPublic) VALUES('Best Homemade Pizza', 'I love this Easy Homemade Pizza Recipe! I have been perfecting this recipe for years. It is quick to put together and so versatile. I’ll give you lots of tips, tricks, and ideas to get the best homemade pizza to ever come out of your wimpy, not-wood-fired oven!', concat('1. Place a pizza stone in the bottom third of your oven. (place a rimmed baking sheet or a pizza pan in the oven if you don''t have a stone.)',CHR(13),CHR(10),'2. Preheat your oven to 550 degrees F, or as high as it will go (at least 475.) Let the stone preheat for 30 minutes.',CHR(13),CHR(10),'3. Prepare a work surface with oil or flour if your dough is sticky, then roll out the dough until it is about 12 inches across',CHR(13),CHR(10),'4. Transfer dough to parchment paper, rub with oil over the top of the dough and let it rest for 10 minutes for a thicker crust',CHR(13),CHR(10),'5. Par bake the dough in the over for 1-2 minutes or until the dough is slightly puffed, be sure to poke any bubbles in the crust',CHR(13),CHR(10),'6. Add pizza sauce, thinly sliced mozzarella and shredded mozzarella and the pepperoni slices evenly across',CHR(13),CHR(10),'7. Bake the pizza for about 8-12 minutes',CHR(13),CHR(10),'8. When the crust is golden brown, remove from the oven and place directly onto a cooling rack. Let cool and enjoy :)'), NULL , false);
INSERT INTO recipe (title, details, instructions, dish_type, isPublic) VALUES('Mexican Tinga', 'This is an authentic Mexican favorite! Shredded chicken and onions simmered in a thick chipotle sauce served on crunchy tostadas.', concat('Step 1: Heat olive oil in a saucepan over medium heat. Add the onions; cook and stir until softened and translucent, about 5 minutes. Meanwhile, puree the tomatoes with chipotle peppers and adobo sauce to taste. Pour into the onions, and add chicken. Cover, and simmer for 20 minutes.',CHR(13),CHR(10),' Step 2: To serve, mound the chicken onto tostada shells, and garnish with a dollop of sour cream.'), NULL, false);

INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('water', '1 cup', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('apple juice', '1/4 cup', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('apple', '1 cored and chopped', true);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('rolled oats', '2/3 cup', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('ground cinnamon', '1 tsp.', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('milk', '1 cup', false);

INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('chopped kale', '2 cups', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('frozen mango chunks', '1 cup', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('frozen pineapple chunks', '1 cup', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('almond milk', '1 cup', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('banana', '1 small', true);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('chia seeds', '2 tbsp.', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('flax seeds', '1 tbsp.', false);

INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('ball of pizza dough', '1 lb.', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('olive oil to coat', '1 tbsp.', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('pizza sauce', '1 cup', true);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('mozzarella cheese (thinly sliced)', '3 oz.', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('mozzarella cheese (shredded)', '5 oz.', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('pepperoni', '2.5 oz.',false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('parmesan cheese (shredded)', '2 tbsp.', true);

INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('olive oil', '2 tbsp.', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('onion', '1 large, cut into rings', true);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('stewed tomatoes', '1 (15 oz.) can', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('chipotle peppers in adobo sauce', '1 (7 oz.) can', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('shredded chicken meat', '2 lbs.', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('tostada shells', '16 shells', false);
INSERT INTO ingredients (name , amount, toBePurchased) VALUES ('sour cream', '1/2 cup', false);

INSERT INTO meal(title, description) VALUES ('Smoothies', 'Long winded description 1');
INSERT INTO meal(title, description) VALUES ('Cheat Day', 'Long winded description 2');

INSERT INTO users_meal (user_id, meal_id) VALUES ((SELECT user_id FROM users where username = 'PrepMeals'),(SELECT meal_id FROM meal where title = 'Smoothies'));
INSERT INTO users_meal (user_id, meal_id) VALUES ((SELECT user_id FROM users where username = 'PrepMeals'),(SELECT meal_id FROM meal where title = 'Cheat Day'));

INSERT INTO meal_plan (user_id, name) VALUES ((SELECT user_id FROM users WHERE username = 'PrepMeals'), 'Test meal plan 1');

INSERT INTO recipe_users (recipe_id, user_id) VALUES ((SELECT recipe_id from recipe r WHERE r.title = 'Apple Cinnamon Oatmeal'), (SELECT user_id FROM users WHERE username = 'PrepMeals'));
INSERT INTO recipe_users (recipe_id, user_id) VALUES ((SELECT recipe_id from recipe r WHERE r.title = 'Vegan Kale Smoothie'), (SELECT user_id FROM users WHERE username = 'PrepMeals'));
INSERT INTO recipe_users (recipe_id, user_id) VALUES ((SELECT recipe_id from recipe r WHERE r.title = 'Best Homemade Pizza'), (SELECT user_id FROM users WHERE username = 'PrepMeals'));
INSERT INTO recipe_users (recipe_id, user_id) VALUES ((SELECT recipe_id from recipe r WHERE r.title = 'Mexican Tinga'), (SELECT user_id FROM users WHERE username = 'PrepMeals'));

INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'water'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Apple Cinnamon Oatmeal'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'apple juice'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Apple Cinnamon Oatmeal'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'apple'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Apple Cinnamon Oatmeal'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'rolled oats'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Apple Cinnamon Oatmeal'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'ground cinnamon'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Apple Cinnamon Oatmeal'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'milk'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Apple Cinnamon Oatmeal'));

INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'chopped kale'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Vegan Kale Smoothie'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'frozen mango chunks'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Vegan Kale Smoothie'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'frozen pineapple chunks'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Vegan Kale Smoothie'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'almond milk'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Vegan Kale Smoothie'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'banana'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Vegan Kale Smoothie'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'chia seeds'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Vegan Kale Smoothie'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'flax seeds'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Vegan Kale Smoothie'));

INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'ball of pizza dough'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Best Homemade Pizza'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'olive oil to coat'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Best Homemade Pizza'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'pizza sauce'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Best Homemade Pizza'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'mozzarella cheese (thinly sliced)'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Best Homemade Pizza'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'mozzarella cheese (shredded)'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Best Homemade Pizza'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'pepperoni'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Best Homemade Pizza'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'parmesan cheese (shredded)'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Best Homemade Pizza'));

INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'olive oil'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Mexican Tinga'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'onion'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Mexican Tinga'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'stewed tomatoes'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Mexican Tinga'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'chipotle peppers in adobo sauce'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Mexican Tinga'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'shredded chicken meat'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Mexican Tinga'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'tostada shells'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Mexican Tinga'));
INSERT INTO ingredients_recipe (ingredients_id, recipe_id) VALUES((SELECT ingredients_id from ingredients i where i.name = 'sour cream'),(SELECT recipe_id FROM recipe r WHERE r.title = 'Mexican Tinga'));



INSERT INTO meal_recipe (meal_id, recipe_id) VALUES ((SELECT meal_id from meal m WHERE m.title = 'Smoothies') , (SELECT recipe_id from recipe r WHERE r.title = 'Apple Cinnamon Oatmeal'));
INSERT INTO meal_recipe (meal_id, recipe_id) VALUES ((SELECT meal_id from meal m WHERE m.title = 'Smoothies') , (SELECT recipe_id FROM recipe r WHERE r.title = 'Vegan Kale Smoothie'));
INSERT INTO meal_recipe (meal_id, recipe_id) VALUES ((SELECT meal_id from meal m WHERE m.title = 'Cheat Day') , (SELECT recipe_id FROM recipe r WHERE r.title = 'Best Homemade Pizza'));
INSERT INTO meal_recipe (meal_id, recipe_id) VALUES ((SELECT meal_id from meal m WHERE m.title = 'Cheat Day') , (SELECT recipe_id FROM recipe r WHERE r.title = 'Mexican Tinga'));
INSERT INTO meal_recipe (meal_id, recipe_id) VALUES ((SELECT meal_id from meal m WHERE m.title = 'Cheat Day') , (SELECT recipe_id FROM recipe r WHERE r.title = 'Apple Cinnamon Oatmeal'));

INSERT INTO meal_plan_meal (meal_plan_id, meal_id) VALUES ((SELECT meal_plan_id FROM meal_plan p WHERE p.name = 'Test meal plan 1'), (SELECT meal_id FROM meal m WHERE m.title = 'Cheat Day'));

INSERT INTO meal_plan_users (meal_plan_id, user_id) VALUES ((SELECT meal_plan_id FROM meal_plan p WHERE p.name = 'Test meal plan 1'), (SELECT user_id FROM users u WHERE u.username = 'PrepMeals'));
--foreign keys

ALTER TABLE recipe_users ADD CONSTRAINT FK_recipe_users_users FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE recipe_users ADD CONSTRAINT FK_recipe_users_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id);

ALTER TABLE ingredients_recipe ADD CONSTRAINT FK_ingredients_recipe_ingredients FOREIGN KEY (ingredients_id) REFERENCES ingredients( ingredients_id);

ALTER TABLE ingredients_recipe ADD CONSTRAINT FK_ingredients_recipe_recipe FOREIGN KEY (recipe_id) REFERENCES recipe (recipe_id);

ALTER TABLE meal_recipe ADD CONSTRAINT FK_meal_recipe_meal FOREIGN KEY (meal_id) REFERENCES meal (meal_id);

ALTER TABLE meal_recipe ADD CONSTRAINT FK_meal_recipe_recipe FOREIGN KEY (recipe_id) REFERENCES recipe (recipe_id);

ALTER TABLE meal_plan ADD CONSTRAINT FK_meal_plan_users FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE meal_plan ADD CONSTRAINT FK_meal_plan_meal_users FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE meal_plan_meal ADD CONSTRAINT FK_meal_plan_meal_meal_plan FOREIGN KEY (meal_plan_id) REFERENCES meal_plan (meal_plan_id);

ALTER TABLE meal_plan_meal ADD CONSTRAINT FK_meal_plan_meal_meal FOREIGN KEY (meal_id) REFERENCES meal (meal_id);

ALTER TABLE users_meal ADD CONSTRAINT FK_users_meal_users FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE users_meal ADD CONSTRAINT FK_users_meal_meal FOREIGN KEY (meal_id) REFERENCES meal (meal_id);

ALTER TABLE meal_plan_users ADD CONSTRAINT FK_meal_plan_users_meal_plan FOREIGN KEY (meal_plan_id) REFERENCES meal_plan (meal_plan_id);

ALTER TABLE meal_plan_users ADD CONSTRAINT FK_meal_plan_users_users FOREIGN KEY (user_id) REFERENCES users (user_id);

COMMIT TRANSACTION;
