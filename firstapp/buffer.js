var out = Buffer.from('abc');
console.log(out)

var out1 = Buffer.from('xyzhjk');
var myout = out1.slice(2,5)
console.log(myout.toString())