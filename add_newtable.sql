USE bamazon_db;

DROP TABLE IF EXISTS department_table;
CREATE TABLE department_table(
	id INT(10) NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(50) NOT NULL,
	department_overhead DECIMAL(12, 2) NOT NULL,
	PRIMARY KEY (id)
);

ALTER TABLE product_table 
ADD product_sales DECIMAL(10, 2) NOT NULL;


INSERT INTO department_table (department_name, department_overhead) 
VALUE ("Electronics", 350000);

INSERT INTO department_table (department_name, department_overhead) 
VALUE ("Books & Audible", 125000);

INSERT INTO department_table (department_name, department_overhead) 
VALUE ("Movies, Music & Games", 275000);

INSERT INTO department_table (department_name, department_overhead) 
VALUE ("Sports & Outdoors", 150000);