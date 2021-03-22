const Basket = require('../src/basket');

//checking it is formatted correctly

let bagel = new Basket();
bagel.order('BGLE');
bagel.order('COF');
let result = bagel.print();

console.log(result);