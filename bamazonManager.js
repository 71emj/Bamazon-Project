const DEBUG = true,
	Util = require("util");

console.log = (data) => {
	DEBUG && process.stdout.write(Util.format(data) + "\n");
};

const Inquirer = require("inquirer"),
   Mysql = require("mysql"),
   Chalk = require("chalk"),
   Table = require("cli-table-redemption");

const heading = (arr, color) => {
   return arr.map((elem) => {
      return Chalk.underline[color](elem);
   });
}

const connection = Mysql.createConnection(require("./connection_key.js"));

connection.connect((err) => {
   !!err && console.log(err);
   managerInterface("Hello, what would you like to do today?");
});

const managerTasks = {
   1: viewProducts,
   2: viewLowInventory,
   3: updateInventory,
   4: updateProductCatelog,
   0: function() {
      console.log("Okay see you next time.");
      connection.end();
   }
};

function managerInterface(msg) {
   Inquirer.prompt([{
      type: "list",
      message: msg,
      choices: [
         { name: "View Products", value: 1 },
         { name: "Low Inventory", value: 2 },
         { name: "Replenish Inventory", value: 3 },
         { name: "Add New Product", value: 4 },
         { name: "Nothing just checking", value: 0 }
      ],
      name: "task"
   }]).then((data) => {
      managerTasks[data.task]();
   });
}

function viewProducts() {
   const table = new Table({
      head: heading(["ID", "Product Name", "Price", "In Stock"], "cyanBright"),
      colWidths: [5, 50, 15, 10]
   });
   connection.query(
      "SELECT * FROM product_table",
      (err, res, fields) => {
         !!err && console.log(err);
         res.forEach((elem) => {
            table.push([elem.id, elem.product_name, elem.product_price, elem.product_quantity]);
         });
         console.log(table.toString());
         managerInterface("Anything else I can do for you?");
      });
}

function viewLowInventory() {
   const table = new Table({
      head: heading(["ID", "Product Name", "In Stock"], "magenta"),
      colWidths: [5, 50, 10]
   });
   connection.query(
      "SELECT id, product_name, product_quantity FROM product_table WHERE product_quantity <= 5",
      (err, res, fields) => {
         !!err && console.log(err);
         res.forEach((elem) => {
            table.push([elem.id, elem.product_name, Chalk.bold.red(elem.product_quantity)]);
         });
         console.log(table.toString());
         managerInterface("Anything else I can do for you?");
      });
}

function updateInventory() {
   const table = new Table({
      head: heading(["ID", "Department", "Overhead", "Sales"], "yellowBright"),
      colWidths: [5, 50, 15, 10]
   });
   connection.query(
      "SELECT * FROM product_table",
      (err, res, fields) => {
         !!err && console.log(err);

         const arr = new Array();
         res.forEach((elem) => {
            table.push([elem.id, elem.product_name, elem.product_price, elem.product_quantity]);
            arr.push({ name: elem.id, value: elem.product_name });
         });

         console.log(table.toString());

         Inquirer.prompt([{
            type: "list",
            message: "Which product would you like to stock today?",
            choices: arr,
            name: "product"
         }, {
            type: "input",
            message: "Great by how much?",
            name: "amount",
            validate: (val) => {
               return !(isNaN(val) || !parseInt(val) || val < 0);
            }
         }]).then((data) => {
            connection.query(
               "UPDATE product_table SET product_quantity = product_quantity + ? WHERE product_name = ?", [data.amount, data.product],
               (err, res, fields) => {
                  !!err && console.log(err);
                  console.log("Successfully add ", data.amount + " to ", data.product);
                  managerInterface("Anything else I can do for you?");
               }
            );
         });
      }
   );
}

function updateProductCatelog() {
   connection.query(
      "SELECT department_name FROM department_table",
      (err, res, fields) => {
      	let departments = new Array();
      	res.forEach((elem) => {
      		departments.push(elem.department_name);
      	});

         Inquirer.prompt([{
            type: "list",
            message: "Which department would you like to add new product to?",
            choices: departments,
            name: "category"
         }, {
            type: "input",
            message: "What is the name of the product?",
            name: "name",
            filter: (val) => {
               const string = val.split(" ").map((elem) => {
                  return elem.replace(elem[0], elem[0].toUpperCase());
               });
               return string.join(" ");
            }
         }, {
            type: "input",
            message: "How much does it cost?",
            name: "price",
            validate: (val) => {
               return !(isNaN(val) || val < 0);
            }
         }, {
            type: "input",
            message: "What's the initial stock?",
            name: "quantity",
            validate: (val) => {
               return !(isNaN(val) || !parseInt(val) || val < 0);
            }
         }]).then((data) => {
            connection.query(
               "INSERT INTO product_table SET ?", [{
                  product_name: data.name,
                  product_category: data.category,
                  product_price: data.price,
                  product_quantity: data.quantity
               }], (err, res, fields) => {
                  !!err && console.log(err);
                  console.log("Successfully add ", data.name + " to the catelog!!");
                  managerInterface("Anything else I can do for you?");
               });
         });
      });
}