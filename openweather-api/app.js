require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    const options = {
        method: "GET",
        url: "https://api.openweathermap.org/data/3.0/onecall",
        params: {
            lat: 33.44,
            lon: -94.04,
            appid: process.env.API_KEY
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(response);
    } catch(err) {
        console.error(err);
    }
})