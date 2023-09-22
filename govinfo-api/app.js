require("dotenv").config();
const axios = require("axios");
const express = require("express");
const flatted = require("flatted");
const app = express();
app.use(express.json());

app.get("/collections", async (req, res) => {
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/collections?api_key=${process.env.API_KEY}`
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(flatted.stringify(response));
    } catch(err) {
        console.error(err);
    }
})

module.exports = app;