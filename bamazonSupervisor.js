const DEBUG = true;

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
   supervisorInterface("Hello, what would you like to do today?");
});

const supervisorTasks = {
   1: viewProductSales,
   2: addNewDepartment,
   3: cancelDepartment,
   0: function() {
      console.log("Okay see you next time.");
      connection.end();
   }
};

function supervisorInterface(msg) {
   Inquirer.prompt([{
      type: "list",
      message: msg,
      choices: [
         { name: "How's our sales so far?", value: 1 },
         { name: "I'd like to add a new department to the store.", value: 2 },
         { name: "I'd like to get rid of a department.", value: 3 },
         { name: "Nothing just checking", value: 0 }
      ],
      name: "task"
   }]).then((data) => {
      supervisorTasks[data.task]();
   });
}

function viewProductSales() {
   const table = new Table({
      head: heading(["ID", "Department", "Overhead", "Product Sales", "Profit"], "cyanBright"),
      colWidths: [5, 50, 20, 20, 20]
   });

   connection.query(
      "SELECT d.id, d.department_name, d.department_overhead, p.product_sales FROM department_table AS d INNER JOIN product_table AS p on d.department_name = p.product_category GROUP BY p.product_category ORDER BY d.id",
      (err, res, fields) => {
         !!err && console.log(err);

         res.forEach((elem) => {
            table.push([elem.id, elem.department_name, elem.department_overhead, elem.product_sales, (elem.product_sales - elem.department_overhead)]);
         });

         console.log(table.toString());
         supervisorInterface("Anything else I can do for you?");
      })
}

function addNewDepartment() {
   Inquirer.prompt([{
      type: "input",
      message: "What is the name of the department you would like to add to the store?",
      name: "name",
      filter: (val) => {
         const string = val.split(" ").map((elem) => {
            return elem.replace(elem[0], elem[0].toUpperCase());
         });
         return string.join(" ");
      }
   }, {
      type: "input",
      message: "What's gonna be the overhead cost of this new department?",
      name: "overhead",
      validate: (val) => {
         return !(isNaN(val) || !parseInt(val) || val < 0);
      }
   }]).then((data) => {
      connection.query(
         "INSERT INTO department_table SET ?", {
            department_name: data.name,
            department_overhead: data.overhead
         },
         (err, res, fields) => {
            !!err && console.log(err);
            console.log("Successfully add ", data.name + " to the store!!");
            supervisorInterface("Anything else I can do for you?");
         });
   });
}

function cancelDepartment() {
   connection.query(
      "SELECT department_name FROM department_table",
      (err, res, fields) => {
         let departments = new Array();
         res.forEach((elem) => {
            departments.push(elem.department_name);
         });

         Inquirer.prompt([{
            type: "list",
            message: "Which of these department would you like to take out today?",
            choices: departments,
            name: "department"
         }, {
            type: "confirm",
            message: "Are you sure? This means that everything including products and sales records will be deleted from the system Y/N",
            name: "confirm"
         }]).then((data) => {
            if (!data.confirm) {
               return supervisorInterface("Anything else I can do for you?");
            }
            connection.query(
               "DELETE FROM department_table WHERE department_name = ?;", data.department,
               (err, res, fields) => {
                  !!err && console.log(err);
                  connection.query(
                     "DELETE FROM product_table WHERE product_category = ?", data.department,
                     (err, res, fields) => {
                        !!err && console.log(err);
                        console.log("Successfully add ", data.amount + " to ", data.product);
                        DEBUG && console.log(res.affectedRows);
                        supervisorInterface("Anything else I can do for you?");
                     });
               }
            );
         });
      }
   );
}