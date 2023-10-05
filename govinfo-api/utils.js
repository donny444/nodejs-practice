//Code snippet: https://codedamn.com/news/javascript/how-to-fix-typeerror-converting-circular-structure-to-json-in-js
function circular(obj) {
    let cache = [];
    let str = JSON.stringify(obj, function (key, value) {
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

module.exports = { circular };