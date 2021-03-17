const test = require('../test-framework');
const Basket = require('../src/bobbagel');

const fullmessage = 'Basket is full';
const neverinbasket = 'Was never in your basket.';
const dontserve = 'We don\'t serve this';

console.log('Checking order function');

test.it('Ordering', function(){
    let bagel = new Basket();
    let result = bagel.order('BGLO');
    test.assertEquals(result.includes('BGLO'), true);
})

test.it('Max capacity', function(){
    let bagel = new Basket(1);
    bagel.order('BGLO');
    let result = bagel.order('BGLO');
    test.assertEquals(result, fullmessage);
})

test.it('Ordering off menu', function(){
    let bagel = new Basket();
    let result = bagel.order('poppyseed');
    test.assertEquals(result, dontserve);
})

console.log('Checking remove function');

test.it('Removing', function(){
    let bagel = new Basket();
    bagel.order('BGLO');
    let result = bagel.remove('BGLO')
    test.assertEquals(result.length, 0);
})

test.it('Never in basket', function(){
    let bagel = new Basket();
    let result = bagel.remove('BGLO');
    test.assertEquals(result, neverinbasket);
})

console.log('Prices');

test.it('checking price coffee and plain bagel discount', function(){
    let bagel = new Basket();
    bagel.order('COF');
    bagel.order('BGLP');
    let result = bagel.total();
    test.assertFloatEquals(result, 1.25);
})

test.it('onion bagel discount', function(){
    let bagel = new Basket();
    bagel.order('BGLO');
    bagel.order('BGLO');
    bagel.order('BGLO');
    bagel.order('BGLO');
    bagel.order('BGLO');
    bagel.order('BGLO');
    bagel.order('BGLO');
    let result = bagel.total();
    test.assertFloatEquals(result, 2.98);
})

test.it('BGLP discount', function(){
    let bagel = new Basket();
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    bagel.order('BGLP');
    let result = bagel.total();
    test.assertFloatEquals(result, 4.77);
})

test.it('BGLE discount', function(){
    let bagel = new Basket();
    bagel.order('BGLE');
    bagel.order('BGLE');
    bagel.order('BGLE');
    bagel.order('BGLE');
    bagel.order('BGLE');
    bagel.order('BGLE');
    bagel.order('BGLE');
    let result = bagel.total();
    test.assertFloatEquals(result, 2.98);
})
test.finResult();
