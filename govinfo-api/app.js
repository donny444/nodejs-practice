require("dotenv").config();
const axios = require("axios");
const express = require("express");
const flatted = require("flatted");
const util = require("util");
const { stringify } = require("./utils.js");
const app = express();
app.use(express.json());

app.get("/collections", async (req, res) => {
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/collections`,
        params: {
            api_key: process.env.API_KEY
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);

        //return res.status(200).send(util.inspect(response["data"]["collections"]));
        //return res.status(200).send(flatted.stringify(response["data"]["collections"]));
        return res.status(200).send(stringify(response["data"]["collections"]));
    } catch (err) {
        console.error(err);
    }
})

app.get("/collections/:collection/:lastModifiedStartDate", async (req, res) => {
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/collections`,
        params: {
            offset: req.query.offset,
            pageSize: req.query.pageSize,
            api_key: process.env.API_KEY
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(stringify(response["data"]["collections"]));
    } catch (err) {
        console.error(err);
    }
})

module.exports = app;