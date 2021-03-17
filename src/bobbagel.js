const sell = {'BGLO': 0.49, 'BGLP': 0.39, 'BGLE': 0.49, 'COF': 0.99};

class Basket{
    constructor(max_capacity = 20){
        this.max_capacity = max_capacity;
        this.basket = [];
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
        let ans = parseFloat(0);
        let coffeeDiscount = false;
        if(this.basket.includes('COF') && this.basket.includes('BGLP')){
            coffeeDiscount = true;
            ans += 1.25;
        }
        if(this.basket.includes('BGLO')){
            let result = this.sixOf('BGLO');
            let count = 0;
            while(result >= 6){
                result -= 6;
                count++;
            }
            ans = ans + (2.49 * count) + (result * sell['BGLO']);
        }
        if(this.basket.includes('BGLP')){
            let result = this.twelveOf('BGLP');
            if(coffeeDiscount){ 
                result--;
            }
            let count = 0;
            while(result >= 12){
                result -= 12;
                count++;
            }
            ans += (3.99 * count)  + (result * sell['BGLP']);
        }
        if(this.basket.includes('BGLE')){
            let result = this.sixOf('BGLE');
            let count = 0;
            while(result >= 6){
                result -= 6;
                count++;
            }
            ans += 2.49 * count + result * sell['BGLE'];
        }
        if(this.basket.includes('COF') && !coffeeDiscount){
            let result = this.sixOf('COF');
            ans += result * sell['COF'];
        }
        return ans.toFixed(2);
    }

    sixOf(item){
        let check = 0;
        for(let i = 0; i<this.basket.length; i++){
            if(this.basket[i] === item){
                check++;
            }  
        }
        return check;
    }

    twelveOf(item){
        let check = 0;
        for(let i = 0; i<this.basket.length; i++){
            if(this.basket[i] === item){
                check++;
            }  
        }
        return check;
    }
}


module.exports = Basket;