import mysql, { Connection } from "mysql";

// XAMPP
const connection: Connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rbac-database"
});

export default connection;