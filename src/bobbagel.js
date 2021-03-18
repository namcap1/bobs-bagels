const Cost = require('./cost');
const sell = require('./sold');

class Basket{
    constructor(max_capacity = 20){
        this.max_capacity = max_capacity;
        this.basket = [];
        this.cost = new Cost();
    }
    
    order(item){
        if(this.actuallyServe(item)){
            if(!this.full()){
                this.basket.push(item);
                return this.basket;
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
        if(this.basket.length < this.max_capacity){
            return false;
        }
        return true;
    }

    remove(item){
        if(this.existInBasket(item)){
            let index = this.basket.indexOf(item);
            this.basket.splice(index, 1);
            return this.basket;
        }
        return 'Was never in your basket.';
    }

    existInBasket(item){
        if(this.basket.includes(item)){
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
        return this.cost.total(this.basket);
    }

}


module.exports = Basket;