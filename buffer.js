const { Buffer } = require("node:buffer");

const buf1 = Buffer.alloc(8);
const buf2 = Buffer.alloc(10, 1);
const buf3 = Buffer.allocUnsafe(10);
const buf4 = Buffer.from([1, 2, 3]);
const buf5 = Buffer.from([257, 257.5, -255, '1']);
const buf6 = Buffer.from('test');
const buf7 = Buffer.from('test', 'latin1');

const buf = Buffer.from("abc");
console.log(buf);