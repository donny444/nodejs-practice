require("dotenv").config();
const axios = require("axios");
const express = require("express");
const flatted = require("flatted");
const util = require("util");
const { circular } = require("./utils.js");
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
        return res.status(200).send(circular(response["data"]["collections"]));
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
            offset: 0,
            pageSize: 5,
            api_key: process.env.API_KEY
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(circular(response["data"]));
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
            offset: 0,
            pageSize: 5,
            api_key: process.env.API_KEY
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(circular(response["data"]));
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
        return res.status(200).send(circular(response["data"]));
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
            offset: 0,
            pageSize: 5,
            api_key: process.env.API_KEY
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(circular(response["data"]));
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
        return res.status(200).send(circular(response["data"]));
    } catch (err) {
        console.error(err);
    }
})

//Retrieve list of packages based on dateIssued value
app.get("/published/:dateIssuedStartDate", async (req, res) => {
    const { dateIssuedStartDate } = req.params;
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/published/${dateIssuedStartDate}`,
        params: {
            api_key: process.env.API_KEY,
            offset: 0,
            pageSize: 5,
            collection: req.query.collection
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(circular(response["data"]));
    } catch (err) {
        console.error(err);
    }
})

//Retrive list of packages based on dateIssued value range
app.get("/published/:dateIssuedStartDate/:dataIssuedEndDate", async (req, res) => {
    const { dateIssuedStartDate, dateIssuedEndDate } = req.params;
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/published/${dateIssuedStartDate}/${dateIssuedEndDate}`, //message: "Use proper date format : which is yyyy-MM-dd'T'HH:mm:ss'Z' or yyyy-MM-dd"
        params: {
            api_key: process.env.API_KEY,
            offset: 0,
            pageSize: 5,
            collection: req.query.collection
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(circular(response["data"]));
    } catch (err) {
        console.error(err);
    }
})

//Get a list of relationships for a given accessId
app.get("/related/:accessId", async (req, res) => {
    const { accessId } = req.params;
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/related/${accessId}`,
        params: {
            api_key: process.env.API_KEY
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(circular(response["data"]));
    } catch (err) {
        console.error(err);
    }
})

//Get a list of relationships for a given accessId
app.get("/related/:accessId/:collection", async (req, res) => {
    const { accessId, collection } = req.params;
    const options = {
        method: "GET",
        url: `https://api.govinfo.gov/related/${accessId}/${collection}`,
        params: {
            api_key: process.env.API_KEY
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(circular(response["data"]));
    } catch (err) {
        console.error(err);
    }
})

//Discover documents on GovInfo using search queries and field operators available in the GovInfo UI (Public Preview)
app.post("/search", async (req, res) => { //message: 'Oops, Something went wrong, Please contact govinfo team for further assistance'
    const options = {
        method: "POST",
        url: `https://api.govinfo.gov/search`,
        params: {
            api_key: process.env.API_KEY
        },
        data: {
            "query": "string",
            "pageSize": 5,
            "offsetMark": "string",
            "sorts": [
                {
                    "field": "string",
                    "sortOrder": "ASC"
                }
            ],
            "historical": true,
            "resultLevel": "package"
        },
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await axios.request(options);
        return res.status(200).send(circular(response["data"]["collections"]))
    } catch(err) {
        console.error(err);
    }
})

module.exports = app;