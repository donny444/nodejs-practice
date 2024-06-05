"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get("/typescript", (req, res) => {
    res.send("Hello TypeScript");
});
app.get("/javascript", (req, res) => {
    res.send("Hello JavaScript");
});
app.listen(port, () => { console.log(`App listening at http://localhost:${port}`); });
