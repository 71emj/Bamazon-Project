USE bamazon_db;

ALTER TABLE product_table MODIFY COLUMN product_sales DECIMAL(12, 2);
ALTER TABLE product_table MODIFY COLUMN product_price DECIMAL(8, 2);