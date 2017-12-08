DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE product_table(
	id INT(10) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
	product_category VARCHAR(50) NOT NULL,
	product_price DECIMAL(6, 2) NOT NULL,
	product_quantity INT(4) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO product_table (product_name, product_category, product_price, product_quantity)
VALUE ("Samsung P10", "Electronics", 700, 50);

INSERT INTO product_table (product_name, product_category, product_price, product_quantity)
VALUE ("iPhone One", "Electronics", 1000, 80);

INSERT INTO product_table (product_name, product_category, product_price, product_quantity)
VALUE ("Xbox S4", "Electronics", 1200, 30);

INSERT INTO product_table (product_name, product_category, product_price, product_quantity)
VALUE ("Baseball Bat", "Sports & Outdoors", 35, 100);

INSERT INTO product_table (product_name, product_category, product_price, product_quantity)
VALUE ("Golf Club Set", "Sports & Outdoors", 250, 80);

INSERT INTO product_table (product_name, product_category, product_price, product_quantity)
VALUE ("Sports Illustrated", "Books & Audible", 4.99, 300);

INSERT INTO product_table (product_name, product_category, product_price, product_quantity)
VALUE ("High Performance Javascript", "Books & Audible", 14.99, 200);

INSERT INTO product_table (product_name, product_category, product_price, product_quantity)
VALUE ("AAD: Algorithm Aided Design", "Books & Audible", 34.99, 80);

INSERT INTO product_table (product_name, product_category, product_price, product_quantity)
VALUE ("Baldur's Gate: Tales of the Sword Coast", "Movies, Music & Games", 24.99, 100);

INSERT INTO product_table (product_name, product_category, product_price, product_quantity)
VALUE ("Pillars of Eternity", "Movies, Music & Games", 24.99, 200);