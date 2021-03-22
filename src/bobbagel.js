const Cost = require('./cost');
const sell = require('./sold');
const Receipt = require('./receipt');

class Basket{

    constructor(max_capacity = 20){
        this.max_capacity = max_capacity;
        this._basket = [];
        this.cost = new Cost();
        this.receipt = new Receipt();
    }
    
    order(item){
        if(this.actuallyServe(item)){
            if(!this.full()){
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
        if(this._basket.length < this.max_capacity){
            return false;
        }
        return true;
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
        if(this._basket.includes(item)){
            return true;
        }
        return false;
    }

    actuallyServe(item){
        if(item in sell){
            return true;
        }
        return false;
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