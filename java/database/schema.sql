BEGIN TRANSACTION;

DROP TABLE IF EXISTS meal_plan_meal, meal_plan, meal_recipe, ingredients_recipe, users_meal, recipe_users, meal, ingredients, recipe, users CASCADE;
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
    name varchar(50) NOT NULL,
    toBePurchased boolean NOT NULL DEFAULT FALSE,
    CONSTRAINT PK_ingredients PRIMARY KEY (ingredients_id)
);

CREATE TABLE ingredients_recipe(
    ingredients_id int NOT NULL,
    recipe_id int NOT NULL,
    amount decimal(10,2) NOT NULL,
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

INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

INSERT INTO recipe (title, details, instructions, dish_type, isPublic) VALUES('Test Recipe 1', 'Recipe Details 1 (life story etc.)', 'Recipe 1 Instructions (Amounts, 1., 2., 3.)', 'Vegan', false);
INSERT INTO recipe (title, details, instructions, dish_type, isPublic) VALUES('Test Recipe 2', 'Recipe Details 2 (life story etc.)', 'Recipe 2 Instructions (Amounts, 1., 2., 3.)', 'Diary-Free', false);
INSERT INTO recipe (title, details, instructions, dish_type, isPublic) VALUES('Test Recipe 3', 'Recipe Details 3 (life story etc.)', 'Recipe 3 Instructions (Amounts, 1., 2., 3.)', NULL , false);
INSERT INTO recipe (title, details, instructions, dish_type, isPublic) VALUES('Test Recipe 4', 'Recipe Details 4 (life story etc.)', 'Recipe 4 Instructions (Amounts, 1., 2., 3.)', ('Keto' ,'Soy-Free'), false);

INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 1, Recipe 1', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 2, Recipe 1', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 3, Recipe 1', true);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 4, Recipe 1', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 5, Recipe 1', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 6, Recipe 1', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 7, Recipe 1', false);

INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 1, Recipe 2', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 2, Recipe 2', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 3, Recipe 2', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 4, Recipe 2', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 5, Recipe 2', true);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 6, Recipe 2', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 7, Recipe 2', false);

INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 1, Recipe 3', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 2, Recipe 3', true);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 3, Recipe 3', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 4, Recipe 3', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 5, Recipe 3', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 6, Recipe 3', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 7, Recipe 3', true);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 8, Recipe 3', false);

INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 1, Recipe 4', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 2, Recipe 4', true);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 3, Recipe 4', false);
INSERT INTO ingredients (name , toBePurchased) VALUES ('Test ingredients 4, Recipe 4', false);

INSERT INTO meal(title, description) VALUES ('Test meal 1', 'Long winded description 1');
INSERT INTO meal(title, description) VALUES ('Test meal 2', 'Long winded description 2');

INSERT INTO users_meal (user_id, meal_id) VALUES ((SELECT user_id FROM users where username = 'user'),(SELECT meal_id FROM meal where title = 'Test meal 1'));
INSERT INTO users_meal (user_id, meal_id) VALUES ((SELECT user_id FROM users where username = 'user'),(SELECT meal_id FROM meal where title = 'Test meal 2'));

INSERT INTO meal_plan (user_id, name) VALUES ((SELECT user_id FROM users WHERE username = 'user'), 'Test meal plan 1');

INSERT INTO recipe_users (recipe_id, user_id) VALUES ((SELECT recipe_id from recipe r WHERE r.title = 'Test Recipe 1'), (SELECT user_id FROM users WHERE username = 'user'));
INSERT INTO recipe_users (recipe_id, user_id) VALUES ((SELECT recipe_id from recipe r WHERE r.title = 'Test Recipe 2'), (SELECT user_id FROM users WHERE username = 'user'));
INSERT INTO recipe_users (recipe_id, user_id) VALUES ((SELECT recipe_id from recipe r WHERE r.title = 'Test Recipe 3'), (SELECT user_id FROM users WHERE username = 'user'));
INSERT INTO recipe_users (recipe_id, user_id) VALUES ((SELECT recipe_id from recipe r WHERE r.title = 'Test Recipe 4'), (SELECT user_id FROM users WHERE username = 'user'));

INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%1, Recipe 1'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 1%'), 2.0);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%2, Recipe 1'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 1%'), 1.0);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%3, Recipe 1'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 1%'), 7.0);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%4, Recipe 1'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 1%'), 1.5);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%5, Recipe 1'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 1%'), 3.25);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%6, Recipe 1'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 1%'), 2.0);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%7, Recipe 1'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 1%'), 1.0);

INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%1, Recipe 2'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 2%'), 1.0);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%2, Recipe 2'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 2%'), 12.0);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%3, Recipe 2'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 2%'), 1.5);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%4, Recipe 2'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 2%'), 2.25);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%5, Recipe 2'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 2%'), 4.0);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%6, Recipe 2'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 2%'), 1.5);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%7, Recipe 2'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 2%'), 1.0);

INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%1, Recipe 3'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 3%'), 4.0);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%2, Recipe 3'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 3%'), 0.25);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%3, Recipe 3'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 3%'), 0.50);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%4, Recipe 3'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 3%'), 1.5);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%5, Recipe 3'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 3%'), 14.0);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%6, Recipe 3'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 3%'), 2.5);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%7, Recipe 3'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 3%'), 1.75);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%8, Recipe 3'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 3%'), 1.0);

INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%1, Recipe 4'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 4%'), 3.0);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%2, Recipe 4'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 4%'), 2.5);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%3, Recipe 4'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 4%'), 10.0);
INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) VALUES((SELECT ingredients_id from ingredients i where i.name LIKE '%4, Recipe 4'),(SELECT recipe_id FROM recipe r WHERE r.title LIKE '%Recipe 4%'), 1.5);

INSERT INTO meal_recipe (meal_id, recipe_id) VALUES ((SELECT meal_id from meal m WHERE m.title = 'Test meal 1') , (SELECT recipe_id from recipe r WHERE r.title = 'Test Recipe 1'));
INSERT INTO meal_recipe (meal_id, recipe_id) VALUES ((SELECT meal_id from meal m WHERE m.title = 'Test meal 1') , (SELECT recipe_id FROM recipe r WHERE r.title = 'Test Recipe 2'));
INSERT INTO meal_recipe (meal_id, recipe_id) VALUES ((SELECT meal_id from meal m WHERE m.title = 'Test meal 2') , (SELECT recipe_id FROM recipe r WHERE r.title = 'Test Recipe 3'));
INSERT INTO meal_recipe (meal_id, recipe_id) VALUES ((SELECT meal_id from meal m WHERE m.title = 'Test meal 2') , (SELECT recipe_id FROM recipe r WHERE r.title = 'Test Recipe 4'));
INSERT INTO meal_recipe (meal_id, recipe_id) VALUES ((SELECT meal_id from meal m WHERE m.title = 'Test meal 2') , (SELECT recipe_id FROM recipe r WHERE r.title = 'Test Recipe 1'));

INSERT INTO meal_plan_meal (meal_plan_id, meal_id) VALUES ((SELECT meal_plan_id FROM meal_plan p WHERE p.name = 'Test meal plan 1'), (SELECT meal_id FROM meal m WHERE m.title = 'Test meal 2'));

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

COMMIT TRANSACTION;
