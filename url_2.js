const url = require("url");

const fbAdr = "https://www.facebook.com/";
const igAdr = "https://www.instagram.com/";
const twtAdr = "https://twitter.com/home";
const exAdr = "https://example.org/one";

const facebook = url.parse(fbAdr, true);
const instagram = url.parse(igAdr, true);
const twitter = url.parse(twtAdr, true);

const array = [facebook, instagram, twitter];

for (let i in array) {
    console.log(i);
    console.log(array[i].host);
    console.log(array[i].pathname);
    console.log(array[i].search);
    console.log("\n");
};

console.log(url.format(fbAdr));
console.log(url.resolve(exAdr, "/two"));