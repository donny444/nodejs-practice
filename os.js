const os = require("os");

console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());
console.log(os.constants);
console.log(os.cpus());
console.log(os.networkInterfaces());
console.log("Name: " + os.type());
console.log(os.userInfo());
console.log(os.uptime());
console.log(os.totalmem());