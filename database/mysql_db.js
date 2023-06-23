const mysql = require("mysql");

const config = {
    host: "localhost",
    user: "root",
    password: null,
    database: "test",
};

const connection = mysql.createConnection(config);


module.exports = {
    connection
}