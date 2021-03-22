const Basket = require('../src/basket');


const neverinbasket = "Was never in your basket.";
const dontserve = "We don\'t serve this";
const fullmess = "Basket is full";

describe('Checking order function', function(){
    it('Ordering', function(){
        let bagel = new Basket();
        let result = bagel.order('BGLO');
        expect(result.includes('BGLO')).toBe(true);
    });
    it('Max capacity', function(){
        let bagel = new Basket(1);
        bagel.order('BGLO');
        expect(() => {bagel.order('BGLO')}).toThrow(new Error(fullmess));
    });
    it('Ordering off menu', function(){
        let bagel = new Basket();
        expect(() =>{bagel.order('poppyseed')}).toThrow(new Error(dontserve));
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
        expect(() => {bagel.remove('BGLO')}).toThrow(new Error(neverinbasket));
    });
});

describe('Prices', function(){
    it('Checking price coffee and plain bagel discount', function(){
        let bagel = new Basket();
        bagel.order('COF');
        bagel.order('BGLP');
        let result = bagel.total();
        expect(parseFloat(result)).toBe(1.25);
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
        expect(parseFloat(result)).toBe(2.98);
    });
    it('BGLP discount', function() {
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
        expect(parseFloat(result)).toBe(4.77);
    });
    it('BGLE discount', function(){
        let bagel = new Basket();
        bagel.order('BGLE');
        bagel.order('BGLE');
        bagel.order('BGLE');
        bagel.order('BGLE');
        bagel.order('BGLE');
        bagel.order('BGLE');
        bagel.order('BGLE');
        let result = bagel.total()
        expect(parseFloat(result)).toBe(2.98);
    });
    it('Assorted order', function(){
        let bagel = new Basket();
        bagel.order('BGLE');
        bagel.order('BGLO');
        bagel.order('BGLP');
        bagel.order('COF');
        let result = bagel.total();
        expect(parseFloat(result)).toBe(2.23);
    });   
});

describe('Reciept', function(){
    it('Reciept', function() {
        let bagel = new Basket();
        bagel.order('BGLE');
        bagel.order('COF');
        let result = bagel.print();
        expect(typeof(result) === 'string').toBe(true);
    });
});