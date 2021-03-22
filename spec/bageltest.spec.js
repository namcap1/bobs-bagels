const Basket = require('../src/bobbagel');

const fullmessage = 'Basket is full';
const neverinbasket = 'Was never in your basket.';
const dontserve = 'We don\'t serve this';

describe('Checking order function', function(){
    it('Ordering', function(){
        let bagel = new Basket();
        let result = bagel.order('BGLO');
        expect(result.includes('BGLO')).toBe(true);
    });
    it('Max capacity', function(){
        let bagel = new Basket(1);
        bagel.order('BGLO');
        let result = bagel.order('BGLO');
        expect(result).toBe(fullmessage);
    });
    it('Ordering off menu', function(){
        let bagel = new Basket();
        let result = bagel.order('poppyseed');
        expect(result).toBe(dontserve);
    });
});

describe('Checking remove function', function(){
    it('Removing', function(){
        let bagel = new Basket();
        bagel.order('BGLO');
        let result = bagel.remove('BGLO');
        expect(result.length).toBe(0);
    });
    it('Never in basket', function(){
        let bagel = new Basket();
        let result = bagel.remove('BGLO');
        expect(result).toBe(neverinbasket);
    });
});

describe('Prices', function(){
    it('Checking price coffee and plain bagel discount', function(){
        let bagel = new Basket();
        bagel.order('COF');
        bagel.order('BGLP');
        let result = bagel.total();
        expect(result).toBe(1.25);
    });
    it('Onion bagel discount', function(){
        let bagel = new Basket();
        bagel.order('BGLO');
        bagel.order('BGLO');
        bagel.order('BGLO');
        bagel.order('BGLO');
        bagel.order('BGLO');
        bagel.order('BGLO');
        bagel.order('BGLO');
        let result = bagel.total();
        expect(result).toBe(2.98);
    });
    
});