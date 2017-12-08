require("dotenv").config();

const connectionVar = {
	host: process.env.DB_HOST || "localhost",
	port: process.env.DB_PORT || 3306,
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASS || "",
	database: "bamazon_db"
};

module.exports = connectionVar;