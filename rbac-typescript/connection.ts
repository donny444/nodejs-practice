import mysql from "mysql";

// XAMPP
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rbac-database"
});

export default connection;
