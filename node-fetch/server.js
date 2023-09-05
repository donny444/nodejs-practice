import fetch from "node-fetch";
//use import syntax for node-fetch v3

const url = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/auto-complete?query=apple';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'bloomberg-market-and-financial-news.p.rapidapi.com'
    }
};

try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
} catch (error) {
    console.error(error);
}