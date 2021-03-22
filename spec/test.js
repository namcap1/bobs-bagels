const Basket = require('../src/basket');

let bagel = new Basket();
bagel.order('BGLE');
bagel.order('COF');
let result = bagel.print();

console.log(result);