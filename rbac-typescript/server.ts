import http from "http";
import express, { Application } from 'express';
import connection from "./connection.ts";
import AuthRoutes from "./router/auth_routes.ts";
import RolesRoutes from "./router/roles_routes.ts";

connection.connect((err: Error) => {
    if (err) {
        console.log("Error connecting to database");
        return;
    }
    console.log("Connected to database");
});

const app: Application = express();
const server: http.Server = http.createServer(app);
const port: number = 5000;

app.use(express.json());


app.use("/auth", AuthRoutes);
app.use("/roles", RolesRoutes);

server.listen(port, () => console.log(`Server is running on port ${port}`));
