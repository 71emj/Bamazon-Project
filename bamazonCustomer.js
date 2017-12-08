const DEBUG = false;

const Inquirer = require("inquirer"),
   Mysql = require("mysql"),
   Chalk = require("chalk"),
   Table = require("cli-table-redemption");

const heading = ["ID", "Product Name", "Department", "Price", "In Stock"].map((elem) => {
   return Chalk.underline.blueBright(elem);
});

const connection = Mysql.createConnection(require("./connection_key.js"));

connection.connect((err) => {
   !!err && console.log(err);
   queryProducts();
});

function queryProducts() {
   const table = new Table({
      head: heading,
      colWidths: [5, 50, 30, 15, 10]
   });
   connection.query(
      "SELECT * FROM product_table", (err, res, fields) => {
         !!err && console.log(err);

         const arr = new Array();
         res.forEach((elem) => {
            table.push([elem.id, elem.product_name, elem.product_category, elem.product_price, elem.product_quantity]);
            arr.push({ name: elem.id, value: elem.product_name });
         });
         console.log(table.toString());
         buyFromBamazon(arr);
      });
}


function buyFromBamazon(productId) {
   Inquirer.prompt([{
      type: "list",
      message: "What would you like to buy today?",
      choices: productId,
      name: "choice"
   }, ]).then((data) => {
      checkIfAvailable(data.choice, productId)
   });
}

async function checkIfAvailable(productName, productId) {
   Inquirer.prompt([{
      type: "input",
      message: "How many of the " + Chalk.yellowBright(productName) + " would you like to purchase today?",
      name: "amount",
      validate: (val) => {
         return !(isNaN(val) || !parseInt(val) || val < 0);
      }
   }]).then((data) => {
      connection.query(
         "SELECT product_quantity FROM product_table WHERE product_name LIKE ?", productName,
         (err, res, fields) => {
            !!err && console.log(err);
            if (res[0].product_quantity < data.amount) {
               console.log("Sorry we don't have enough in stock...");
               return keepBuying(buyFromBamazon, productId);
            }
            console.log("Congrats you just bought %s %s", Chalk.cyanBright(data.amount), Chalk.yellowBright(productName));
            updateDatabase(productName, data.amount)
         });
   });
}

function updateDatabase(productName, amount) {
   connection.query(
      "UPDATE product_table SET product_quantity = product_quantity - ?, product_sales = product_sales + product_price * ? WHERE product_name LIKE ?", [amount, amount, productName],
      (err, res, fields) => {
         !!err && console.log(err);
         // console.log(res);
         keepBuying(queryProducts);
      });
}

function keepBuying(callback, arg) {
	Inquirer.prompt([{
		type: "confirm",
		message: "Would you like to buy something else?",
		name: "confirm"
	}]).then((data) => {
		if (!data.confirm) {
			console.log("Okay see you next time");
			return connection.end();
		}
		callback(arg);
	});
}