require("dotenv").config();
const axios = require("axios");
const express = require("express");
const flatted = require("flatted");
const util = require("util");
const { stringify } = require("./utils.js");
const app = express();
app.use(express.json());

//Request list of collections. Response includes collectionCode,collectionName,package and granule counts
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

//Retrive new or updated packages for a collection given a start date and time
app.get("/collections/:collection/:lastModifiedStartDate", async (req, res) => {
    const { collection, lastModifiedStartDate} = req.params;
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/collections/${collection}/${lastModifiedStartDate}`,
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
        return res.status(200).send(stringify(response["data"]));
    } catch (err) {
        console.error(err);
    }
})

//Retrive new or updated packages for a collection within a date range
app.get("/collections/:collection/:lastModifiedStartDate/:lastModifiedEndDate", async (req, res) => {
    const { collection, lastModifiedStartDate, lastModifiedEndDate } = req.params;
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/collections/${collection}/${lastModifiedStartDate}/${lastModifiedEndDate}`,
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
        return res.status(200).send(stringify(response["data"]));
    } catch (err) {
        console.error(err);
    }
})

//Return json summary for specified package
app.get("/packages/:packageId/summary", async (req, res) => {
    const { packageId } = req.params;
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/packages/${packageId}/summary`,
        params: {
            api_key: process.env.API_KEY
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(stringify(response["data"]));
    } catch (err) {
        console.error(err);
    }
})

//Get a list of granules associated with a package
app.get("/packages/:packageId/granules", async (req, res) => {
    const { packageId } = req.params;
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/packages/${packageId}/granules`,
        params: {
            api_key: process.env.API_KEY
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(stringify(response));
    } catch (err) {
        console.error(err);
    }
})

//Return json summary for specified granule
app.get("/packages/:packageId/granules/:granuleId/summary", async (req, res) => {
    const { packageId, granuleId } = req.params;
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/packages/${packageId}/granules/${granuleId}/summary`,
        params: {
            api_key: process.env.API_KEY
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(stringify(response));
    } catch (err) {
        console.error(err);
    }
})

app.post("/search", async (req, res) => {
    const options = {
        method: "POST",
        url: `https://api.govinfo.gov/search`,
        params: {
            api_key: process.env.API_KEY
        },
        data: {
            "query": "string",
            "pageSize": 3,
            "offsetMark": "string",
            "sorts": [
                {
                    "field": "string",
                    "sortOrder": "ASC"
                }
            ],
            "historical": true,
            "resultLevel": "default"
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(stringify(response["data"]["collections"]))
    } catch(err) {
        console.error(err);
    }
})

module.exports = app;