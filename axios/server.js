const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  const query = req.query.query;
  const options = {
    method: 'GET',
    url: 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/auto-complete',
    params: {
      query: query
    },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'bloomberg-market-and-financial-news.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    //Code snippet: https://codedamn.com/news/javascript/how-to-fix-typeerror-converting-circular-structure-to-json-in-js
    function stringify(obj) {
      let cache = [];
      let str = JSON.stringify(obj, function(key, value) {
        if (typeof value === "object" && value !== null) {
          if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return;
          }
          // Store value in our collection
          cache.push(value);
        }
        return value;
      });
      cache = null; // reset the cache
      return str;
    }
    
    //const result = await response.json(); //TypeError: response.json is not a function
    return res.status(200).send(stringify(response)); //TypeError: Converting circular structure to JSON
  } catch (error) {
    console.error(error);
  }
})

app.listen(8000, () => console.log("Server is running on port 8000"));