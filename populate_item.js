// const DEBUG = true;
// DEBUG && console.log("It's running!");

// const Mysql = require("mysql"),
//    File = require("fs"),
//    Util = require("util");

// const log_file = File.createWriteStream(__dirname + "/log.txt", { flags: "a" }),
//    log_stdout = process.stdout;

// console.log = function(data) {
//    log_file.write(Util.format(data) + "\n");
//    log_stdout.write(Util.format(data) + "\n");
// };

// const connection = Mysql.createConnection(require("./connection_key.js"));

// connection.connect((err) => {
//    err && console.log(err);
//    console.log(connection.threadId);
//    console.log(connection.state);
//    console.log(connection.config);
//    connection.end();
// });

// const cat = ["Electronics", "Books & Audible", "Movies, Music & Games", "Sports & Outdoors", "Automotive"];