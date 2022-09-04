BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;
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
    recipe_title varchar(50) NOT NULL,
    recipe_details varchar(2000) NOT NULL,
    recipe_instructions varchar(500) NOT NULL,
    recipe_dish_type varchar(50) NOT NULL,
    recipe_isPublic boolean NOT NULL,
    CONSTRAINT PK_recipe PRIMARY KEY (recipe_id),

);

CREATE TABLE recipe_users(
    recipe_id int NOT NULL,
    user_id int NOT NULL,
    CONSTRAINT PK_recipe_users PRIMARY KEY (recipe_id, user_id),
    CONSTRAINT FK_recipe_users_users FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT FK_recipe_users_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);

CREATE TABLE ingredients(
    ingredients_id serial,
    ingredients_name varchar(50) NOT NULL,
    toBePurchased boolean NOT NULL,
    CONSTRAINT PK_ingredients PRIMARY KEY (ingredients_id)
);

CREATE TABLE ingredients_recipe(
    ingredients_id int NOT NULL,
    recipe_id int NOT NULL,
    amount int NOT NULL,
    CONSTRAINT PK_ingredients_recipe PRIMARY KEY (ingredients_id, recipe_id),
    CONSTRAINT FK_ingredients_recipe_ingredients FOREIGN KEY (ingredients_id) REFERENCES ingredients(ingredients_id),
    CONSTRAINT FK_ingredients_recipe_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);

CREATE TABLE meal(
    meal_id serial,
    meal_title varchar (255) NOT NULL,
    meal_description varchar (2000) NOT NULL,
    CONSTRAINT PK_meal PRIMARY KEY (meal_id)
);

CREATE TABLE meal_plan(
    meal_plan_id serial,
    user_id int NOT NULL,
    CONSTRAINT PK_meal PRIMARY KEY (meal_id),
    CONSTRAINT FK_meal_plan_users FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE meal_plan_meal(
    meal_plan_id int NOT NULL,
    meal_id int NOT NULL,
    CONSTRAINT FK_meal_plan_meal_users FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT FK_meal_plan_meal_meal_plan FOREIGN KEY (meal_plan_id) REFERENCES meal_plan(meal_plan_id)
);

INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');


COMMIT TRANSACTION;
