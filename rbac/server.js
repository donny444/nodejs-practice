const http = require("http");
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const server = http.createServer(app);

app.use(express.json());

//Register
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if(!(username && email && password)) {
            return res.status(400).send("All input is required");
        }
        const existedEmail = users.find((user) => user.email === email);
        const existedUsername = users.find((user) => user.username === username);
        if(existedEmail) {
            return res.status(400).send("This email already registered");
        }
        if(existedUsername) {
            return res.status(400).send("This username have been used");
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = {
            username: username,
            email: email,
            password: encryptedPassword
        }
        users.push(user);
        const token = jwt.sign(
            {username: user.username},
            process.env.TOKEN_KEY,
            {
                expiresIn: 60*60
            }
        )
        user.token = token;
        return res.status(201).json(user);
    } catch(err) {
        console.error(err);
    }
})

//Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!(email && password)) {
            return res.status(400).send("All input is required");
        }
        const existedEmail = users.find((user) => user.email === email);
        if(existedEmail && (await bcrypt.compare(password, existedEmail.password))) {
            const token = jwt.sign(
                {username: existedEmail.username},
                process.env.TOKEN_KEY,
                {
                    expiresIn: 60*60
                }
            )
            existedEmail.token = token;
            return res.status(200).json(existedEmail);
        } else {
            return res.status(401).send("Invalid Credentials")
        }
    } catch(err) {
        console.error(err);
    }
})

//Incomplete
app.post("/welcome", auth, (req, res) => {
    return res.status(200).send("Welcome");
})

server.listen(port, () => console.log(`Server is running on port ${port}`));