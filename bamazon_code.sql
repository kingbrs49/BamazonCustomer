drop database if exists Bamazon;
create database Bamazon;

use Bamazon;

create table products (
item_id INT (11) NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price DECIMAL (100, 2) NOT NULL,
stock_quantity INT (11),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('NFL Washington Redskins Fleece Throw', 'Sports & Leisure', 19.99, 50),
('NFL San Francisco 49ers Fleece Throw', 'Sports & Leisure', 19.99, 50),
('NFL Minnesota Vikings Fleece Throw', 'Sports & Leisure', 19.99, 50),
('NFL Pittsburgh Steelers Fleece Throw', 'Sports & Leisure', 19.99, 50),
('Team Golf NFL Oakland Raiders Gift Set', 'Sports & Leisure', 22.99, 45),
('Disney Coco Miguel 50x60 Fleece Throw', 'Film & Television', 29.99, 40),
('Jack & Sally Nightmare Before Christmas Charm Crescent Necklace', 'Film & Television', 9.99, 100),
('Doctor Who Fourth Doctor 12-foot Scarf', 'Film & Television', 22.99, 75),
('Loungefly x Disney Princess Portraits Allover-Print Wallet', 'Film & Television', 34.99, 30),
('NFL Green Bay Packers Sheer Infinity Scarf', 'Sports & Leisure', 14.99, 80),
('Disney Baymax Plush - Medium - 15 inch', 'Film & Television', 24.99, 50)
