const Cost = require('./cost');
const stock = require('./sold');
const Receipt = require('./receipt');

//The main class for bobs bagel 

class Basket{

    constructor(max_capacity = 20, cost = new Cost(), receipt = new Receipt()){
        this.max_capacity = max_capacity;
        this._basket = [];
        this.cost = cost;
        this.receipt = receipt;
    }
    
    order(item){
        if(this.actuallyServe(item)){
            if(this.full()){
                this._basket.push(item);
                return this._basket;
            }
            else{
                return 'Basket is full';
            }
        }
        else{
            return 'We don\'t serve this';
        }
    }
    
    full(){
        return this._basket.length < this.max_capacity;
    }

    remove(item){
        if(this.existInBasket(item)){
            let index = this._basket.indexOf(item);
            this._basket.splice(index, 1);
            return this._basket;
        }
        return 'Was never in your basket.';
    }

    existInBasket(item){
        return this._basket.includes(item);
    }

    actuallyServe(item){
        return item in stock.sell;
    }

    total(){
        return this.cost.total(this._basket);
    }

    print(){
        return this.receipt.print(this._basket);
    }

    get basket(){
        return this._basket;
    }

}


module.exports = Basket;